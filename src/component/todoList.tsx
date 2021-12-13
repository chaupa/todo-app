import classNames from 'classnames'
import React from 'react'
import { FilterTasksEnum, HandleTaskEnum, Task } from '../types'
import TodoItem from './todoItem'

type TodoListProps = {
  addTask: (name: string) => void
  handleTask: (task: Task, type: HandleTaskEnum) => void
  filterTasks: (key: FilterTasksEnum) => void
  handleCompleteAllTasks: () => void
  isCompleteAllTasks: boolean,
  tasks: Task[]
}

const TodoList = ({
  addTask,
  handleTask,
  handleCompleteAllTasks,
  isCompleteAllTasks,
  tasks
}: TodoListProps) => {
  const handleAddTask = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      title: {
        value: string
      }
    }
    if (target.title.value.replace(/\s/g, "").length > 0) {
      addTask(target.title.value)
    }
    target.title.value = ""
  }

  return (
    <div className="todoList">
      <div className="header row">
        <div className="selectAll small">
          {tasks.length > 0 && (
            <div
              className={classNames('check', {
                checked: isCompleteAllTasks
              })}
              onClick={handleCompleteAllTasks}
            />
          )}
        </div>
        <div className="addTask big">
          <form onSubmit={handleAddTask}>
            <input type="text" name="title" id="addTask" autoFocus placeholder="What needs to be done?" />
          </form>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className="list">
          {tasks.map(task => <TodoItem key={task.id} task={task} handleTask={handleTask} />)}
        </div>
      )}
    </div>
  )
}

export default TodoList