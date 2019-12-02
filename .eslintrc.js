module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['plugin:vue/base', 'eslint:recommended'],

	// add your custom rules here
	//it is base on https://github.com/vuejs/eslint-config-vue
	// 0：off 	1：warn 	2：error
	rules: {
		// 强制 getter 和 setter 在对象中成对出现
		'accessor-pairs': 2,
		// 强制箭头函数的箭头前后使用一致的空格
		'arrow-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		// 强制在代码块中开括号前和闭括号后有空格
		'block-spacing': [2, 'always'],
		// 代码块中使用一致的大括号风格
		'brace-style': [
			2,
			'1tbs',
			{
				// 允许块的两个括号在同一行
				allowSingleLine: true
			}
		],
		// 属性名称为驼峰风格，关闭
		camelcase: [
			0,
			{
				properties: 'always'
			}
		],
		// 禁用最后一个属性的尾逗号
		'comma-dangle': [2, 'never'],
		// 强制在逗号前后使用一致的空格
		'comma-spacing': [
			2,
			{
				before: false,
				after: true
			}
		],
		// 强制使用一致的逗号风格 -- 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
		'comma-style': [2, 'last'],
		// 在构造函数中有 super() 的调用
		'constructor-super': 2,
		// 所有控制语句使用一致的括号风格 -- 单行中省略大括号，多行必须大括号
		curly: [2, 'multi-line'],
		// 在点号之前和之后一致的换行 -- 点操作符和属性放在同一行
		'dot-location': [2, 'property'],
		// 文件末尾保留一行空行
		'eol-last': 2,
		// 任何情况下使用 === 和 !==，null 不应用此规则
		eqeqeq: ['error', 'always', { null: 'ignore' }],
		// generator 函数中 * 号周围使用一致的空格
		'generator-star-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		// 回调函数中有容错处理
		'handle-callback-err': [2, '^(err|error)$'],
		// 使用 tab 缩进
		indent: [
			2,
			'tab',
			{
				// switch 语句中 case 的缩进级别
				SwitchCase: 1
			}
		],

		'jsx-quotes': 0,
		// 对象字面量的键和值之间使用一致的空格
		'key-spacing': [
			2,
			{
				// 冒号前不要空格
				beforeColon: false,
				// 冒号后要空格
				afterColon: true
			}
		],
		// 关键字前后使用一致的空格
		'keyword-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		// 构造函数首字母大写
		'new-cap': [
			2,
			{
				// 调用 new 操作符时必须
				newIsCap: true,
				// 调用首字母大写函数时不一定要有 new
				capIsNew: false
			}
		],
		// 调用无参构造函数时有圆括号
		'new-parens': 2,
		// 禁用 Array 构造函数
		'no-array-constructor': 2,
		// 禁用 arguments.caller 或 arguments.callee
		'no-caller': 2,
		// 禁用 console  -- 开发环境关闭
		'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 禁止修改类声明的变量
		'no-class-assign': 2,
		// 禁止条件表达式中出现赋值操作符
		'no-cond-assign': 2,
		// 禁止修改 const 声明的变量
		'no-const-assign': 2,
		// 禁止在正则表达式中使用控制字符  -- 关闭
		'no-control-regex': 0,
		// 禁止删除变量
		'no-delete-var': 2,
		// 禁止 function 定义中出现重名参数
		'no-dupe-args': 2,
		// 禁止类成员中出现重复的名称
		'no-dupe-class-members': 2,
		// 禁止对象字面量中出现重复的 key
		'no-dupe-keys': 2,
		// 禁止出现重复的 case 标签
		'no-duplicate-case': 2,
		// 禁止在正则表达式中使用空字符集
		'no-empty-character-class': 2,
		// 禁止使用空解构模式
		'no-empty-pattern': 2,
		// 禁用 eval()
		'no-eval': 2,
		// 禁止对 catch 子句的参数重新赋值
		'no-ex-assign': 2,
		// 禁止扩展原生类型
		'no-extend-native': 2,
		// 禁止不必要的 .bind() 调用
		'no-extra-bind': 2,
		// 禁止不必要的布尔转换
		'no-extra-boolean-cast': 2,
		// 只在 函数表达式周围 禁止不必要的括号
		'no-extra-parens': [2, 'functions'],
		// 禁止 case 语句落空
		'no-fallthrough': 2,
		// 禁止数字字面量中使用前导和末尾小数点
		'no-floating-decimal': 2,
		// 禁止对 function 声明重新赋值
		'no-func-assign': 2,
		// 禁止使用类似 eval() 的方法
		'no-implied-eval': 2,
		// 禁止 function 声明出现在嵌套的语句块中
		'no-inner-declarations': [2, 'functions'],
		// 禁止 RegExp 构造函数中存在无效的正则表达式字符串
		'no-invalid-regexp': 2,
		// 禁止在字符串和注释之外不规则的空白
		'no-irregular-whitespace': 2,
		// 禁用 __iterator__ 属性
		'no-iterator': 2,
		// 不允许标签与变量同名
		'no-label-var': 2,
		// 禁用标签语句
		'no-labels': [
			2,
			{
				allowLoop: false,
				allowSwitch: false
			}
		],
		// 禁用不必要的嵌套块
		'no-lone-blocks': 2,
		// 禁止空格和 tab 的混合缩进
		'no-mixed-spaces-and-tabs': 2,
		// 禁止使用多个空格
		'no-multi-spaces': 2,
		// 禁止使用多行字符串
		'no-multi-str': 2,
		// 禁止出现多行空行，最多 1 行
		'no-multiple-empty-lines': [
			2,
			{
				max: 1
			}
		],
		// 禁止覆盖原生对象
		'no-native-reassign': 2,
		// 禁止对表达式中的左操作数求反
		'no-negated-in-lhs': 2,
		// 禁用 Object 的构造函数
		'no-new-object': 2,
		// 禁止调用 require 时使用 new 操作符
		'no-new-require': 2,
		// 禁止 Symbol 操作符和 new 一起使用
		'no-new-symbol': 2,
		// 禁止对 String，Number 和 Boolean 使用 new 操作符
		'no-new-wrappers': 2,
		// 禁止把全局对象作为函数调用
		'no-obj-calls': 2,
		// 禁用八进制字面量
		'no-octal': 2,
		// 禁止在字符串中使用八进制转义序列
		'no-octal-escape': 2,
		// 禁止对 __dirname 和 __filename 进行字符串连接
		'no-path-concat': 2,
		// 禁用 __proto__ 属性
		'no-proto': 2,
		// 禁止多次声明同一变量
		'no-redeclare': 2,
		// 禁止正则表达式字面量中出现多个空格
		'no-regex-spaces': 2,
		// 禁止在 return 语句中使用赋值语句  -- 除非使用括号把它们括起来
		'no-return-assign': [2, 'except-parens'],
		// 禁止自我赋值
		'no-self-assign': 2,
		// 禁止自身比较
		'no-self-compare': 2,
		// 禁用逗号操作符
		'no-sequences': 2,
		// 禁止将标识符定义为受限的名字
		'no-shadow-restricted-names': 2,
		// 禁止调用函数时名称和括号间的空格
		'no-spaced-func': 2,
		// 禁用稀疏数组
		'no-sparse-arrays': 2,
		// 禁止在构造函数中，在调用 super() 之前使用 this 或 super
		'no-this-before-super': 2,
		// 禁止抛出异常字面量
		'no-throw-literal': 2,
		// 禁用行尾空格
		'no-trailing-spaces': 2,
		// 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
		'no-undef': 2,
		// 禁止将变量初始化为 undefined
		'no-undef-init': 2,
		// 禁止出现令人困惑的多行表达式
		'no-unexpected-multiline': 2,
		// 禁用一成不变的循环条件
		'no-unmodified-loop-condition': 2,
		// 禁止可以在有更简单的可替代的表达式时使用三元操作符
		'no-unneeded-ternary': [
			2,
			{
				// 禁止条件表达式作为默认的赋值模式
				defaultAssignment: false
			}
		],
		// 禁止在return、throw、continue 和 break 语句之后出现不可达代码
		'no-unreachable': 2,
		// 禁止在 finally 语句块中出现控制流语句
		'no-unsafe-finally': 2,
		// 禁止出现未使用过的变量
		'no-unused-vars': [
			2,
			{
				// 检测所有变量
				vars: 'all',
				// 不检查参数
				args: 'none'
			}
		],
		// 禁止不必要的 .call() 和 .apply()
		'no-useless-call': 2,
		// 禁止在对象中使用不必要的计算属性
		'no-useless-computed-key': 2,
		// 禁用不必要的构造函数
		'no-useless-constructor': 2,
		// 禁用不必要的转义字符  -- 关闭
		'no-useless-escape': 0,
		// 禁止属性前有空白
		'no-whitespace-before-property': 2,
		// 禁用 with 语句
		'no-with': 2,
		// 强制操作符使用一致的换行符
		'operator-linebreak': [
			2,
			// 把换行符放在操作符后面
			'after',
			{
				// 覆盖对指定的操作的全局设置
				overrides: {
					'?': 'before',
					':': 'before'
				}
			}
		],
		// 禁止块内填充
		'padded-blocks': [2, 'never'],
		// 强制使用一致的单引号
		quotes: [
			2,
			'single',
			{
				// 允许字符串使用单引号或双引号
				avoidEscape: true,
				// 允许字符串使用反勾号
				allowTemplateLiterals: true
			}
		],
		// 结尾必须用分号
		semi: [2, 'always'],
		// 强制分号之前和之后使用一致的空格
		'semi-spacing': [
			2,
			{
				before: false,
				after: true
			}
		],
		// 强制在块之前使用一致的空格
		'space-before-blocks': [2, 'always'],
		// 强制在 function的左括号之前使用一致的空格
		'space-before-function-paren': [2, 'never'],
		// 强制在圆括号内使用一致的空格
		'space-in-parens': [2, 'never'],
		// 操作符周围有空格
		'space-infix-ops': 2,
		// 强制在一元操作符前后使用一致的空格
		'space-unary-ops': [
			2,
			{
				// 单词类一元操作符必须
				words: true,
				// -、+、--、++、!、!! 等不需要
				nonwords: false
			}
		],
		// 强制在注释中 // 或 /* 使用一致的空格
		'spaced-comment': [
			2,
			// /* 或 // 必须至少跟随 1 个空白
			'always',
			{
				markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
			}
		],
		// 禁止模板字符串中的嵌入表达式周围空格的使用
		'template-curly-spacing': [2, 'never'],
		// 要求使用 isNaN() 检查 NaN
		'use-isnan': 2,
		// 强制 typeof 表达式与有效的字符串进行比较
		'valid-typeof': 2,
		// IIFE 使用括号括起来
		'wrap-iife': [2, 'any'],
		// 强制在 yield* 表达式中 * 周围使用空格
		'yield-star-spacing': [2, 'both'],
		// 禁止 “Yoda” 条件
		yoda: [2, 'never'],
		// 要求使用 const 声明那些声明后不再被修改的变量
		'prefer-const': 2,
		// 禁用 debugger  -- 开发环境中禁用
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 强制在大括号中使用一致的空格
		'object-curly-spacing': [
			2,
			'always',
			{
				// 禁止以对象元素开始或结尾的对象的花括号中有空格
				objectsInObjects: false
			}
		],
		// 禁止在数组括号内出现空格
		'array-bracket-spacing': [2, 'never']
	}
};
