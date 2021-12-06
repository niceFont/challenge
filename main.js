class Dialog {
  _visible = false
  _dialog = null
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

    const container = document.createElement("div")
    container.classList.add("dialog__container")

    const span = document.createElement("span")
    const dialogText = document.createTextNode(this.message)
    span.appendChild(dialogText)
    
    const yesButton = document.createElement("button")
    yesButton.textContent = "Yes"
    const cancelButton = document.createElement("button")
    cancelButton.textContent = "Cancel"
    
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
  }
  
  show() {
    this._visible = true
    this._dialog.classList.add("dialog--active")

  }

  hide() {
    this._visible = false
  }
  
  
}

window.onload = function () {

  
  
  
  const d = new Dialog("Hello World")
}