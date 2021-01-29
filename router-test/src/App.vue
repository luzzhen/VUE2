<template>
  <div id="app">
    <div class="header">
      <div class="nav-header">
        <div class="nav-logo">
          <router-link to="/" tag="div">logo</router-link>
        </div>
        <ul class="nav-list">
          <router-link to="/">首页</router-link>
          <router-link to="/learn">学习</router-link>
          <router-link to="/student">学生</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/activity">社区</router-link>
          <!-- <router-link to="/activity" tag="div">社区</router-link> -->
        </ul>
      </div>
      <div class="main-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  component: {},
};
</script>
<style>
@import url("./assets/css/reset.css");
#app{
  width: 100%;
  height: 100%;
}
a{
  color: inherit ;
  text-decoration: none !important;
}
div.header{
  width: 100%;
  height: 50px;
  background-color: #3385ff;
}
div.nav-header{
  width: 80%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.nav-header .nav-logo{
  color: #fff; 
  margin: 0 20px;
  cursor: pointer;
}

.nav-list a{
  color: #fff; 
  margin:0 20px;
}
.nav-list a.router-link-active{
  font-weight: bolder;
}
.main-view{
  position: absolute;
  width: 70%;
  margin: 80px auto;
  left: 0;
  right: 0;
}

</style>