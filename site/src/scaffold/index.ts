import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initTheme } from './scripts/theming';

import { initPopover } from '@microsoft/atlas-js/src/index';

initTheme();
initPopover();
handleCodeFilters();
handleFigmaFullScreenRequest();
initStarRatingExamples();

function initStarRatingExamples() {
	window.addEventListener('star-rating-change', e => {
		const displayOneThreeOrLess = document.getElementById('display-on-star-rate') as HTMLElement;
		const displayOneFourAndFive = document.getElementById('well-thats-good-news') as HTMLElement;

		const detail = (e as CustomEvent).detail as { name: string; value: string };

		if (detail.name !== 'star-rating-1') {
			return;
		}

		if (!displayOneThreeOrLess) {
			return;
		}

		displayOneThreeOrLess.hidden = true;
		displayOneFourAndFive.hidden = true;

		if (parseInt(detail.value) < 4) {
			displayOneThreeOrLess.hidden = false;
		} else {
			displayOneFourAndFive.hidden = false;
		}
	});

	// form submit example
	const form = document.getElementById('star-rating-example-form') as HTMLFormElement;
	if (!form) {
		return;
	}

	form.addEventListener('submit', event => {
		event.preventDefault();
		// read the form data and convert it to an object.
		const data = Object.fromEntries(new FormData(form));
		// display the data
		alert(JSON.stringify(data, null, 2));
	});
}
