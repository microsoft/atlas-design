#!/usr/bin/env ts-node

import * as path from 'path';

export const screenshotsRoot = path.resolve(
	process.cwd(),
	'../',
	'integration/visual-diff/screenshots/'
);
export const screenshotsOutputDir = path.resolve(screenshotsRoot, './updated');
export const baselineDirectory = path.resolve(screenshotsRoot, './baseline');
export const diffDirectory = path.resolve(screenshotsRoot, './diffs');
