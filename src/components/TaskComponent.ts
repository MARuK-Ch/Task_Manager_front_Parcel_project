interface TaskComponenetArgs {
    title: string
    isDone: boolean
    deleteTask: () => void
    updateTask: (newTitle: string) => void
    updateStatus: (newStatus: boolean) => void
}

export default function TaskComponent({ title, isDone, deleteTask, updateTask, updateStatus }: TaskComponenetArgs): HTMLDivElement {
    const deleteBtn: HTMLButtonElement = document.createElement('button')
    deleteBtn.className = 'btn btn-danger'
    deleteBtn.type = 'button'
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener('click', () => {
        deleteTask()
    })

    const approveChangesBtn: HTMLButtonElement = document.createElement('button')
    approveChangesBtn.className = 'btn btn-light hidden'
    approveChangesBtn.innerText = 'Change'
    approveChangesBtn.addEventListener('click', () => {
        updateTask(input.value)
    })

    const alertDiv: HTMLDivElement = document.createElement('div')
    alertDiv.className = `alert alert-${isDone ? 'success' : 'info'} task-component`
    alertDiv.role = 'alert'

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
            }, 199)
        })
    }

    const makeDoneBtn = document.createElement('button')
    makeDoneBtn.className = 'btn btn-success'
    makeDoneBtn.innerText = 'Done'
    makeDoneBtn.addEventListener('click', () => {
        updateStatus(true)
    })

    const returnDoneBtn = document.createElement('button')
    returnDoneBtn.className = 'btn btn-warning'
    returnDoneBtn.innerText = 'Return'
    returnDoneBtn.addEventListener('click', () => {
        updateStatus(false)
    })

    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = 'task-component-buttons-container'
    if (!isDone) {
        buttonsContainer.appendChild(approveChangesBtn)
        buttonsContainer.appendChild(makeDoneBtn)
    } else {
        buttonsContainer.append(returnDoneBtn)
    }
    buttonsContainer.append(deleteBtn)

    alertDiv.append(input, buttonsContainer)

    return alertDiv
}
