// ES6
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        // Add Book to List
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    
        list.appendChild(row);
    }

    showAlert(message, className){
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        //Insert Alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}




// // ES5
// // Book constructor
// function Book(title, author, isbn){
//     this.title = title;
//     this.author = author;
//     this.isbn = isbn;
// }

// // UI constructor
// function UI(){
   
// }

// UI.prototype.addBookToList = function(book){
//      // Add Book to List
//      const list = document.getElementById('book-list');
//      // Create tr element
//      const row = document.createElement('tr');
//      // Insert cols
//      row.innerHTML = `
//      <td>${book.title}</td>
//      <td>${book.author}</td>
//      <td>${book.isbn}</td>
//      <td><a href="#" class="delete">X</a></td>
//      `;
 
//      list.appendChild(row);
// }

// UI.prototype.showAlert = function(message, className){
//     // Create div
//     const div = document.createElement('div');
//     // Add classes
//     div.className = `alert ${className}`;
//     // Add text
//     div.appendChild(document.createTextNode(message));
//     // Get Parent
//     const container = document.querySelector('.container');
//     // Get form
//     const form = document.querySelector('#book-form');
//     //Insert Alert
//     container.insertBefore(div, form);

//     // Timeout after 3 sec
//     setTimeout(function(){
//         document.querySelector('.alert').remove();
//     }, 3000);
// }

// // Delete Book
// UI.prototype.deleteBook= function(target){
//     if(target.className === 'delete'){
//         target.parentElement.parentElement.remove();
//     }
// }

// UI.prototype.clearFields = function(){
//     document.getElementById('title').value = '';
//     document.getElementById('author').value = '';
//     document.getElementById('isbn').value = '';
// }

// Local Storage Class
class Store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn == isbn){
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Add Book Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value;
    const  author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validation
    if(title === '' || author === '' || isbn === ''){
        // Show an error alert
        ui.showAlert('Please fill in all the fields', 'error');
    }else{
        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book);

        // Show a success alert
        ui.showAlert('Book Added Sucessfully!', 'success');

        // Clear the entry fields
        ui.clearFields()
    }

    e.preventDefault();
});

// Delete Event Listener
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);

    // Remove from LS - obtains the ISBN Number
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Book Deleted!', 'success');


    e.preventDefault();
});