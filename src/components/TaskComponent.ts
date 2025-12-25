// View/Component - заготовки/куски интерфейса
interface TaskComponentArgs {
  title: string
  isDone: boolean
  deleteTask: () => void
  updateTask: (newTitle: string) => void
  updateStatus: (newStatus: boolean) => void
}

export default function TaskComponent({ title, isDone, updateTask, deleteTask, updateStatus }: TaskComponentArgs): HTMLDivElement {
  // deleteTask = () => this.deleteTask(task.id)
  // Кнопка удалить
  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn btn-danger'
  deleteBtn.type = 'button'
  deleteBtn.innerHTML = 'Удалить'
  deleteBtn.addEventListener('click', () => {
    deleteTask()
  })

  // Кнопка изменить
  const approveChangesBtn = document.createElement('button')
  approveChangesBtn.className = 'btn btn-primary hidden'
  approveChangesBtn.innerText = 'Изменить'
  approveChangesBtn.addEventListener('click', () => {
    updateTask(input.value)
  })

  // Основной див alert
  const alertDiv = document.createElement('div')
  alertDiv.className = `alert alert-${isDone ? 'success' : 'dark'} task-component`
  alertDiv.role = 'alert'

  // Input с названием
  const input = document.createElement('input')
  input.className = `task-input ${isDone ? 'done' : ''}`
  input.value = title
  input.readOnly = true
  if (!isDone) {
    input.addEventListener('focus', () => {
      input.readOnly = false
      approveChangesBtn.classList.remove('hidden')
      deleteBtn.classList.add('hidden')
    })
    input.addEventListener('blur', () => {
      setTimeout(() => {
        input.readOnly = true
        approveChangesBtn.classList.add('hidden')
        deleteBtn.classList.remove('hidden')
      },100)
    })
  }

  // makeDoneBtn
  const makeDoneBtn = document.createElement('button')
  makeDoneBtn.className = 'btn btn-success'
  makeDoneBtn.innerText = 'Выполнить'
  makeDoneBtn.addEventListener('click', () => {
    updateStatus(true)
  })

  // return btn
  const returnBtn = document.createElement('button')
  returnBtn.className = 'btn btn-warning'
  returnBtn.innerText = 'Вернуть'
  returnBtn.addEventListener('click', () => {
    updateStatus(false)
  })

  const buttonsContainer = document.createElement('div')
  buttonsContainer.className = 'task-component-buttons-container'

  buttonsContainer.appendChild(approveChangesBtn)
  if (!isDone) {
    buttonsContainer.appendChild(makeDoneBtn)
  }
  else {
    buttonsContainer.appendChild(returnBtn)
  }
  buttonsContainer.appendChild(deleteBtn)

  alertDiv.append(input, buttonsContainer)

  return alertDiv
}
