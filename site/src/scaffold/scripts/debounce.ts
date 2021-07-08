/* eslint-disable @typescript-eslint/ban-types */
/* ⬆ (Function.bind required for this implementation) */

/**
 * Generic function for debouncing some type of event handler or function. Debounce = only perform an action after specific period of time after an event stream stops.
 * @param scheduler A scheduling function that determines when the handler will run.
 * @param clearScheduler A function that will cancel the waiting handler.
 * @param handler The function to be run when the scheduler dictates.
 * @param timeout An optional timeout for the scheduling function.
 *
 * @example debounceScheduler(setTimeout, clearTimeout, (event) => console.log('event', event), 1000);
 * @example debounceScheduler(requestAnimationFrame, cancelAnimationFrame, (event) => console.log('event', event));
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounceScheduler<T extends Function>(
	scheduler: (fn: T, ...params: unknown[]) => number,
	clearScheduler: (number: number) => void,
	handler: T,
	timeout = 500
): CancellableFunction {
	let scheduleId = 0;
	const caller = (...args: string[]) => {
		clearScheduler(scheduleId);
		scheduleId = scheduler.apply(null, [handler.bind(null, ...args), timeout]);
	};

	(caller as CancellableFunction).cancel = () => clearScheduler(scheduleId);

	return caller as CancellableFunction;
}

export const debounce = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	timeout: debounceScheduler.bind(null, setTimeout, clearTimeout) as <T extends Function>(
		handler: T,
		timeout?: number
	) => CancellableFunction,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	animationFrame: debounceScheduler.bind(
		null,
		window.requestAnimationFrame,
		window.cancelAnimationFrame
		// eslint-disable-next-line @typescript-eslint/ban-types
	) as <T extends Function>(handler: T, timeout?: number) => CancellableFunction
};

export interface CancellableFunction {
	cancel: () => void;
	(...args: unknown[]): void;
}
