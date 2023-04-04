/**
 * Manually notify the affix system that a content update has occurred.
 */
export function notifyContentUpdated() {
	window.dispatchEvent(new CustomEvent('content-update'));
}
