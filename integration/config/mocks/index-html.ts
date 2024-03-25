import { ObjectifiedPlayWrightRouteArgs } from '../typings';

export const indexHTMLOnlyRoutes: ObjectifiedPlayWrightRouteArgs[] = [
	{
		url: 'https://badge.fury.io/**/*.svg',
		handler: (route, _request) => {
			route.abort('aborted');
		}
	},
	{
		url: 'https://github.com/microsoft/atlas-design/**/*.svg*',
		handler: (route, _request) => {
			route.abort('aborted');
		}
	}
];
