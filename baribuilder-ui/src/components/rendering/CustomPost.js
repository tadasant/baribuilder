import React, { useState } from "react";
import HtmlToReact from "html-to-react";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import { useScrollPercentage } from "react-scroll-percentage";

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const CustomPost = props => {
	const [ref, percentage] = useScrollPercentage();
	const [isRead, setIsRead] = useState(false);

	// When reader hits 70% of the article, consider it read
	if (percentage > 0.7 && !isRead) {
		const locationTokens = window.location.href.split("/");
		// Ends with a slash, so -2
		const postSlug = locationTokens[locationTokens.length - 2];
		setIsRead(prevIsRead => {
			if (!prevIsRead) {
				trackCustomEvent({
					category: "Article",
					action: "Read",
					nonInteraction: false,
					label: postSlug
				});
			}
			return true;
		});
	}

	const submitLinkClickEvent = (href, anchorText, callback) => {
		const locationTokens = window.location.href.split("/");
		// Ends with a slash, so -2
		const fromSlug = locationTokens[locationTokens.length - 2];
		// TODO remove this when tracking real referrals
		const isReferralTest = href.includes("amazon.com");
		const isOutbound =
			!href.startsWith("/") && !href.includes("baribuilder.com/blog");
		trackCustomEvent({
			category: isReferralTest
				? "Referral Test Link"
				: isOutbound
				? "Outbound Link"
				: "Internal Link",
			action: "Click",
			nonInteraction: false,
			label: `from ${fromSlug} to ${href} via ${anchorText}`,
			hitCallback: callback
		});
	};

	const processingInstructions = [
		{
			shouldProcessNode: function(node) {
				return node.type === "tag" && node.name === "a";
			},
			processNode: function(node, children) {
				const hrefClicked = node.attribs.href;
				const anchorText = children[0];
				const handleClick = event => {
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
			}
		},
		{
			// Everything else
			shouldProcessNode: function(node) {
				return true;
			},
			processNode: processNodeDefinitions.processDefaultNode
		}
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
