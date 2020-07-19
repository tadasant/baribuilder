import React, { useState, useEffect } from "react";
import HtmlToReact from "html-to-react";
import { fireEvent } from "../../analytics/googleAnalytics";
import { useScrollPercentage } from "react-scroll-percentage";
import LazyLoad from "react-lazyload";

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const CustomPost = (props) => {
	const [ref, percentage] = useScrollPercentage();
	const [isRead, setIsRead] = useState(false);
	const [numSecondsSinceOpened, setNumSecondsSinceOpened] = useState(0);

	useEffect(() => {
		fireEvent({
			category: "Article",
			action: "View",
			nonInteraction: true,
			label: props.post.slug,
		});
		setInterval(() => {
			setNumSecondsSinceOpened((prev) => prev + 1);
		}, 1000);
	}, []);

	// When reader hits 70% of the article, consider it read
	if (percentage > 0.7 && !isRead) {
		setIsRead((prevIsRead) => {
			if (!prevIsRead) {
				fireEvent({
					category: "Article",
					action: "Read",
					nonInteraction: false,
					label: props.post.slug,
					value: numSecondsSinceOpened,
				});
			}
			return true;
		});
	}

	const submitLinkClickEvent = (href, anchorText, callback) => {
		const locationTokens = window.location.href.split("/");
		// Ends with a slash, so -2
		const fromSlug = locationTokens[locationTokens.length - 2];
		const isReferral =
			href.includes("amzn.to") || href.includes("tag=baribuilder");
		// TODO remove this when tracking real referrals
		const isReferralTest = href.includes("amazon.com");
		const isOutbound =
			!href.startsWith("/") && !href.includes("baribuilder.com/blog");
		fireEvent({
			category: isReferral
				? "Amazon Referral Link"
				: isReferralTest
				? "Referral Test Link"
				: isOutbound
				? "Outbound Link"
				: "Internal Link",
			action: "Click",
			nonInteraction: false,
			label: `from ${fromSlug} to ${href} via ${anchorText}`,
			hitCallback: callback,
		});
	};

	const processingInstructions = [
		// Custom tracked anchor tags
		{
			shouldProcessNode: function (node) {
				return node.type === "tag" && node.name === "a";
			},
			processNode: function (node, children) {
				const hrefClicked = node.attribs.href;
				const anchorText = children[0];
				const handleClick = (event) => {
					event.preventDefault();
					submitLinkClickEvent(hrefClicked, anchorText, () => {
						window.location.href = hrefClicked;
					});
				};
				return (
					<a {...node.attribs} onClick={handleClick}>
						{children}
					</a>
				);
			},
		},
		// Custom lazy-loaded img's
		{
			shouldProcessNode: function (node) {
				return node.name === "img";
			},
			processNode: function (node) {
				node.attribs.className = node.attribs.class;
				delete node.attribs.class;
				return (
					// Starts loading the image while 200px offscreen
					<LazyLoad once offset={200}>
						<img {...node.attribs} />
					</LazyLoad>
				);
			},
		},
		{
			// Everything else
			shouldProcessNode: function (node) {
				return true;
			},
			processNode: processNodeDefinitions.processDefaultNode,
		},
	];

	const contentComponent = htmlToReactParser.parseWithInstructions(
		props.post.html,
		// Process all nodes
		() => true,
		processingInstructions
	);

	return (
		<section className="content-body load-external-scripts" ref={ref}>
			{contentComponent}
			{/* // dangerouslySetInnerHTML={{ __html: props.post.html }} */}
		</section>
	);
};

export default CustomPost;
