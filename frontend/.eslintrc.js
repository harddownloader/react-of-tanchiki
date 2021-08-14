module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['react', 'prettier', 'react-hooks'],
	extends: [
		'airbnb-base',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},

	rules: {
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'never',
			{
				svg: 'always',
				png: 'always',
				jpg: 'always',
			},
		],
		quotes: ['error', 'single'],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
	},
	settings: {
		version: 'detect', // React version. "detect" автоматически выбирает версию, которую вы установили.
		flowVersion: '0.53', // Версия потока
	},
}
