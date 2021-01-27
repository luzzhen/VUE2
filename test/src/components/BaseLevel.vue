

<script>
export default {
    props:{
        level:{
            type: Number,
            required: true,
        }
    },
    render(createElement){
        const Vnode =  createElement("h" + this.level, this.$slots.default,'xxx')
        console.log(Vnode);
        return Vnode;
    }   
}
</script>

<style>

</style>