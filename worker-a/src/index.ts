import type { WorkerBService } from '../../worker-b/src';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		ctx.waitUntil(
			new Promise(async (resolve) => {
				try {
					const text = await (env.WORKER_B as WorkerBService).getMessage();
					// console.log('[ctx.waitUntil + Promise] Worker B said:', text);
					resolve(void 0);
				} catch (err) {
					// This is the error that we're observing in Sentry
					console.error(`[ctx.waitUntil + Promise] Worker B errored:`, err);

					// ie. sentry.captureException(err);
					resolve(void 0);
				}
			})
		);

		ctx.waitUntil(
			(async () => {
				try {
					const text = await (env.WORKER_B as WorkerBService).getMessage();
					// console.log('[ctx.waitUntil + async IIFE] Worker B said:', text);
				} catch (err) {
					// This is the error that we're observing in Sentry
					console.error(`[ctx.waitUntil + async IIFE] Worker B errored:`, err);

					// ie. sentry.captureException(err);
				}
			})()
		);

		return new Response('Hello from worker-a!');
	},
};
