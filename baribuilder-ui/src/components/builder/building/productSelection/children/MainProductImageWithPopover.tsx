import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {ReactEventHandler, SFC} from 'react';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import MainProductImage from './MainProductImage';

interface IProps {
  catalogProductId: string;
}

interface IPropsState {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => HTMLElement | null;
}

const MainImage = styled(MainProductImage)`
  max-height: 100px;
`;

const NoPointerEventsPopover = styled(Popover)`
  pointer-events: none;
`;

const MainProductImageWithPopover: SFC<IProps & IPropsState> = ({catalogProductId, anchorEl, setAnchorEl}) => {
  const handlePopoverOpen: ReactEventHandler<HTMLElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose: ReactEventHandler<HTMLElement> = event => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <MainImage productId={catalogProductId}/>
      </Typography>
      <NoPointerEventsPopover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        style={{zIndex: 5}}
      >
        Pops
      </NoPointerEventsPopover>
    </div>
  );
};

const enhance = compose<IProps & IPropsState, IProps>(
  withState<IProps, HTMLElement | null, 'anchorEl', 'setAnchorEl'>(
    'anchorEl',
    'setAnchorEl',
    null,
  )
);

export default enhance(MainProductImageWithPopover);