import type { WorkerBService } from '../../worker-b/src';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		ctx.waitUntil(
			new Promise(async (resolve) => {
				const text = await (env.WORKER_B as WorkerBService).getMessage();
				console.log('[ctx.waitUntil + Promise] Worker B said:', text);
				resolve(void 0);
			})
		);

		ctx.waitUntil(
			(async () => {
				const text = await (env.WORKER_B as WorkerBService).getMessage();
				console.log('[ctx.waitUntil + async IIFE] Worker B said:', text);
			})()
		);

		return new Response('Hello from worker-a!');
	},
};
