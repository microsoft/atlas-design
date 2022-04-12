import { ObjectifiedPlayWrightRouteArgs } from '../typings';

export const indexHTMLOnlyRoutes: ObjectifiedPlayWrightRouteArgs[] = [
	{
		url: 'https://badge.fury.io/**/*.svg',
		handler: (route, _request) => {
			route.abort('aborted');
		},
		options: {}
	},
	{
		url: 'https://github.com/microsoft/atlas-design/**/*.svg*',
		handler: (route, _request) => {
			route.abort('aborted');
		},
		options: {}
	},
	{
		url: 'https://dev.azure.com/ceapex/Engineering/_apis/build/status/microsoft.atlas-design?branchName=main',
		handler: (route, _request) => {
			route.abort('aborted');
		},
		options: {}
	}
];
