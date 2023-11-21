/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Connection, createConnection } from 'mysql2';

export interface Env {
	DATABASE_HOST: string;
	DATABASE_PORT: number;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
	DATABASE_NAME: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		try {
			const tidb = createConnection({
				host: env.DATABASE_HOST,
				port: 4000,
				user: env.DATABASE_USER,
				password: env.DATABASE_PASSWORD,
				database: env.DATABASE_NAME,
				debug: true,
				useStaticParser: true,
			});
			// @ts-ignore
			const [rows] = await query(tidb, 'SHOW DATABASES;');
			tidb.end();
			return new Response(JSON.stringify(rows), { status: 200 });
		} catch (e: any) {
			console.error(e);
			return new Response('Error: ' + e.message, { status: 500 });
		}
	},
};

function query(conn: Connection, sql: string) {
	return new Promise((resolve, reject) => {
		conn.query(sql, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve([rows]);
			}
		});
	});
}

