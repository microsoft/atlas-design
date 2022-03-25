import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';

import '@microsoft/atlas-js/src/index';

initTheme();
handleCodeFilters();
handleFigmaFullScreenRequest();
