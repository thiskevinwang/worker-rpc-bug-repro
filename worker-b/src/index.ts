import { WorkerEntrypoint } from 'cloudflare:workers';

export class WorkerBEntrypoint extends WorkerEntrypoint<Env> {
	async getMessage() {
		await new Promise((res) => setTimeout(res, 1000));
		return 'Hello from worker-b!';
	}
}

export type WorkerBService = Service<WorkerBEntrypoint>;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response('Hello from worker-b!');
	},
};
