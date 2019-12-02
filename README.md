# 7KID 管理后台

> 基于[vue-admin-template](http://panjiachen.github.io/vue-admin-template)搭建的管理后台，采用 VUE 2.0 框架和 Element UI 组件库

## 原型与设计

> 原型：http://doc.7kid.com/prd/Kindergarten%20Back/start.html
> 设计：https://lanhuapp.com/web/#/item/project/board?pid=d95de61b-5b36-416a-af7c-8061880df68a

## API 接口

> 接口：https://api.aukid.net/project/11/interface/api

## Build Setup

```bash
# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## 前端规范

##### 代码规范

1. 每一层级使用制表符（Tab）进行缩进，缩进长度为 2 个字符。
2. 采用 Scoped CSS 规范
3. 待补充~~

具体参照项目 eslint 设置

##### 风格指南

参照 VUE 官方[风格指南](https://cn.vuejs.org/v2/style-guide/)

##### 项目原则

1. 在大框架确认基础下，后期尽量不引入和使用第三方插件；如有需要，经过团队一致同意
2. 基础路由页面及对应组件放置 views 目录下；复用性高的基础组件经团队确认放置在 components 目录下
3. 项目已采用 vuex 状态管理和 vuex-persistedstate 持续化插件(默认为 localStorage)，如无必要，不再引入

##### 代码提交

----master
&nbsp;&nbsp;|----dev
&nbsp;&nbsp;&nbsp;&nbsp;|---- devbranch1
&nbsp;&nbsp;&nbsp;&nbsp;|---- devbranch2
&nbsp;&nbsp;&nbsp;&nbsp;|---- devbranch3

- 日常以 dev 为主干分支，在各自分支上独立开发；每次开发前请确认拉取最新 dev 代码合并本地分支；开发后提交代码，进行 review 后方可合并入 dev。
- 代码提交说明格式为 type:subject。 1. type 以 update（项目更新） 和 fix（修补 bug） 为主 2. subject commit 目的的简短而详细描述，数字开头分号结尾,以动词开头

```bash
update：1.新增营养健康食谱编辑页面；2.封装多图上传组件
fix: 1.修复图片上传路径参数错误bug；2.修复教师考勤页面按钮样式问题
```

##### 分支拉取与合并

- 拉取分支

```
例：从 dev 拉取最新代码到 dev_qwl 中

git checkout dev		# 1. 先切换到 dev 分支

git pull origin dev		# 2. 拉取 dev 中最新的代码

git checkout dev_qwl	# 3. 切换到分支 dev_qwl

git merge dev					# 4. 合并代码

git push origin dev_qwl		# 5. 提交到 dev_qwl 分支服务器
```

- 合并分支

```
请在gitlab发起分支合并请求
```
