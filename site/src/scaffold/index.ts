import { handleCodeFilters } from './scripts/code-filter';
import { initTheme } from './scripts/theming';
import { handleSiteTabs } from './scripts/tabs';

initTheme();
handleCodeFilters();
handleSiteTabs(document.querySelector('main') as HTMLElement);
