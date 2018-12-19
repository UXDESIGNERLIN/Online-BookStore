
function create_row(id, title, qty, price, currency) {
    let inventory_template = document.getElementById("inventory_template");
    let inventory_element = inventory_template.cloneNode(true);
    inventory_element.classList.remove("hide");
    inventory_template.parentNode.appendChild(inventory_element);
    inventory_element.querySelector('td[headers="llibre"]').innerHTML = '<a href="detall.html?id='+id+'">'+title+'</a>';
    inventory_element.querySelector('td[headers="preu"]').innerHTML = price;
    inventory_element.querySelector('td[headers="qt"]').innerHTML = qty;
    inventory_element.querySelector('td[headers="total"]').innerHTML = (price*qty).toFixed(2);
    inventory_element.querySelector('td[headers="x"]').addEventListener("click",function () {
        inventory_template.parentNode.removeChild(inventory_element);
        let c = JSON.parse(localStorage.getItem("cistella"));
        delete c[id];
        localStorage.setItem("cistella", JSON.stringify(c));
        update_final_price(c);
    });
}

function update_final_price(c) {
    let final = 0;
    Object.getOwnPropertyNames(c).forEach(function(id) {
        let element = c[id];
        final += element.qty*element.price;
    });
    document.getElementById("final_total").innerHTML = final.toFixed(2) + " EUR";
}

//LOAD THE STORAGE
window.onload = function() {
    let c = {};
    if (localStorage.getItem("cistella")== null){c={}}
    else {
        c = JSON.parse(localStorage.getItem("cistella"));
    }
    Object.getOwnPropertyNames(c).forEach(function(id) {
        let element = c[id];
        create_row(id, element.llibre, element.qty, element.price, element.currency);
    });
    update_final_price(c);
}


