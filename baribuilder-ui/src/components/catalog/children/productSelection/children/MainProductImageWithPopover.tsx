import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import {ReactEventHandler, SFC} from 'react';
import {compose, withState} from 'recompose';
import styled from 'styled-components';
import ProductPopover from '../../popover/ProductPopover';
import MainProductImage from './MainProductImage';

interface IProps {
  catalogProductId: string;
  anchorSide?: 'left' | 'right';
}

interface IPropsState {
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => HTMLElement | null;
}

const MainImage = styled(MainProductImage)`
  max-height: 100px;
  max-width: 100%;
`;

const NoPointerEventsPopover = styled(Popover)`
  pointer-events: none;
`;

const MainProductImageWithPopover: SFC<IProps & IPropsState> = ({catalogProductId, anchorEl, setAnchorEl, anchorSide}) => {
  const handlePopoverOpen: ReactEventHandler<HTMLElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose: ReactEventHandler<HTMLElement> = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <MainImage productId={catalogProductId} aria-owns={open ? 'mouse-over-popover' : undefined}
                 aria-haspopup
                 // @ts-ignore TODO something wrong with onMouseEnter prop?
                 onMouseEnter={handlePopoverOpen}
                 onMouseLeave={handlePopoverClose}/>
      <NoPointerEventsPopover
        anchorOrigin={{
          vertical: 'top',
          horizontal: anchorSide || 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: anchorSide === 'left' ? 'right' : 'left',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <ProductPopover catalogProductId={catalogProductId}/>
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