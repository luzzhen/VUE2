<script>
export default {
    props:{
        items:Array,
    },
    render(h){
        if(this.items.length){
            return h('ul',this.items.map((item,index) =>h('li',{
                key:item,
                attrs:{
                    index:index
                },
                ref:'myLi',
                refInFor:true
            },item)))
        }else{
            return h('p','在render函数中 JavaScript能够简单实现的语法不能使用vue指令代替')
        }
    },
    mounted(){
        console.log(this.$refs);
    }
}
</script>