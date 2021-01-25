<template>
  <div class="app">
    <date-picker v-model="date"/>
  </div>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  
  created() {
    console.log(this.date);
    // Sun Jan 24 2021 16:58:33 GMT+0800 (中国标准时间)
  },
};
</script>

<style scoped>
</style>