export default function removeTodo(todoRef){
    const remove = (todo) => todoRef.value.splice(todoRef.value.indexOf(todo),1);
    const removeAllCompleted =()=> todoRef.value = todoRef.value.filter(todo => !todo.completed)



    return {
        remove,
        removeAllCompleted
    }
}