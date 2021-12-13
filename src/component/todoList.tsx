import React, { useEffect, useState } from 'react'
import { TodoListProps } from '../types'
import TodoItem from './todoItem'

const TodoList = ({
  addTask,
  updateTask,
  deleteTask,
  tasks
}: TodoListProps) => {
  const [taskExist, setTaskExist] = useState<boolean>(false)

  const handleAddTask = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      title: {
        value: string
      }
    }
    if (target.title.value.replace(/\s/g, "").length > 0) {
      let taskExist = false
      for (const task of tasks) {
        if (task.title === target.title.value) {
          taskExist = true
          break
        }
      }
      if (taskExist) {
        setTaskExist(true)
      } else {
        addTask(target.title.value)
      }
    }
    target.title.value = ""
  }

  useEffect(() => {
    const taskExistTimeout = setTimeout(() => {
      setTaskExist(false)
    }, 2000)
    return () => {
      clearTimeout(taskExistTimeout)
    }
  }, [taskExist])

  return (
    <div className="todoList">
      <div className="header row">
        {/* <div className="selectAll small">
          {tasks.length > 0 && (
            <div
              className={classNames('check', {
                checked: isCompleteAllTasks
              })}
              onClick={handleCompleteAllTasks}
            />
          )}
        </div> */}
        <div className="addTask big">
          {taskExist && (
            <div className="taskExist">This task already exists</div>
          )}
          <form onSubmit={handleAddTask}>
            <input type="text" name="title" id="addTask" autoFocus placeholder="What needs to be done?" />
          </form>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className="list">
          {tasks.map(task => <TodoItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />)}
        </div>
      )}
    </div>
  )
}

export default TodoList