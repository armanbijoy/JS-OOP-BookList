// Book Constructor

function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}
//UI Constructor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')

  const row = document.createElement('tr')

  row.innerHTML = `
    <td>${book.title} </td>
    <td>${book.author} </td>
    <td>${book.isbn} </td>
    <td><a href="#" class="delete">X<a></td>
  `

  list.appendChild(row)
}
UI.prototype.showAlert = function (message, classname) {
  const div = document.createElement('div')
  div.className = `alert ${classname}`
  div.appendChild(document.createTextNode(message))
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  container.insertBefore(div, form)
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
}

//Delete Book

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

UI.prototype.clearfields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}
//Event Listeners

document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get Form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn)

  const ui = new UI()

  //validate
  if (title == '' || author === '' || isbn === '') {
    // error aler

    ui.showAlert('Please Fill in all fields')
  } else {
    //Add book to list
    ui.addBookToList(book)

    ui.showAlert('Bookk Added!', 'success')
    ui.clearfields()
  }

  e.preventDefault()
})

//Event Listner for delete

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI()
  ui.deleteBook(e.target)

  ui.showAlert('Book Removed', 'success')
  e.preventDefault()
})
