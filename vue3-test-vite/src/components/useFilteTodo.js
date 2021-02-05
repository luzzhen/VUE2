import {ref,watchEffect,onMounted,onUnmounted,computed} from 'vue'
import  * as todoStorage from "../utils/todoStorage"

const validHash = ['all', 'active', 'completed']

export default function filteTodo(todosRef){
    const visibilityRef = ref ('all')
    const onHashChange = ()=>{
        // console.log(location.hash);
        const hash = location.hash.replace(/#\/?/, "");
        if(validHash.includes(hash)){
            console.log('hash有效');
            //hash有效
            visibilityRef.value = hash
            console.log(hash);

            
            // console.log(newList);
        }else{
            console.log('hash无效');
            location.hash = ''
            visibilityRef.value = 'all'

        }
        
        // console.log(hash.includes('all'))
        // if(hash.includes('all') || hash.includes('Active')){
        //     newList = todosRef
        // }else if(hash.includes('completed')){
        //     newList = todosRef.value.filter(todo => todo.completed)
        // }
    }
    onMounted(()=> {
        console.log(todosRef);
        window.addEventListener('hashchange',onHashChange)
    })

    //计算属性
    const filterTodosRef = computed({
        get(){
            return todoStorage.filter(todosRef.value, visibilityRef.value)
        },
        // set(val){

        // },
    })
    return{
        visibilityRef,
        filterTodosRef
    }
}