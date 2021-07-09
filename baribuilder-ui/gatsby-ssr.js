const React = require("react");

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
