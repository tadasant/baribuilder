import * as React from 'react';
import {SFC} from 'react';
import {compose, lifecycle} from "recompose";
import styled from 'styled-components';
import {TYPEFORM_URL} from './withExitIntentModal';

const initiateTypeform = () => {
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
    q.parentNode.insertBefore(js, q);
  }
};


const SurveyTypeForm: SFC = () => (
  <StyledDiv
    className='typeform-widget'
    data-url={TYPEFORM_URL}
    data-transparency="50"
    data-hide-headers={true}
    data-hide-footer={true}
  />
);

const StyledDiv = styled.div`
  width: 100%;
  height: calc(75vh - 13vh - 20vh);
`;

const enhance = compose(
  lifecycle({
    componentDidMount() {
      initiateTypeform();
    }
  }),
);

export default enhance(SurveyTypeForm);
