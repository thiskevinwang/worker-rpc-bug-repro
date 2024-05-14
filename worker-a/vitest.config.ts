import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		globalSetup: ['./global-setup.ts'],
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.toml' },
				miniflare: {
					compatibilityDate: '2024-04-03', // minimum date for RPC support
					compatibilityFlags: ['nodejs_compat'],
					serviceBindings: {
						WORKER_B: {
							name: 'worker-b',
							entrypoint: 'WorkerBEntrypoint',
						},
					},
					workers: [
						{
							name: 'worker-b',
							modules: true,
							modulesRoot: '..',
							scriptPath: '../worker-b/dist/index.js', // Built by `global-setup.ts`
							compatibilityDate: '2024-04-19',
							compatibilityFlags: ['nodejs_compat'],
						},
					],
				},
			},
		},
	},
});
