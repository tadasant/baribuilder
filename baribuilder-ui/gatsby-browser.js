/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
var trustAllScripts = function () {
	var scriptNodes = document.querySelectorAll(".load-external-scripts script");

	for (var i = 0; i < scriptNodes.length; i += 1) {
		var node = scriptNodes[i];
		var s = document.createElement("script");
		s.type = node.type || "text/javascript";

		if (node.attributes.src) {
			s.src = node.attributes.src.value;
		} else {
			s.innerHTML = node.innerHTML;
		}

		document.getElementsByTagName("head")[0].appendChild(s);
	}
};

exports.onRouteUpdate = function () {
	trustAllScripts();
};

// Enables cross domain tracking per https://github.com/gatsbyjs/gatsby/issues/13117
exports.onRenderBody = ({ setPostBodyComponents }) => {
	const attachCode = `
if (ga) {
  ga('require', 'linker');
  ga('linker:autoLink', ['store.baribuilder.com']);
}`;

	setPostBodyComponents([
		<script
			dangerouslySetInnerHTML={{
				__html: attachCode,
			}}
		/>,
	]);
};
