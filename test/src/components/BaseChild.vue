
<script>
// <template>
//     <div class="base-child">
//         {{ name }}
//         <slot></slot>
//         <slot name='mySlot'></slot>
//     </div>
// </template>
export default {
    props:{
        name:{
            type:String,
        }
    },
    render(h){
        return h('p',{
            class:'child'
        },[
            this.name,
            this.$slots.mySlot,
            this.$slots.default
        ])
    }
}
</script>