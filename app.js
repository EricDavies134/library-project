let myLibrary = [];
const revealFormBtn = document.getElementById('reveal-form');
const form = document.getElementById('new-book');
const booksContainer = document.getElementById('books-container')

function Book(author, title, pages, read){
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'has been read' : 'not yet read'}`
}

Book.prototype.readBook = function() {
    this.read = this.read ? false : true;
}

function libraryChange(){

}

function addBookToLibrary(author, title, pages, read) {
    //will write later
    const book = new Book(author, title, pages, read);
    myLibrary.push(book)
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

function generateDisplay() {
    const library = JSON.parse(localStorage.getItem('library'))
    booksContainer.innerHTML = '';
    if(library.length === 0){
        booksContainer.style.display = 'block'
        booksContainer.insertAdjacentHTML('beforeend', '<h2 class="no-books">You don\'t have any books dumbo.</h2>')
        return;
    }
    booksContainer.style.display = 'grid'
    library.forEach((element, idx) => {
        const newBook = 
        `<div class="book" data-idx="${idx}">
            <div class="float-btn trash"><span class="material-icons">delete</span></div>
            <h3>${element.title}</h3>
            <h4>${element.author}</h4>
            <div>
                <h5>Pages: ${element.pages}</h5>
                <h5>Status: ${element.read ? 'READ' : 'UNREAD'}</h5>
            </div>
            <div class="float-btn read"><span class="material-icons">done_outline</span></div>
        </div>`;
        
        booksContainer.insertAdjacentHTML('beforeend',newBook);
    });
}

function initialize(){
    if(!localStorage.getItem('library')){
    localStorage.setItem('library', JSON.stringify(myLibrary))
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    myLibrary = myLibrary.map(book => new Book(book.author, book.title, book.pages, book.read))
    generateDisplay()
}}

form.addEventListener('submit', function (e) {
    const titleEl = document.getElementById('title');
    const authorEl = document.getElementById('author');
    const pagesEl = document.getElementById('pages');
    if(titleEl.value && authorEl.value && pagesEl.value){
        const status = [...document.querySelectorAll('.radio')].filter(btn => btn.checked)[0].value === 'true'
        console.log(status)
        addBookToLibrary(authorEl.value, titleEl.value, pagesEl.value, status);
        generateDisplay()
    }
    e.preventDefault()
})

revealFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.classList.toggle('hidden')

})

booksContainer.addEventListener('click', function (e) {
    const trashBtn = e.target.closest('.trash');
    const readBtn = e.target.closest('.read');
    if(!trashBtn && !readBtn) return;
    if(trashBtn){
        const bookToDelete = trashBtn.closest('.book')
        myLibrary = myLibrary.filter(book => myLibrary.indexOf(book) != bookToDelete.dataset.idx);
        localStorage.setItem('library', JSON.stringify(myLibrary))
    }
    if(readBtn){
        const bookToRead = readBtn.closest('.book')
        myLibrary[bookToRead.dataset.idx].readBook();
        localStorage.setItem('library', JSON.stringify(myLibrary))
    }
    generateDisplay()
})

initialize()