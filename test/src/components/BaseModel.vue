<script>
export default {
    data(){
        return{
            value:'luzzhen'
        }
    },
    render(h){
        var This = this;
        return h('div',{
            
        },[
            h('input',{
                attrs:{
                    value:this.value
                },
                on:{
                    input(e){
                        // console.log(e.target.value);
                        This.value = e.target.value;
                    }
                }
            }),
            this.value,

        ])
    }
}
</script>