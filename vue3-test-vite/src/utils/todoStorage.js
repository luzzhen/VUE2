const LOCAL_KEY = "todomvc";

/*
生成一个任务的唯一编号 时间戳+16进制的4个随机数      
*/
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 从localStorage里获取任务
 */
export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}

/**
 * 保存所有任务到localStorage
 * @param {*} todos
 */
export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

export function filter(todos, vilibility) {
    
    console.log(todos);
    if (vilibility === "all") {
      return todos;
    } else if (vilibility === "active") {
      return todos.filter((it) => !it.completed);
    } else if (vilibility === "completed") {
      return todos.filter((it) => it.completed);
    }
  
    throw new Error('invalid visibility value')
  
}
