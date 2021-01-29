<template>
  <div class="activity">
    <div class="activity-nav">
      <router-link :to="{name :'personal'}">个人中心</router-link>
      <router-link :to="{name :'academic'}">学术讨论</router-link>
      <router-link :to="{name :'download'}">资源下载</router-link>
    </div>
    <div class="activity-main-view">
      <router-view></router-view>
    </div>
  </div>
</template>


<style scoped>
.activity-nav{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    background-color: rgba(0,0,0,.1);
    border-radius: 20px;

}
.activity-nav a{
    display: block;
    width: 100px;
    text-align: center;
    border-radius: 20px;
    padding: 0 10px;
}
.activity-nav a.router-link-active{
    background-color: rgba(0,0,0,.5);
    color: #fff;
}
.activity-main-view{
    margin: 20px 40px;
}
</style>