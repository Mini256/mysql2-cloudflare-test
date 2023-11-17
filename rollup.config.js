import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
	plugins: [
		nodePolyfills({
			crypto: true
		})
	],
}
