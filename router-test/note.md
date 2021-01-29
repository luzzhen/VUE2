# VueRouter\_基础

## 什么是路由？

路由是根据不同的 url 地址展现不同的内容或页面。
早期的路由都是后端直接根据 url 来重载页面实现的，即后端控制路由。
后来页面越来越复杂，服务器压力越来越大，随着 ajax（异步刷新技术）的出现，页面的实现非重载就能刷新数据，让前端也可以控制 url 自行管理，前端路由由此而生。

## 什么时候使用前端路由？

前端路由更多用在单页应用上，也就是 SPA(Single Page Web Application)，在单页面应用中，大部分页面结果不变，只改变部分内容的使用。

## 安装路由

> 安装：`npm install vue-router`。

## 使用路由

### JavaScript

1. 引入路由

```js
import VueRouter from "vue-router";
```

2. 使用路由

```js
Vue.use(VueRouter);
```

3. 定义路由组件

```js
// 可以从其他文件 import 进来
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
```

4. 定义路由

```js
// 每个路由应该映射一个组件
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar },
];
```

5. 创建 router 实例，然后传 `routes` 配置

```js
const router = new VueRouter({
  routes,
});
```

6. 创建和挂载根实例

```js
const app = new Vue({
  router,
}).$mount("#app");
```

### html

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

## router-link class

- router-link-exact-active 当前展示路径完全匹配组件 to 属性的值
- router-link-active 当前展示路径包含 to 属性的值

> 更改 class 名

```js
VueRouter({
  linkActiveClass: "link-active",
  linkExactActiveClass: "link-exact-active",
});
```

## hash 模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

## history 模式

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
在路由配置中设置：

```js
VueRouter({
  mode: "history",
});
```

当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id, 也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

# VueRouter\_命名路由-嵌套路由-重定向-别名

## 命名路由

可以通过一个名称标识一个路由，这样在某些时候会显得更方便一些，特别是在链接一个路由，或者是执行一些跳转时，可以在创建 Router 实例时，在 routes 配置中给某个路由设置名称：

```js
routes = [
  {
    path: "/activity/personal",
    name: "personal",
    component: Personal,
  },
];
```

要链接到一个命名路由，可以给 `router-link` 的 to 属性传一个对象：

```html
<router-link :to="{ name: 'personal' }">个人中心</router-link>
```

## 嵌套路由

一个被 router-view 渲染的组件想要包含自己的嵌套 router-view 时，可以使用嵌套路由，如：

```js
{
  path: '/activity',
  component: () => import('./views/Activity'),
  children: [
    {
      path: '/activity/academic',
      name: 'academic',
      component: () => import('./views/Academic'),
    },
    {
      path: '/activity/personal',
      name: 'personal',
      component: () => import('./views/Personal'),
    },
    {
      path: '/activity/download',
      name: 'download',
      component: () => import('./views/Download'),
    }
  ],
}
```

经过这样的设置，在 Activity 组件中就可以使用 router-view 了。
子路由的 path 可以简写：

```js
path: "personal";
```

这样会自动将父路由的路径，拼接在子路由前，最终结果为：/activity/personal。

当访问 /activity 下的其他路径时，并不会渲染出来任何东西，如果想要渲染点什么，可以提供一个空路由：

```js
{
  path: '/activity',
  children: [
    {
      path: '',
      component: () => import('./views/Academic'),
    },
  ],
}
```

## 重定向

重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b

```js
const router = new VueRouter({
  routes: [{ path: "/a", redirect: "/b" }],
});
```

重定向的目标也可以是一个命名的路由：

```js
const router = new VueRouter({
  routes: [{ path: "/a", redirect: { name: "foo" } }],
});
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new VueRouter({
  routes: [
    {
      path: "/a",
      redirect: (to) => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      },
    },
  ],
});
```

## 别名

“重定向”的意思是，当用户访问 /a 时，URL 将会被替换成 /b，然后匹配路由为 /b，那么“别名”又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [{ path: "/a", component: A, alias: "/b" }],
});
```
