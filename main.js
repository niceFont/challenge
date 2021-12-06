class Dialog {
  _visible = false
  _dialog = null
  _backdrop = null
  _button = null
  _subscribers = []

  constructor(message) {
    this.message = message
    this._render()
  }
  
  _createButton() {
    const button = document.createElement("button")
    button.classList = ["dialog__btn"]
    button.textContent = "Click Me"
    button.addEventListener("click", () => {
      this.show()
    })
    this._button = button
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
    
    const buttonContainer = document.createElement("div")
    const yesButton = document.createElement("button")
    yesButton.textContent = "Yes"
    yesButton.addEventListener("click", () => {
      this._notify(true)
      this.hide()
    })
    yesButton.classList.add("dialog__actionbuttons")
    yesButton.classList.add("yes")
    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel"
    cancelButton.addEventListener("click", () => {
      this._notify(false)
      this.hide()
    })
    cancelButton.classList.add("dialog__actionbuttons")
    cancelButton.classList.add("cancel")
    buttonContainer.appendChild(yesButton)
    buttonContainer.appendChild(cancelButton)

    container.appendChild(span)
    container.appendChild(buttonContainer)

    this._dialog.appendChild(container)
  }
  _render() {
  
    this._createButton()
    this._createDialog()
    const app = document.getElementById("app")
    app.appendChild(this._button)
    app.appendChild(this._dialog)
    app.appendChild(this._backdrop)
  }
  
  /**
   * Hide dialog
   */
  show() {
    this._visible = true
    this._dialog.classList.add("dialog--active")
    this._backdrop.classList.add("dialog__backdrop--active")

  }

  /**
   * Show dialog
   */
  hide() {
    this._visible = false
    this._dialog.classList.remove("dialog--active")
    this._backdrop.classList.remove("dialog__backdrop--active")
  }
  
  _notify(value) {
    this._subscribers.forEach((cb) => {
      cb(value)
    })
  }
  
  /**
   *  Subscribe to event using callback
   *  Returns unsubscribe function
   */
  subscribe(cb) {
    this._subscribers.push(cb)

    return () => {
      const i = this._subscribers.findIndex((subs) => subs === cb)
      this._subscribers.splice(i, 1)
    }
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