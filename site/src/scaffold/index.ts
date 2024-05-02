import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';
import {
	initDismiss,
	initPopover,
	initSnapScroll,
	initSegmentedControls
} from '@microsoft/atlas-js/src/index';
import { handleFocusableIfScrollable } from './scripts/focusable-if-scrollable';
import { initFullScreenToggle } from './scripts/full-screen-toggle';
import { initLayoutPageControls } from './scripts/layout-page';
import { handleFullScreenNavButton } from './scripts/mobile-navigation';

initTheme();
initDismiss();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initSegmentedControls();
initFullScreenToggle();
handleFocusableIfScrollable();
handleFullScreenNavButton();
initLayoutPageControls();
