import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';

import { initPopover, initSnapScroll } from '@microsoft/atlas-js/src/index';
import { handleFocusableIfScrollable } from './scripts/focusable-if-scrollable';
import { initFullScreenToggle } from './scripts/full-screen-toggle';

initTheme();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initFullScreenToggle();
handleFocusableIfScrollable();
