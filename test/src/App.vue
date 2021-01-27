

<script>
// <template>
//   <div id="app" class="app">
//     app
//     <base-level :level="1">标题1</base-level>
//     <base-level :level="2">标题2</base-level>
//     <base-level :level="3">标题3</base-level>
//     <base-level :level="4">标题4</base-level>
//     <base-level :level="5">标题5</base-level>
//     <base-level :level="6">标题6</base-level>
//     <br />
//     <br />
//     <br />
//     <base-data :myprop="foo"></base-data>
//     <br />
//     <br />
//     <br />
//     <base-slot v-slot="slotProps">
//       {{ slotProps.text }}
//     </base-slot>
//   </div>
// </template>
import BaseLevel from "./components/BaseLevel.vue";
import BaseData from "./components/BaseData.vue";
import BaseChild from './components/BaseChild.vue';
import BaseIfFor from './components/BaseIfFor.vue';
import BaseModel from "./components/BaseModel"
import BaseSlot from "./components/BaseSlot"

export default {
  name: "App",
  components: {
    BaseLevel,
    BaseData,
    BaseChild,
    BaseIfFor,
    BaseModel,
    BaseSlot,
    BaseSlot
  },
  data() {
    return {
      foo: "foo",
    };
  },
  render(h){
    return h('div',{
      class:'app',
      id:'app'
    },[
      h('base-data',{
        attrs:{
          myprop:'foo'
        }
      }),
      h('base-slot',{
        scopedSlots:{
          default : function(props){
            return props.text;
          }
        }
      })
    ])
  }
};
</script>

<style>
</style>
