import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initPopovers } from './scripts/popover';
import { initTheme } from './scripts/theming';

initTheme();
initPopovers(document.body);
handleCodeFilters();
handleFigmaFullScreenRequest();
