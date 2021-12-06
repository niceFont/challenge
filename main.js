class Dialog {
  _visible = false
  _dialog = null
  _backdrop = null

  _subscribers = []

  constructor(message) {
    this.message = message
    this.render()
  }
  
  _createButton() {
    const button = document.createElement("button")
    button.classList = ["dialog__btn"]
    button.textContent = "Click Me"
    button.addEventListener("click", () => {
      this.show()
    })
    return button
  }
  
  _createDialog() {
    this._dialog = document.createElement("div")
    this._dialog.classList.add("dialog")

    this._backdrop = document.createElement("div")
    this._backdrop.classList.add("dialog__backdrop")

    const container = document.createElement("div")
    container.classList.add("dialog__container")

    const span = document.createElement("span")
    const dialogText = document.createTextNode(this.message)
    span.appendChild(dialogText)
    
    const yesButton = document.createElement("button")
    yesButton.textContent = "Yes"
    yesButton.addEventListener("click", () => {
      this.emit(true)
      this.hide()
    })
    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel"
    cancelButton.addEventListener("click", () => {
      this.emit(false)
      this.hide()
    })

    container.appendChild(span)
    container.appendChild(yesButton)
    container.appendChild(cancelButton)

    this._dialog.appendChild(container)

  }
  render() {
  
    const button = this._createButton()
    this._createDialog()
    const app = document.getElementById("app")
    app.appendChild(button)
    app.appendChild(this._dialog)
    app.appendChild(this._backdrop)
  }
  
  show() {
    this._visible = true
    this._dialog.classList.add("dialog--active")
    this._backdrop.classList.add("dialog__backdrop--active")

  }

  hide() {
    this._visible = false
    this._dialog.classList.remove("dialog--active")
    this._backdrop.classList.remove("dialog__backdrop--active")
  }
  
  emit(value) {
    this._subscribers.forEach((cb) => {
      cb(value)
    })
  }
  
  subscribe(cb) {
    this._subscribers.push(cb)
  }
}

window.onload = function () {

  
  
  
  const d = new Dialog("Hello World")
  
  const node = document.createElement("span")
  const text = document.createTextNode("")
  node.appendChild(text)
  document.body.appendChild(node)
  d.subscribe((value) => {
    node.innerText = `You have clicked ${value ? 'Yes' : 'Cancel'}`
  })
}