import { handleCodeFilters } from './scripts/code-filter';
import { initTheme } from './scripts/theming';
import { detectObsoleteBrowser } from './scripts/obsolete-browser';

detectObsoleteBrowser();
initTheme();
handleCodeFilters();
