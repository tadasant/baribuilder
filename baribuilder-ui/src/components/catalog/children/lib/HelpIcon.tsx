import {Tooltip} from '@material-ui/core';
import * as React from 'react';
import {SFC} from 'react';
import styled from 'styled-components';
import QuestionIcon from '../../../../assets/icon/question.svg';

interface IProps {
  tooltipText: string
  height: string
}

const ImgWithHeight = styled.img`
  height: ${props => props.height}
`;

const HelpIcon: SFC<IProps> = ({tooltipText, height}) => {
  return (
    <Tooltip title={tooltipText}>
      <ImgWithHeight src={QuestionIcon} height={height}/>
    </Tooltip>
  )
};

export default HelpIcon;