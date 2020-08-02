import React, { useState, useEffect } from "react";
import HtmlToReact from "html-to-react";
import { fireEvent } from "../../analytics/googleAnalytics";
import { useScrollPercentage } from "react-scroll-percentage";
import LazyLoad from "react-lazyload";
import affiliateAdsOriginal from "../../utils/affiliateAds";
import _ from "lodash";
import AffiliateInlineAd from "../ads/AffiliateInlineAd";

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const CustomPost = (props) => {
	const [ref, percentage] = useScrollPercentage();
	const [isRead, setIsRead] = useState(false);
	const [numSecondsSinceOpened, setNumSecondsSinceOpened] = useState(0);
	const [affiliateAds, setAffiliateAds] = useState([]);

	useEffect(() => {
		const slug = props.post.slug;
		const candidateAds =
			slug in affiliateAdsOriginal
				? affiliateAdsOriginal[slug]
				: affiliateAdsOriginal.default;

		setAffiliateAds(_.shuffle(candidateAds));
	}, []);

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

	const nextRandomAffiliateInlineAd = (hIdx) => {
		const adIdx = Math.floor(hIdx / 2);
		if (adIdx > affiliateAds.length - 1) {
			return null;
		}
		const ad = affiliateAds[adIdx];
		return (
			<AffiliateInlineAd
				{...ad}
				slug={props.post.slug}
				adContent={ad.id}
				adPlacement="inline"
			/>
		);
	};

	// Variable used to set inline affiliate ads at every _other_ h tag
	let nextHIdx = 0;

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
				// Rename class -> className so React knows what to do with it
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
		// Inline affiliate ads under h tags
		{
			shouldProcessNode: function (node) {
				const result =
					["h3", "h2", "h1"].includes(node.name) && nextHIdx % 2 === 0;
				if (["h3", "h2", "h1"].includes(node.name)) {
					nextHIdx++;
				}
				return result;
			},
			processNode: function (node, children) {
				// Rename class -> className so React knows what to do with it
				node.attribs.className = node.attribs.class;
				delete node.attribs.class;
				node.attribs.srcSet = node.attribs.srcset;
				delete node.attribs.srcset;
				return (
					<React.Fragment>
						{nextRandomAffiliateInlineAd(nextHIdx)}
						<h3 {...node.attribs}>{children}</h3>
					</React.Fragment>
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
