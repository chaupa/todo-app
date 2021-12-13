import { useEffect, useState } from 'react';
import { FilterTasksEnum, Task } from './types';
import TodoList from './component/todoList';
import tasksApi from './api/tasksApi';
import './App.css';

const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks = async (isDone?: boolean): Promise<void> => {
    try {
      const tasksList = await tasksApi.getAll(isDone) as unknown
      setTasks([
        ...tasksList as Task[]
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async (title: string): Promise<void> => {
    try {
      await tasksApi.post({
        id: Math.random(),
        title: title
      })
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskID: number) => {
    try {
      await tasksApi.delete(taskID)
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (task: Task) => {
    try {
      await tasksApi.put(task)
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const filterTasks = (key: FilterTasksEnum): void => {
    switch (key) {
      case FilterTasksEnum.All:
        getTasks()
        break
      case FilterTasksEnum.Active:
        getTasks(false)
        break
      case FilterTasksEnum.Completed:
        getTasks(true)
        break
      default:
        break
    }
  }

  const tasksCount = (): string => {
    let text = ''
    if (tasks.length > 1) {
      text += `${tasks.length} items`
    } else {
      text += `${tasks.length} item`
    }
    return text
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <header className="appHeader">todos</header>
        <TodoList
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          tasks={tasks}
          filterTasks={filterTasks}
        />
        <footer className="appFooter">
          <div className="tasksCount">
            {tasksCount()}
          </div>
          <div className="tasksFilter">
            <button onClick={() => filterTasks(FilterTasksEnum.All)}>All</button>
            <button onClick={() => filterTasks(FilterTasksEnum.Active)}>Active</button>
            <button onClick={() => filterTasks(FilterTasksEnum.Completed)}>Completed</button>
          </div>
          {/* <div className="clearCompleted">
            <button onClick={() => filterTasks(FilterTasksEnum.ClearCompleted)}>Clear completed</button>
          </div> */}
        </footer>
        <p className="guide">Double-click to edit a todo</p>
      </div>
    </div>
  );
}

export default App;
