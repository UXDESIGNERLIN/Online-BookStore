
let search = document.getElementById("search");
let book_name = document.getElementById("book_name");
let result_title = document.getElementById("result_title");
let book_template = document.getElementById("book_template");
let page=0;
let page_forward = document.getElementById("page_forward");
let page_backward = document.getElementById("page_backward");


search.addEventListener("submit", submit);
function submit(e) {
    e.preventDefault();
    let request = new XMLHttpRequest();  
    request.open("GET","https://www.googleapis.com/books/v1/volumes?maxResults=18&q="+book_name.value+"&key=AIzaSyAU5C02ovXt-jHe6IboHnzC3kWdudjH6UI");
    request.onload = function() {
        let data = JSON.parse(request.responseText);
        render(book_name.value, data);
    }
    request.send();
}

page_forward.addEventListener("click" , next_page_load);
function next_page_load() {
    page = page+18;
    let request = new XMLHttpRequest();
    request.open("GET","https://www.googleapis.com/books/v1/volumes?maxResults=18&startIndex="+page+"&q="+book_name.value+"&key=AIzaSyAU5C02ovXt-jHe6IboHnzC3kWdudjH6UI");
    request.onload = function(){
        let data = JSON.parse(request.responseText);
         render(book_name.value, data);
         result_title.innerHTML = "Llibres trobats per: " + search_value+" ("+data.totalItems+")";
    }
    request.send();
}
page_backward.addEventListener("click",page_back);
function page_back(){
    page = page-18;
    if(page<=0) {page=0};
    let request = new XMLHttpRequest();
    request.open("GET","https://www.googleapis.com/books/v1/volumes?maxResults=18&startIndex="+page+"&q="+book_name.value+"&key=AIzaSyAU5C02ovXt-jHe6IboHnzC3kWdudjH6UI");
    request.onload = function(){
        let data = JSON.parse(request.responseText);
         render(book_name.value, data);
    }
    request.send();
   
}

function render(search_value, data) {
    result_title.innerHTML = "Llibres trobats per: " + search_value+" ("+data.totalItems+")";
    var books = data.items.map((item) => {
        return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            imageLinks: item.volumeInfo.imageLinks,
            webLink: item.accessInfo.webReaderLink
        };
    });
    while (book_template.parentNode.childNodes.length > 2) {
        book_template.parentNode.removeChild(book_template.parentNode.lastChild);
    }

    books.forEach(function(book){render_book(book)});

}

function render_book(book) {
    let book_element = book_template.cloneNode(true);
    book_element.removeAttribute("id");
    book_element.classList.remove("template");

    book_element.getElementsByTagName("img")[0].src = book.imageLinks ? book.imageLinks.thumbnail : "PICS/senseportadap.jpg";
    book.title_ch = book.title.substring(0,70);
    if(book.title.length > 70) {
        book.title_ch = book.title_ch + "..."
    }
    book_element.getElementsByTagName("a")[0].href = "detall.html?id="+book.id;
    book_element.getElementsByTagName("a")[1].textContent = book.title_ch;
    book_element.getElementsByTagName("a")[1].href = "detall.html?id="+book.id;//book.webLink;
     if (book.authors != undefined ) {
        book.authors = book.authors.join(' \n .');
    }
    book_element.getElementsByTagName("span")[0].textContent = ". "+book.authors;
   
    
    if (book.authors == null) {
        book_element.getElementsByTagName("span")[0].textContent = "";
    }
    book_template.parentNode.appendChild(book_element);

}




