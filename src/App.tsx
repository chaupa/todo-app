import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './component/todoList';

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export enum HandleTaskEnum {
  Update = 'update',
  Delete = 'delete'
}

export enum FilterTasksEnum {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
  ClearCompleted = 'clear completed'
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [dataSource, setDataSource] = useState<Task[]>(tasks)
  const [isCompleteAllTasks, setIsCompleteAllTasks] = useState(false)

  useEffect(() => {
    if (filteredTasks.length > 0) {
      setDataSource(filteredTasks)
    } else {
      setDataSource(tasks)
    }
  }, [filteredTasks, tasks])

  useEffect(() => {
    const tasksList = [...tasks]
    const completedTasksList = tasksList.map((task) => {
      if (isCompleteAllTasks === true) {
        task.isDone = true
      } else {
        task.isDone = false
      }
      return task
    })
    setTasks(completedTasksList)
  }, [isCompleteAllTasks])

  const addTask = (title: string) => {
    const taskID = Math.random()
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: taskID,
        title: title,
        isDone: false
      }
    ])
  }

  const handleTask = (task: Task, type: HandleTaskEnum) => {
    const tasksList = [...tasks]
    const taskIndex = tasksList.findIndex(item => item.id === task.id)
    if (type === 'update') {
      tasksList[taskIndex] = task
    }
    if (type === 'delete') {
      tasksList.splice(taskIndex, 1)
    }
    setTasks(tasksList)
  }

  const filterTasks = (key: FilterTasksEnum) => {
    const tasksList = [...tasks]
    let filteredTasksList = []
    switch (key) {
      case FilterTasksEnum.All:
        setFilteredTasks([])
        setDataSource(tasksList)
        break
      case FilterTasksEnum.Active:
        filteredTasksList = tasksList.filter((task => {
          return task.isDone === false
        }))
        setFilteredTasks(filteredTasksList)
        break
      case FilterTasksEnum.Completed:
        filteredTasksList = tasksList.filter((task => {
          return task.isDone === true
        }))
        if (filteredTasksList.length === 0) {
          setDataSource(filteredTasksList)
        }
        setFilteredTasks(filteredTasksList)
        break
      case FilterTasksEnum.ClearCompleted:
        filteredTasksList = tasksList.filter((task => {
          return task.isDone === false
        }))
        setIsCompleteAllTasks(false)
        setFilteredTasks([])
        setTasks(filteredTasksList)
        break
      default:
        break
    }
  }

  const handleCompleteAllTasks = () => {
    setIsCompleteAllTasks(!isCompleteAllTasks)
    return false
  }

  const tasksCount = () => {
    let text = ''
    if (dataSource.length > 1) {
      text += `${dataSource.length} items`
    } else {
      text += `${dataSource.length} item`
    }

    return text
  }

  return (
    <div className="App">
      <div className="container">
        <header className="appHeader">todos</header>
        <TodoList
          addTask={addTask}
          handleTask={handleTask}
          tasks={dataSource}
          filterTasks={filterTasks}
          handleCompleteAllTasks={handleCompleteAllTasks}
          isCompleteAllTasks={isCompleteAllTasks}
        />
        {tasks.length > 0 && (
          <>
            <footer className="appFooter">
              <div className="tasksCount">
                {tasksCount()}
              </div>
              <div className="tasksFilter">
                <button onClick={() => filterTasks(FilterTasksEnum.All)}>All</button>
                <button onClick={() => filterTasks(FilterTasksEnum.Active)}>Active</button>
                <button onClick={() => filterTasks(FilterTasksEnum.Completed)}>Completed</button>
              </div>
              <div className="clearCompleted">
                <button onClick={() => filterTasks(FilterTasksEnum.ClearCompleted)}>Clear completed</button>
              </div>
            </footer>
            <p className="guide">Double-click to edit a todo</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
