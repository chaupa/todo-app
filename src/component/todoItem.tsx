import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { HandleTaskEnum, Task } from '../App'

type TodoItemProps = {
  task: Task
  handleTask: (task: Task, type: HandleTaskEnum) => void
}

const TodoItem = ({
  task,
  handleTask
}: TodoItemProps) => {
  const [currentTask, setCurrentTask] = useState<Task>(task)
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditTask = () => {
    setIsEditing(!isEditing)
  }
  
  const handleUpdateTask = (e: React.FormEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value
    if (newTitle.replace(/\s/g, "").length > 0) {
      setCurrentTask((prevState) => (
        {
          ...prevState,
          title: newTitle
        }
      ))
    } else {
      handleTask(currentTask, HandleTaskEnum.Delete)
    }
  }

  const handleDeleteTask = (selectedTask: Task) => {
    handleTask(selectedTask, HandleTaskEnum.Delete)
  }

  useEffect(() => {
    handleTask(currentTask, HandleTaskEnum.Update)
  }, [currentTask])

  return (
    <div className={classNames('todoItem', 'row', {
      done: currentTask.isDone
    })}>
      <div className="selectTask small">
        <div
          className="check"
          onClick={() => setCurrentTask((prevState) => (
            {
              ...prevState,
              isDone: !currentTask.isDone
            }
          ))}
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
              value={currentTask.title}
              onChange={handleUpdateTask}
              onBlur={toggleEditTask}
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => (e.key === 'Enter' && toggleEditTask())}
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