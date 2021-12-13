import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { HandleTaskEnum, Task } from '../types'

type TodoItemProps = {
  task: Task
  handleTask: (task: Task, type: HandleTaskEnum) => void
}

const TodoItem = ({
  task,
  handleTask
}: TodoItemProps) => {
  const [currentTask, setCurrentTask] = useState<Task>(task)
  const [taskTitle, setTaskTitle] = useState<string>(currentTask.title)
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditTask = (): void => {
    setIsEditing(!isEditing)
  }
  
  const handleUpdateTask = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setTaskTitle(e.currentTarget.value)
  }

  const handleDeleteTask = (selectedTask: Task): void => {
    handleTask(selectedTask, HandleTaskEnum.Delete)
  }

  const handleCompleteTask = (selectedTask: Task): void => {
    handleTask({
      ...selectedTask,
      isDone: !currentTask.isDone
    }, HandleTaskEnum.Update)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void | boolean => {
    if (!['Enter', 'Escape'].includes(e.key)) {
      return false
    }
    if (e.key === 'Escape') {
      setTaskTitle(currentTask.title)
    }
    toggleEditTask()
  }

  useEffect(() => {
    setCurrentTask(task)
  }, [task])

  useEffect(() => {
    if (!isEditing) {
      if (taskTitle !== currentTask.title) {
        if (taskTitle.trim().length > 0) {
          handleTask({
            ...currentTask,
            title: taskTitle
          }, HandleTaskEnum.Update)
        } else {
          handleTask(currentTask, HandleTaskEnum.Delete)
        }
      }
    }
  }, [isEditing])

  return (
    <div className={classNames('todoItem', 'row', {
      done: currentTask.isDone
    })}>
      <div className="selectTask small">
        <div
          className="check"
          onClick={() => handleCompleteTask(currentTask)}
        />
      </div>
      <div className="taskContent big row">
        {!isEditing && (
          <div className="taskTitle big" onDoubleClick={toggleEditTask}>
            {task.title}
          </div>
        )}

        {isEditing && (
          <div className="taskEdit big">
            <input
              type="text"
              className="editTask"
              autoFocus={true}
              value={taskTitle}
              onInput={handleUpdateTask}
              onBlur={toggleEditTask}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        <div className="deleteTask small">
          <button onClick={() => handleDeleteTask(currentTask)}>✕</button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem