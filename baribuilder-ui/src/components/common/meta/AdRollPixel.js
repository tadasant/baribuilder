import React from "react";
import Helmet from "react-helmet";

// Import this on all templates where I want AdRoll conversion tracking
// https://help.adroll.com/hc/en-us/articles/211845978-Activate-Your-Pixel

const AdRollPixel = () => (
	// Using Helmet as workaround for lack of Fragment support https://github.com/nfl/react-helmet/issues/342
	<Helmet>
		<script type="text/javascript">
			{`
		var adroll_adv_id = "XELL45XZINHKFLSWAZXCEW";
		var adroll_pix_id = "6I3C5DVKQREFZC6Q44RXUC";

    (function () {
        var _onload = function(){
            if (document.readyState && !/loaded|complete/.test(document.readyState)){setTimeout(_onload, 10);return}
            if (!window.__adroll_loaded){__adroll_loaded=true;setTimeout(_onload, 50);return}
            var scr = document.createElement("script");
            var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
            scr.setAttribute('async', 'true');
            scr.type = "text/javascript";
            scr.src = host + "/j/roundtrip.js";
            ((document.getElementsByTagName('head') || [null])[0] ||
                document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
        };
        if (window.addEventListener) {window.addEventListener('load', _onload, false);}
        else {window.attachEvent('onload', _onload)}
    }());
		`}
		</script>
	</Helmet>
);

export default AdRollPixel;
