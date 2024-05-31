"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', (event) => {
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
        constructor(id, proImage, proName, proprice, prodesc) {
            this.id = id;
            this.proImage = proImage;
            this.proName = proName;
            this.proprice = proprice;
            this.prodesc = prodesc;
        }
    }
    function saveProducts(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:3000/product`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                });
                if (!response.ok) {
                    const errortext = yield response.text();
                    console.error("Error response from server:", response.status, errortext);
                    throw new Error(`Failed to save product. Status: ${response.status}, Details: ${errortext}`);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    let formcontainer = document.querySelector(".formcontainer");
    function displayForm() {
        return __awaiter(this, void 0, void 0, function* () {
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
            proName.name = "proName";
            proName.id = "proName";
            proName.placeholder = "name of product...";
            const proImage = document.createElement('input');
            proImage.type = "url";
            proImage.name = "proImage";
            proImage.id = "proImage";
            proImage.placeholder = "enter url...";
            const imageprev = document.createElement('img');
            imageprev.id = "imageprev";
            imageprev.style.display = "none";
            imageprev.style.maxWidth = '200px';
            const proprice = document.createElement('input');
            proprice.type = "number";
            proprice.id = "proprice";
            proprice.name = "proprice";
            proprice.placeholder = "what's the price...";
            const prodesc = document.createElement('textarea');
            prodesc.name = "prodesc";
            prodesc.id = "prodesc";
            prodesc.placeholder = "describe your product...";
            const btndiv = document.createElement('div');
            btndiv.className = "btndiv";
            const proadd = document.createElement('button');
            proadd.id = "proadd";
            proadd.id = "proadd";
            proadd.type = "submit";
            proadd.textContent = "create";
            const cancel = document.createElement('button');
            cancel.id = "cancel";
            cancel.textContent = "X";
            cancel.addEventListener('click', () => {
                form.style.display = "none";
            });
            form.appendChild(proName);
            form.appendChild(proImage);
            form.appendChild(proprice);
            form.appendChild(prodesc);
            btndiv.appendChild(proadd);
            btndiv.appendChild(cancel);
            form.appendChild(btndiv);
            formcont.appendChild(form);
            formcontainer.append(formcont);
            form.addEventListener('submit', (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const formData = new FormData(form);
                const name = formData.get('proName');
                const image = formData.get('proImage');
                const price = formData.get('proprice');
                const description = formData.get('prodesc');
                if (image && name && price && description) {
                    const newProduct = new Product(`${Math.floor(Math.random() * 1000)}`, image, name, price, description);
                    console.log('New product data:', newProduct);
                    try {
                        yield saveProducts(newProduct);
                        console.log('Product saved successfully');
                        yield displayProducts();
                        alert("you have successfully created an item");
                    }
                    catch (error) {
                        console.log("Failed to save product:", error);
                    }
                }
                else {
                    console.log("Please fill in all fields.");
                }
            }));
        });
    }
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/product");
                if (response.ok) {
                    return yield response.json();
                }
                else {
                    throw new Error("Failed to fetch peoducts.");
                }
            }
            catch (error) {
                console.error("Error fetching products:", error);
                return [];
            }
        });
    }
    function displayProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const display = document.querySelector(".display");
            if (!display)
                return;
            display.innerHTML = '';
            const prodata = yield fetchProducts();
            const products = prodata.map((prodata) => {
                return new Product(prodata.id, prodata.proImage, prodata.proName, prodata.proprice, prodata.prodesc);
            });
            const proList = document.createElement('div');
            proList.className = "proList";
            const topA = document.querySelector('.top');
            topA.className = "topA";
            products.forEach((product) => {
                let myId = `${product.id}`;
                const item = document.createElement('div');
                item.className = "item";
                item.id = `product-${product.id}`;
                const itemname = document.createElement('p');
                itemname.id = 'itemname';
                itemname.textContent = product.proName;
                itemname.style.fontWeight = "bold";
                const itempic = document.createElement('img');
                itempic.id = 'itempic';
                itempic.setAttribute(`src`, product.proImage);
                const itemprice = document.createElement('p');
                itemprice.id = 'itemprice ';
                itemprice.textContent = '$' + product.proprice + '';
                itemprice.style.color = 'darkgray';
                const itemdesc = document.createElement('p');
                itemdesc.id = 'itemdesc';
                itemdesc.textContent = product.prodesc;
                const buttons = document.createElement('div');
                buttons.id = 'buttons';
                const deleteitem = document.createElement('button');
                deleteitem.id = "delete";
                deleteitem.textContent = "Delete";
                deleteitem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let deleteIndex = myId;
                        yield deleteProducts(deleteIndex);
                        // proList.removeChild(item);
                    }
                    catch (error) {
                        console.error("error deleting", error);
                    }
                }));
                const updateitem = document.createElement('button');
                updateitem.id = "updateitem";
                updateitem.textContent = "Update";
                buttons.appendChild(deleteitem);
                buttons.appendChild(updateitem);
                item.appendChild(itempic);
                item.appendChild(itemname);
                item.appendChild(itemdesc);
                item.appendChild(itemprice);
                item.appendChild(buttons);
                proList.appendChild(item);
                display.appendChild(proList);
                updateitem.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    console.log("update button clicked");
                    let formdiv = document.createElement('div');
                    formdiv.className = "formdiv";
                    let theeform = document.createElement('div');
                    theeform.className = "theeform";
                    formdiv.innerHTML = `
             <form action="" id="upform">
          <label for="myurl">Edit url</label>
          <input type="text" id="myurl" value="${product.proImage}">
          <label for="myname"> Edit name</label>
          <input type="text" id="myname" value="${product.proName}">
          <label for="myprice"> Edit price</label>
          <input type="text" id="myprice" value="${product.proprice}">
          <label for="mydesc"> Edit description</label>
          <input type="text" id="mydesc" value="${product.prodesc}">
          <button id="submitbttn">Submit</button>
          <button id="cancel">x</button>
  
      </form>
  
             `;
                    topA.appendChild(formdiv);
                    let submitbttn = formdiv.querySelector('#submitbttn');
                    if (!submitbttn) {
                        console.error("submit bttn not found");
                    }
                    submitbttn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                        console.log('submit');
                        e.preventDefault();
                        let myurl = formdiv.querySelector('#myurl');
                        let myname = formdiv.querySelector('#myname');
                        let myprice = formdiv.querySelector('#myprice');
                        let mydesc = formdiv.querySelector('#mydesc');
                        if (myurl && myname && myprice && mydesc) {
                            let updatedata = {
                                proImage: myurl.value,
                                proName: myname.value,
                                proprice: myprice.value,
                                prodesc: mydesc.value
                            };
                            try {
                                const response = yield fetch(`http://localhost:3000/product/${myId}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(updatedata)
                                });
                                if (response.ok) {
                                    const updatedProduct = yield response.json();
                                    console.log('Product updated successfully', updatedProduct);
                                    itempic.src = updatedata.proImage;
                                    itemname.textContent = updatedata.proName;
                                    itemprice.textContent = '$' + updatedata.proprice;
                                    itemdesc.textContent = updatedata.prodesc;
                                    formdiv.remove();
                                }
                                else {
                                    console.error('Failed to update product', response.statusText);
                                }
                            }
                            catch (error) {
                                console.error('Error updating product:', error);
                            }
                        }
                        else {
                            console.log("Please fill in all fields.");
                        }
                    }));
                }));
                itempic.addEventListener('click', async => {
                    window.location.href = `product.html?id${product.id}`;
                });
            });
            display.appendChild(proList);
        });
    }
    displayProducts();
    function deleteProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/product/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("failed to delete");
            }
            return response.json();
        });
    }
});
