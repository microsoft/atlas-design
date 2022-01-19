import { handleCodeFilters } from './scripts/code-filter';
import { handleFigmaFullScreenRequest } from './scripts/figma-embed';
import { initPopovers } from './scripts/popover';
import { initTheme } from './scripts/theming';

initTheme();
initPopovers(document.body);
handleCodeFilters();
handleFigmaFullScreenRequest();

const navbarMobile = document.querySelector('#nav-mobile');
const navbarToggle = document.querySelector('#navbar-toggle');

const toggleSidebar = () => {
	navbarMobile?.classList.toggle('open');
};

navbarToggle?.addEventListener('click', toggleSidebar);
