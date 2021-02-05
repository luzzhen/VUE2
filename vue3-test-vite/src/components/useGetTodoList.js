import { ref, watchEffect } from 'vue';
import * as todoStorage from '../utils/todoStorage'

export default function useGetTodoList(){
    const todosRef = ref(todoStorage.fetch())
    window.todosRef = todosRef;
    watchEffect(()=>{
      todoStorage.save(todosRef.value)
    })
    // window.todosRef = todosRef;
    return  {
        todosRef      
    }
}