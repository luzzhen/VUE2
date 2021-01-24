<template>
  <div>
    {{ msg }}
	<base-son />
  </div>
  
</template>

<script>
import baseSon from "./Son.vue";

export default {
  components: {
    baseSon,
  },
  data() {
    return {
      msg: "luzzhen",
    };
  },
};
</script>

<style>
div {
 
  background-color: red;
}
</style>
