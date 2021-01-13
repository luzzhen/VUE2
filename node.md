[toc]

# 课程准备

- 所有代码及文件放到 github 上进行托管，同学们自行 clone
- github 地址：https://github.com/DuYi-Edu/DuYi-VUE
- 下载并安装 vue-devtools 插件
- 由于某些原因，下载不了谷歌商店上的插件，所以做好科学上网
- 安装插件：https://github.com/qin-ziqi/Chrome-SetupVPN-3.7.0 ，跟着上面的步骤做，插件安装较慢，据不完全统计，约需 30 分钟
- 安装好了后，点击谷歌浏览器的更多工具 -> 扩展程序 -> 打开 chrome 网上应用商店 -> 搜索 vue devtools -> 添加至 chrome
- 是否生效？访问：https://www.bilibili.com/ ，图标变绿了就生效了
- 有什么用？以后再说，听我的，安装
- 课程笔记会给你们，所以在学习课程的时候，认真听，认真思考
- 安装 vscode 插件：Markdown Preview Enhanced
- 课程会先讲解 vue 语法，先把 vue 语法学会了之后，在剖析其他的问题

# 开始使用 Vue

1. 引入 vue.js

   > 官网：vuejs.org
   > 开发版本：包含完整的警告和调试模式
   > 生产版本：删除了警告，体积更小

2. 引入 vue.js 后，给我们提供了一个构造函数 Vue
3. 在 js 中，`new Vue()`
4. `new Vue()` 后会返回一个 vue 实例对象，我们用变量接着它
5. `const vm = new Vue()`
6. 传递一个配置对象{} -- > `const vm = new Vue({})`

## el

> 类型： 字符串
> 全称：element（元素）
> 作用：配置控制的元素，表示 Vue 要控制的区域，值为 css 选择器

```html
<!-- 被Vue控制的区域，我们称之为模板 -->
<div id="app"></div>
```

```js
const vm = new Vue({
  el: "#app", // 控制id为app的元素
});
```

## $mount

- 作用和 el 一致，都是配置控制的元素，使用哪个都可以，二选一

  ```html
  <div id="app"></div>
  ```

  ```js
  const vm = new Vue({});
  vm.$mount("#app");
  ```

- 问：和 el 有什么不同？
  > 答：本质上没什么不同，$mount 为手动挂载，在项目中有时要进行延迟挂载，比如有时要在挂载之前进行一些其他的操作，比如判断等等（但是，这样做的时候很少，比邓哥回家的次数还少，emmmmm）

## data

- 类型：对象
- 作用：存放要用到的数据，数据为响应式的

  ```js
  const vm = new Vue({
    el: "#app",
    data: {
      mrDeng: "风姿绰约、花枝招展",
    },
  });
  ```

## 插值表达式

- 使用方法： {{ }}
- 可以将 vue 中的数据填在插值表达式中，如：

  ```html
  <div id="app">{{ mrDeng }}</div>
  ```

  ```js
  const vm = new Vue({
    el: "#app",
    data: {
      mrDeng: "邓哥：风姿绰约、花枝招展",
    },
  });
  ```

- 除了填写 data 之外，还可以直接填写数据值（数字、字符串、布尔值、undefined、null、数组、对象），如:

  ```html
  <div id="app">
    {{ 5201314 }} {{ '婀娜多姿、亭亭玉立' }} {{ true }} {{ ['邓旭明', '小刘',
    '王小宝'] }} {{ {name: '邓旭明', age: 80, height: '140cm', weight: '100kg'}
    }}
  </div>
  ```

- 注意：在插值表达式中直接书写对象类型值时，不要将三个{}连在一起，这样会报错，如：

  ```html
  <div id="app">
    <!-- 这样可是不行滴 -->
    {{{name: '邓旭明', age: 80, height: '140cm', weight: '100kg'}}}
  </div>
  ```
  
- 还可在插值表达式中写表达式，如：

  ```html
  <div id="app">
    <!-- 运算表达式 -->
    {{ 'you' + 'me' }} {{ 10 - 5 }} {{ 100 * 7 }} {{ 1000 / 12 }}
    <!-- 逻辑表达式 -->
    {{ liu || li }} {{ deng && liu }} {{ !wang }}
    <!-- 三元表达式 -->
    {{ 1 + 1 === 3 ? '邓旭明' : '正常人' }}
    <!-- 函数调用也是表达式，也可以使用,这个以后再学哈... -->
  </div>
  ```

- 还可以填写其他的吗？不可以，No，以下这些都是不行滴：

  ```html
  <div id="app">
    <!-- 这是语句，不可以写在插值表达式中 -->
    {{ var Deng = 'shuaige'; console.log(deng) }}
    <!-- 流程控制也不可以 -->
    {{ if(Deng.looks === 'shuai'){ console.log('不可能')} }}
  </div>
  ```

- <font color=#ba55d3>记住</font>：插值表达式中，可以写：data、js 数据、表达式，其他的想都不要想。

- <font color=#ff4500>注意</font>，只要插值表达式中使用了数据，必须在 data 中声明过，否则会报错

  ```html
  <!-- 此时就报错啦，因为mrCheng，未在data中声明过 -->
  <div id="app">{{ mrCheng }}</div>
  ```

  ```js
  const vm = new Vue({
    el: "#app",
    data: {
      mrDeng: "邓哥：风姿绰约、花枝招展",
    },
  });
  ```

- 还有另外一种可能，使用了未被声明过的数据，不报错：
  ```html
  <!-- 此时不报错啦，why？ -->
  <!-- 在作用域上找不到，报错 -->
  <!-- 在原型链上找不到，值为undefined -->
  <!-- undefined为js基本类型值，所以就不报错啦 -->
  <div id="app">{{ mrDeng.wife }}</div>
  ```
  ```js
  const vm = new Vue({
    el: "#app",
    data: {
      mrDeng: {
        name: "邓旭明",
        age: 80,
        height: "140cm",
        weight: "100kg",
      },
    },
  });
  ```

# vue 的响应式-1

- 数据变化，页面就会重新渲染

- 怎么更改数据？so easy

```html
<div id="app">{{ mrDeng }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    mrDeng: "邓哥：风姿绰约、花枝招展",
  },
});
vm.mrDeng = "手如柔荑、肤如凝脂"; // 见证奇迹的时刻，页面变化啦
```

- 问：为什么 data 会直接出现在 vm 实例对象中咧？

  > 答：当创建 vue 实例时，vue 会将 data 中的成员代理给 vue 实例，目的是为了实现响应式，监控数据变化，执行某个监听函数（怎么实现的？想一想，提示：Object.defineProperty，试着实现一下）

- 问：实例中除了 data 数据外，其他东西是啥子？

  > 为了防止名称冲突。因为会将 data 中数据代理给 vue，假如说我们自己写的 data 名称和 vue 中自带的属性冲突了，那么就会覆盖 vue 内部的属性，所以 vue 会把自己内部的属性成员名称前加上\$或\_，如果加上的是\$，代表是我们可以使用的，如果加上的是\_，是 vue 自己内部使用的方法或属性，我们不需要调用

- 更改的数据必须是存在的数据，否则不能重新渲染页面，因为他监听不到，如：

```html
<!-- 即使更改了数据，也不会重新渲染页面 -->
<div id="app">{{ mrDeng.wife }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    mrDeng: {
      name: "邓旭明",
      age: 80,
      height: "140cm",
      weight: "100kg",
    },
  },
});

vm.mrDeng.wife = "liu";
```

- 更改的数据必须已渲染过的数据，否则从性能角度考虑，不会重新渲染页面，如：

```html
<!-- 即使更改了数据，也不会重新渲染页面 -->
<div id="app">{{ mrDeng.wife }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    msg: "邓哥：风姿绰约、花枝招展",
    mrDeng: {
      name: "邓旭明",
      age: 80,
      height: "140cm",
      weight: "100kg",
    },
  },
});

vm.mrDeng.wife = "liu";
vm.msg = "邓哥：手如柔荑、肤如凝脂";
```

- 更改数据后，页面会立刻重新渲染吗？
  > vue 更新 DOM 的操作是异步执行的，只要侦听到数据变化，将开启一个异步队列，如果一个数据被多次变更，那么只会被推入到队列中一次，这样可以避免不必要的计算和 DOM 操作。

> 同步执行栈执行完毕后，会执行异步队列

```html
<div id="app">{{ msg }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    msg: "杉杉",
  },
});
vm.msg = "杉杉超美的";
console.log(vm.msg); // 杉杉超美的，此时数据已更改
console.log(vm.$el.innerHTML); // 杉杉。此时页面还未重新渲染
```

## vm.$el

- 值为被 Vue 控制的元素（或者说，Vue 挂载的元素）

## vm.$nextTick & Vue.nextTick

- 如何在更改数据后，看到渲染后的页面上的值？
  > 答：利用 vm.\$nextTick 或 Vue.nextTick，在页面重新渲染，DOM 更新后，会立刻执行 vm.$nextTick

```html
<div id="app">{{ msg }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    msg: "杉杉",
  },
});
vm.msg = "杉杉超美的";
console.log(vm.msg); // 杉杉超美的，此时数据已更改
// 1. 使用vm.$nextTick
vm.$nextTick(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
});
// 2. 使用Vue.nextTick
Vue.nextTick(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
});
```

- vm.nextTick 和 Vue.nextTick 还可以作为 Promise 使用

```html
<div id="app">{{ msg }}</div>
```

```js
const vm = new Vue({
  el: "#app",
  data: {
    msg: "杉杉",
  },
});
vm.msg = "杉杉超美的";
// 1. 使用vm.$nextTick
vm.$nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
});
// 2. 使用Vue.nextTick
Vue.nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
});
```

- vm.$nextTick 和 Vue.nextTick 的区别？

> Vue.nextTick 内部函数的 this 指向 window

```js
Vue.nextTick(function () {
  console.log(this); // window
});
```

> vm.\$nextTick 内部函数的 this 指向 Vue 实例对象

```js
vm.$nextTick(function () {
  console.log(this); // vm实例
});
```

- 好奇 nextTick 是怎么实现的吗？
- 异步任务分为宏任务（macro）和微任务（micro）
- 宏任务比较慢（如 setTimeout 等），微任务比较快（如 Promise.then()等）
- 微任务在前，宏任务在后（eventloop，事件环）

  ```js
  // 控制台打印顺序：promise > timeout
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  Promise.resolve().then(() => {
    console.log("promise");
  });
  ```

- 在 nextTick 的实现源码中，会先判断是否支持微任务，不支持后，才会执行宏任务

  ```js
  if (typeof Promise !== "undefined") {
    // 微任务
    // 首先看一下浏览器中有没有promise
    // 因为IE浏览器中不能执行Promise
    const p = Promise.resolve();
  } else if (typeof MutationObserver !== "undefined") {
    // 微任务
    // 突变观察
    // 监听文档中文字的变化，如果文字有变化，就会执行回调
    // vue的具体做法是：创建一个假节点，然后让这个假节点稍微改动一下，就会执行对应的函数
  } else if (typeof setImmediate !== "undefined") {
    // 宏任务
    // 只在IE下有
  } else {
    // 宏任务
    // 如果上面都不能执行，那么则会调用setTimeout
  }
  ```

- 曾经 vue 用过的宏任务
  - MessageChannel 消息通道 宏任务
