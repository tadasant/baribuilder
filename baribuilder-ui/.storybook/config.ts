import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories');
  // require.context('../src/stories', true, /.stories.tsx$/);
}

configure(loadStories, module);
