// get the id from url
let detall = document.getElementById("detall");
let detall_container = detall.getElementsByTagName("div")[0];
let detall_descriptiont_container = detall.getElementsByTagName("div")[1];
let price_button = document.getElementById("price");
let url = new URL(window.location);
let param = new URLSearchParams(url.search);
let url_id = param.get("id");
let minus = document.getElementById("minus");
let add = document.getElementById("add");
let cistella_button = document.getElementById("cistella");
let reservar_button = document.getElementById("reservar");
//let number = document.querySelectorAll("input[type=number]");
let number_check = document.getElementById("quantity").querySelector('input[name="quantity"]');
let local_storage_book;

console.log(param.get("id"));
// use the id to search book data from google api
let request = new XMLHttpRequest();  
request.open("GET","https://www.googleapis.com/books/v1/volumes/"+url_id);
request.onload = function() {
    let book = JSON.parse(request.responseText);
    local_storage_book = book;
    render_info(book);
}
request.send();
// show the data that we've got
function render_info(book) {
    console.log(book.volumeInfo.imageLinks);
    detall_container.getElementsByTagName("img")[0].src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.medium : "PICS/senseportadap.jpg" ;
    detall_descriptiont_container.getElementsByTagName("h2")[0].textContent = book.volumeInfo.title || "";
    detall_descriptiont_container.getElementsByTagName("p")[0].textContent = book.volumeInfo.authors || "";
    detall_descriptiont_container.getElementsByTagName("p")[1].innerHTML = book.volumeInfo.description || "";
    let listPrice = book.saleInfo.listPrice;
    if (listPrice != null) {
        price_button.textContent = book.saleInfo.listPrice.amount + book.saleInfo.listPrice.currencyCode;
    }
    else {
        // Remove price tag
        document.getElementById("button").remove();
        // Set not available text
        document.getElementById("not_available").textContent = "Not Available";
        // Remove quantity input
        document.getElementById("quantity").classList.add("hide");
        cistella_button.disabled = true;
        reservar_button.disabled = false;
    }
}
add.addEventListener("click",click_add);
function click_add() {
    number_check.value ++;  
}
minus.addEventListener("click",click_minus);
function click_minus() {
    if (number_check.value >=1) {
        number_check.value --;
    }  
}
//LOCAL STORAGE
cistella_button.addEventListener("click",function () {
    let c = {};
    if (localStorage.getItem("cistella")== null){c={}}
    else {
        c = JSON.parse(localStorage.getItem("cistella"));
    }

    if (c[local_storage_book.id]) {
        c[local_storage_book.id].qty += +number_check.value;
    }
    else {
        c[local_storage_book.id] = {
            qty: +number_check.value,
            llibre: local_storage_book.volumeInfo.title,
            price: +local_storage_book.saleInfo.listPrice.amount,
            currency: local_storage_book.saleInfo.listPrice.currencyCode,
        }
    }
    localStorage.setItem("cistella",JSON.stringify(c));
});