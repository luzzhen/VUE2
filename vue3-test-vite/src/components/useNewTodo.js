import {ref} from 'vue'
import * as todoStorage from '../utils/todoStorage'

export default function useNewTodo(todosRef){
    const newTodoRef = ref('')  //新任务的标题
    const addTodo = () =>{
        console.log(newTodoRef.value);
       const newTodo = newTodoRef.value && newTodoRef.value.trim() ;
       if(!newTodo){
           return
       }
       console.log("新增",newTodo, todosRef);

       //生成一个任务对象，加入到任务列表中
       const todo = {
           id : todoStorage.generateId(),
           title: newTodo,
           completed: false
       }
       todosRef.value.push(todo)
       newTodoRef.value = ''
    }
    return {
        newTodoRef,
        addTodo,
    }
}