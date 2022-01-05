import { handleCodeFilters } from './scripts/code-filter';
import { initPopovers } from './scripts/popover';
import { initTheme } from './scripts/theming';

initTheme();
handleCodeFilters();

initPopovers(document.body);

// document.documentElement.classList.add('debug');
