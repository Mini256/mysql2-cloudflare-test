/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { createConnection } from 'mysql2/promise';

export interface Env {
	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
	DATABASE_NAME: string;
	DATABASE_ENABLE_SSL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const conn = await createConnection({
			host: env.DATABASE_HOST,
			port: 4000,
			user: env.DATABASE_USER,
			password: env.DATABASE_PASSWORD,
			database: env.DATABASE_NAME,
			ssl: env.DATABASE_ENABLE_SSL === 'true' ? {
				rejectUnauthorized: false,
			} : undefined,
			debug: false,
			disableEval: true,
		});
		// @ts-ignore
		const [rows] = await conn.query('SHOW DATABASES;');
		conn.end();
		return Response.json(rows);
	},
};
