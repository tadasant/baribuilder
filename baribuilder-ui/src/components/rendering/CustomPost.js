import React from "react";
import HtmlToReact from "html-to-react";

const htmlToReactParser = new HtmlToReact.Parser();
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

const CustomPost = props => {
	const submitLinkClickEvent = () => undefined;

	const processingInstructions = [
		{
			shouldProcessNode: function(node) {
				return node.type === "tag" && node.name === "a";
			},
			processNode: function(node, children, index) {
				const handleClick = () => submitLinkClickEvent();
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
		<section className="content-body load-external-scripts">
			{contentComponent}
			{/* // dangerouslySetInnerHTML={{ __html: props.post.html }} */}
		</section>
	);
};

export default CustomPost;
