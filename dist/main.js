"use strict";
const display = document.querySelector(".display");
let createButton;
try {
    createButton = document.getElementById("createbttn");
    if (createButton) {
        createButton.addEventListener('click', displayForm);
    }
}
catch (error) {
    console.error("Error finding element or function:", error);
}
class Product {
    id;
    image;
    name;
    price;
    description;
    constructor(id, image, name, price, description) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
let formcontainer = document.querySelector(".formcontainer");
async function displayForm() {
    if (!formcontainer) {
        console.log(".formcontainer isn't there");
        return;
    }
    formcontainer.innerHTML = '';
    const formcont = document.createElement('div');
    formcont.className = "formcont";
    const form = document.createElement('form');
    form.id = "form";
    const proName = document.createElement('input');
    proName.type = "text";
    proName.id = "proName";
    proName.placeholder = "name of product...";
    const proImage = document.createElement('input');
    proImage.type = "url";
    proImage.id = "proImage";
    proImage.placeholder = "enter url...";
    const proprice = document.createElement('input');
    proprice.type = "number";
    proprice.id = "proprice";
    proprice.placeholder = "what's the price...";
    const prodesc = document.createElement('input');
    prodesc.type = "textarea";
    prodesc.id = "prodesc";
    prodesc.placeholder = "describe your product...";
    const proadd = document.createElement('button');
    proadd.id = "proadd";
    proadd.textContent = "create";
    form.appendChild(proName);
    form.appendChild(proImage);
    form.appendChild(proprice);
    form.appendChild(prodesc);
    form.appendChild(proadd);
    formcont.appendChild(form);
    formcontainer.append(formcont);
}
