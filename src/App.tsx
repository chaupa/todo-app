import React, { useEffect, useState } from 'react';
import tasksApi from './api/tasksApi';
import './App.css';
import TodoList from './component/todoList';
import { FilterTasksEnum, HandleTaskEnum, Task } from './types';

const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [dataSource, setDataSource] = useState<Task[]>(tasks)
  const [isCompleteAllTasks, setIsCompleteAllTasks] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getTasks = async (): Promise<void> => {
    try {
      const tasksList = await tasksApi.getAll() as unknown
      console.log(tasksList)
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
        title: title
      })
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTask = (task: Task, type: HandleTaskEnum): void => {
    if (type === HandleTaskEnum.Update) {
      const updateTask = async () => {
        try {
          await tasksApi.put(task)
          getTasks()
        } catch (error) {
          console.log(error)
        }
      }
      updateTask()
    }
    if (type === HandleTaskEnum.Delete) {
      const deleteTask = async () => {
        try {
          await tasksApi.delete(task)
          getTasks()
        } catch (error) {
          console.log(error)
        }
      }
      deleteTask()
    }
  }

  const filterTasks = (key: FilterTasksEnum): void => {
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
        const tasksIdToDelete = tasksList.filter((task => {
          return task.isDone === true
        }))
        console.log(tasksIdToDelete)
        // filteredTasksList = tasksList.filter((task => {
        //   return task.isDone === false
        // }))
        setIsCompleteAllTasks(false)
        setFilteredTasks([])
        // setTasks(filteredTasksList)
        break
      default:
        break
    }
  }

  const handleCompleteAllTasks = () => {
    setIsCompleteAllTasks(!isCompleteAllTasks)
    return false
  }

  const tasksCount = (): string => {
    let text = ''
    if (dataSource.length > 1) {
      text += `${dataSource.length} items`
    } else {
      text += `${dataSource.length} item`
    }

    return text
  }

  useEffect(() => {
    getTasks()
  }, [])

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
