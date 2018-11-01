import {storiesOf} from '@storybook/react';

import * as React from 'react';
import {BuilderFilterPanelPure} from '../components/catalog/children/BuilderFilterPanel';
import {defaultApolloData, defaultRouterProps} from './constants';

storiesOf('BuilderFilterPanel', module).add('default', () => (
  <BuilderFilterPanelPure
    {...defaultRouterProps}
    selectedCategory='ALL_PRODUCTS'
    data={{
      ...defaultApolloData,
      CATEGORY: null,
    }}
  />
));