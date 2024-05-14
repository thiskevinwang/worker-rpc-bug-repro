// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF, fetchMock } from 'cloudflare:test';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Hello World worker', () => {
	beforeAll(() => {
		fetchMock.activate();
		fetchMock.disableNetConnect();
	});

	afterEach(() => {
		fetchMock.assertNoPendingInterceptors();
	});

	it('responds with Hello World! (unit style)', async () => {
		// worker-b calls `fetch('http://localhost:9000')` internally
		fetchMock.get('http://localhost:9000').intercept({ method: 'GET', path: '' }).reply(200, 'worker-b');

		const request = new IncomingRequest('http://example.com');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot(`"Worker B said: worker-b"`);
	});

	it('responds with Hello World! (integration style)', async () => {
		// worker-b calls `fetch('http://localhost:9000')` internally
		fetchMock.get('http://localhost:9000').intercept({ method: 'GET', path: '' }).reply(200, 'worker-b');

		const response = await SELF.fetch('https://example.com');
		expect(await response.text()).toMatchInlineSnapshot(`"Worker B said: worker-b"`);
	});
});
