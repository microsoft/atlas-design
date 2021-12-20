import { handleCodeFilters } from './scripts/code-filter';
import { initPopover } from './scripts/popover';
import { initTheme } from './scripts/theming';

initTheme();
handleCodeFilters();

initPopover(document.body);

// document.documentElement.classList.add('debug');
