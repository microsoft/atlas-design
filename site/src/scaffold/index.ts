import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';

import { initPopover, initTagInputs } from '@microsoft/atlas-js/src/index';

initTheme();
initPopover();
initTagInputs();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
