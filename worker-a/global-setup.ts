import childProcess from 'node:child_process';
import path from 'node:path';

// Global setup runs inside Node.js, not `workerd`
export default function () {
	let label = '🔨 Built dependency';
	console.time(label);
	childProcess.execSync('wrangler build', {
		cwd: path.join(__dirname, '../worker-b'),
	});
	console.timeEnd(label);
}
