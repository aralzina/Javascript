function createModal (title, content) {
  // Create modal elements
  const modal = document.createElement('div')
  const modalContent = document.createElement('div')
  const modalHeader = document.createElement('div')
  const modalBody = document.createElement('div')
  const modalFooter = document.createElement('div')
  const closeButton = document.createElement('span')

  // Set classes for styling
  modal.className = 'modal'
  modalContent.className = 'modal-content'
  modalHeader.className = 'modal-header'
  modalBody.className = 'modal-body'
  modalFooter.className = 'modal-footer'
  closeButton.className = 'close-button'

  // Set content
  closeButton.innerHTML = '&times;'
  modalHeader.innerHTML = `<h2>${title}</h2>`
  modalBody.innerHTML = `<p>${content}</p>`
  modalFooter.innerHTML = '<button id="closeModal">Close</button>'

  // Append elements
  modalHeader.appendChild(closeButton)
  modalContent.appendChild(modalHeader)
  modalContent.appendChild(modalBody)
  modalContent.appendChild(modalFooter)
  modal.appendChild(modalContent)
  document.body.appendChild(modal)

  // Close modal on button click
  document.getElementById('closeModal').onclick = function () {
    modal.style.display = 'none'
  }

  // Close modal on close button click
  closeButton.onclick = function () {
    modal.style.display = 'none'
  }

  // Close modal on outside click
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  // Show modal
  modal.style.display = 'block'
}

// Example usage
createModal('Modal Title', 'This is the content of the modal.')

// Add basic CSS for modal
const style = document.createElement('style')
style.innerHTML = `
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close-button {
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  .modal-footer {
    text-align: right;
  }
`
document.head.appendChild(style)
