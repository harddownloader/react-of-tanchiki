const path =  require('path');
const webpack, { Configuration } =  require('webpack');
const { merge } =  require('webpack-merge');
const common =  require('./webpack.common');
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
		hot: true,
		port: 9000,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
})
