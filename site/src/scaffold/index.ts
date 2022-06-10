import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';

import { initPopover, initStarRating } from '@microsoft/atlas-js/src/index';

initTheme();
initPopover();
initStarRating();
handleCodeFilters();
handleFigmaFullScreenRequest();
