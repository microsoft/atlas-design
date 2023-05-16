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

let counter = 0;
const classes = ['border-radius-sm', 'border-radius', 'border-radius-lg', 'border-radius-rounded'];
setInterval(() => {
	const gds = Array.from(document.querySelectorAll('.gradient-card'));
	for (const gd of gds) {
		counter++;

		gd.classList.remove(...classes);
		gd.classList.add(classes[counter % 4]);
		const content = gd.querySelector('.gradient-card-content');
		if (content) {
			content.textContent = classes[counter % 4];
		}
	}
}, 2000);
