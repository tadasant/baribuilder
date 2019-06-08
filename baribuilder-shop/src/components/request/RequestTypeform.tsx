import {SFC} from 'react';
import * as React from 'react';
import {compose, lifecycle} from "recompose";

/* Converted Typeform embedded form to this component. */

const RequestTypeform: SFC = () => (
  <div>
    <div className="typeform-widget" data-url="https://vitagllc.typeform.com/to/INjcIK"
         style={{width: '100%', height: 500}}/>
    <div style={{fontFamily: 'Sans-Serif', fontSize: 12, color: '#999', opacity: 0.5, paddingTop: 5}}>
      powered by <a
      href="https://admin.typeform.com/signup?utm_campaign=INjcIK&utm_source=typeform.com-12750282-Pro&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN"
      style={{color: '#999'}} target="_blank">Typeform</a>
    </div>
  </div>
);

const enhance = compose<{}, {}>(
  lifecycle({
    componentDidMount() {
      const onload = () => {
        let js;
        let q;
        const d = document;
        const gi = d.getElementById;
        const ce = d.createElement;
        const gt = d.getElementsByTagName;
        const id = 'typef_orm';
        const b = 'https://embed.typeform.com/';
        if (!gi.call(d, id)) {
          js = ce.call(d, "script");
          js.id = id;
          js.src = b + "embed.js";
          q = gt.call(d, "script")[0];
          q.parentNode.insertBefore(js, q)
        }
      };
      onload();
    }
  }),
);

export default enhance(RequestTypeform);
