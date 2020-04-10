import React from "react";
import Helmet from "react-helmet";

// Hotjar Tracking Code for https://baribuilder.com/

const HotJar = () => {
	return (
		// Using Helmet as workaround for lack of Fragment support https://github.com/nfl/react-helmet/issues/342
		<Helmet>
			<script
				dangerouslySetInnerHTML={{
					__html: `
					(function(h,o,t,j,a,r){
						h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
						h._hjSettings={hjid:1065021,hjsv:6};
						a=o.getElementsByTagName('head')[0];
						r=o.createElement('script');r.async=1;
						r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
						a.appendChild(r);
				})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
				}}
			/>
		</Helmet>
	);
};

export default HotJar;
