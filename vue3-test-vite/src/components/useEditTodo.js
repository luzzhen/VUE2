import {ref,computed} from 'vue'

export default function editTodo (todoRef){
    const EditingTodoRef = ref(null);
    let originTodo = null
    const editingTodo = (todo)=>{
        originTodo = todo.title
        EditingTodoRef.value  = todo
        console.log(originTodo);
    }
    const upDateTodo = (todo)=>{
        EditingTodoRef.value = null ;
        console.log(todo.title)
        const title = String(todo.title).trim()
        if(title){
            todo.title = title;
        }else{
            todoRef.value.splice(todoRef.value.indexOf(todo),1)
        }
    }
    const cancelEdit = (todo)=>{
        EditingTodoRef.value = null
        console.log(originTodo);
        todo.title = originTodo
    }
    
    const allDone = computed({
        get(){
            console.log(todoRef);
          return todoRef.value.filter(todo => !todo.completed).length === 0
        },
        set(val){
            todoRef.value.forEach(todo => todo.completed = val)
        }
    })
    return {
        EditingTodoRef,
        allDone,
        editingTodo,
        upDateTodo,
        cancelEdit,
    }

}