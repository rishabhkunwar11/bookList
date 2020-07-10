//class for adding a book

class Book {
    constructor(title , author ,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//storing :local storage
function getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else{
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
}
window.addEventListener('load' , add);
function add() {
    const books = getBooks();
    books.forEach( book => addBookToUI(book));
}

//adding book in local storage 
function addBookToLocalStorage(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books' , JSON.stringify(books));
}

//removing a book 
function removeBookFromLocalStorage(isbn) {
    const books = getBooks();
    books.forEach((book , index) => {
        if(book.isbn === isbn) {
            books.splice(index , 1);
        }
        localStorage.setItem('books' ,JSON.stringify(books));
    } );
    
}
//event for display a book
 function addBookToUI(book) {
     const row = document.createElement('tr')
     row.innerHTML = 
     `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href=# class = 'btn btn-danger btn-sm delete'>X</a></td>
     `

     document.querySelector('#book-list').appendChild(row);
     document.querySelector('#title').value =''
     document.querySelector('#author').value =''
     document.querySelector('#isbn').value =''
     document.querySelector('#title').focus();

}
//alert messages 
function showAlert(msg , classType) {
    const div = document.createElement('div');
    div.className =`alert alert-${classType}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div , form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    },2500);
}
//event for adding a book
document.querySelector('#book-form').addEventListener('submit' , addBook);
function addBook(event) {
    event.preventDefault();
   const title = document.querySelector('#title').value
   const author = document.querySelector('#author').value
   const isbn = document.querySelector('#isbn').value
   if(title && author && isbn){
   const book = new Book(title,author,isbn);
   addBookToUI(book);
   addBookToLocalStorage(book)
   showAlert('book added successfully!!!!!' , 'success');
} else {
    showAlert("something is missing please check",'danger');
}
}
//event for deleting a book
document.querySelector('#book-list').addEventListener('click' , (el) => {
    //el.preventDefault();
    //const del = el.target.parentElement.parentElement;
    //console.log(el.target.parentElement.previ=);
    
    if(el.target.classList.contains('delete')){
        //removing from UI
        el.target.parentElement.parentElement.remove();
        //removing from local storage
        removeBookFromLocalStorage(el.target.parentElement.previousElementSibling.textContent);        
    }
    showAlert('book removed!!' , 'success');
});

