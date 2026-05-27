import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';
import { handleMockFormSubmit } from './scripts/form-submit';
import {
	initDismiss,
	initPopover,
	initSnapScroll,
	initLayout
} from '@microsoft/atlas-js/src/index';
import { handleFocusableIfScrollable } from './scripts/focusable-if-scrollable';
import { initFullScreenToggle } from './scripts/full-screen-toggle';
import { initLayoutPageControls } from './scripts/layout-page';
import { handleFullScreenNavButton } from './scripts/mobile-navigation';
import { initReadingDirectionButtons } from './scripts/direction-buttons';

// Run layout-state restoration as early as possible so any previously
// selected layout is applied to <html> before the first paint, avoiding a
// brief flash of the markup-default layout (`layout-holy-grail`).
initLayoutPageControls();

initTheme();
initDismiss();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
handleMockFormSubmit();
initSnapScroll();
initFullScreenToggle();
handleFocusableIfScrollable();
handleFullScreenNavButton();
initLayout();
initReadingDirectionButtons();
