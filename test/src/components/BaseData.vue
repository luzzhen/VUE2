<script>
import BaseChild from "./BaseChild";
import BaseIfFor from "./BaseIfFor";
import BaseModel from "./BaseModel";
import BaseSlot from "./BaseSlot";

export default {
  components: {
    BaseChild,
    BaseIfFor,
    BaseModel,
    BaseSlot
  },
  data(){
      return{
          content:'luzzhen'
      }
  },
  directives: {
    slice: {
      bind (el, binding, vnode) {
        const vm = vnode.context;
        let { value, expression, arg, modifiers } = binding;
        arg = arg || 5;

        if (modifiers.number) {
          value = value.replace(/[^0-9]/g, "");
        }

        el.value = value.slice(0, arg);
        vm[expression] = value.slice(0, arg);

        el.oninput = function () {
          let { value } = el;

          if (modifiers.number) {
            value = value.replace(/[^0-9]/g, "");
          }
          vm[expression] = value.slice(0, arg);
          el.value = value.slice(0, arg);
        };
      },
    },
  },
  render(createElement) {
    return createElement(
      "div",
      {
        class: {
          foo: true,
          bar: false,
        },
        style: {
          fontSize: "12px",
        },
        attrs: {
          id: "foo",
          index: 1,
        },
      },
      [
        "xxx",
        createElement("base-child", {
          props: {
            name: "base-child组件",
          },
          //nativeOn 监听组件的原生事件
          nativeOn: {
            click: function () {
              console.log("nativeOn事件");
            },
          },
        },[
          createElement('p','默认插槽'),
          createElement('p',{
            slot:'mySlot'
          },'slot-具名插槽')
        ]),
        createElement("p", {
          domProps: {
            innerHTML: "<p>domProps设置dom的属性</p>",
          },
          on: {
            click: this.onClick,
          },
        }),
        createElement("input", {
            //   <input v-slice:5.number="content"/>
            directives:[
                {
                    name:'slice',  //这就相当于是在input上用来 v-slice指令了
                    value:this.content,  //v-slice ="content"
                    expression:'content',  //表达式，实现双向数据绑定
                    arg:6,
                    modifiers: {     //修饰符：可以规定输入是什么东西
                        number:true
                    }
                }
            ]
        }),
        this.content,
        createElement('base-if-for', {
          props:{
            items:[1,2,3,4,5,6]
          }
        }),
        createElement('base-model'),
        
      ]
    );
  },
  methods: {
    onClick() {
      console.log("on的监听事件");
    },
  },
  mounted() {},
};
</script>

<style>
</style>