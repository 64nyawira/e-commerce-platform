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
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const searchInput = document.getElementById("searchin");
    const productList = document.getElementById("productlist");
    const cart = document.getElementById('cart');
    const viewbttn = document.getElementById("viewbttn");
    if (!productList || !cart)
        return;
    let allProducts = [];
    let cartitem = [];
    class Product {
        constructor(id, proImage, proName, proprice, prodesc) {
            this.id = id;
            this.proImage = proImage;
            this.proName = proName;
            this.proprice = proprice;
            this.prodesc = prodesc;
        }
    }
    function fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/product");
                if (response.ok) {
                    console.log("fetched successfully");
                    const data = yield response.json();
                    return data.map((product) => new Product(product.id, product.proImage, product.proName, product.proprice, product.prodesc));
                }
                else {
                    throw new Error("Failed to fetch products.");
                }
            }
            catch (error) {
                console.error("Error fetching products:", error);
                return [];
            }
        });
    }
    function displayProducts() {
        return __awaiter(this, arguments, void 0, function* (searchQuery = '') {
            productList.innerHTML = '';
            const filteredProducts = allProducts.filter(product => (product.proName && product.proName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (product.prodesc && product.prodesc.toLowerCase().includes(searchQuery.toLowerCase())));
            filteredProducts.forEach(product => {
                const item = document.createElement('div');
                item.className = "item";
                item.id = `product-${product.id}`;
                const itemName = document.createElement('p');
                itemName.id = 'itemname';
                itemName.textContent = product.proName;
                itemName.style.fontWeight = "bold";
                const itemPic = document.createElement('img');
                itemPic.id = 'itempic';
                itemPic.setAttribute('src', product.proImage);
                const itemPrice = document.createElement('p');
                itemPrice.id = 'itemprice';
                itemPrice.textContent = '$' + product.proprice;
                itemPrice.style.color = 'darkgray';
                const itemDesc = document.createElement('p');
                itemDesc.id = 'itemdesc';
                itemDesc.textContent = product.prodesc;
                const buttons = document.createElement('div');
                buttons.id = 'buttons';
                const addcart = document.createElement('button');
                addcart.textContent = "Add to cart";
                addcart.addEventListener('click', () => addToCart(product));
                item.appendChild(itemPic);
                item.appendChild(itemName);
                item.appendChild(itemDesc);
                item.appendChild(itemPrice);
                item.appendChild(addcart);
                productList.appendChild(item);
            });
        });
    }
    allProducts = yield fetchProducts();
    displayProducts();
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchQuery = searchInput.value;
            displayProducts(searchQuery);
        });
    }
    function displayCart() {
        cart.innerHTML = '';
        cartitem.forEach(product => {
            const item = document.createElement('div');
            item.className = "item";
            item.id = `product-${product.id}`;
            const itemName = document.createElement('p');
            itemName.id = 'itemname';
            itemName.textContent = product.proName;
            itemName.style.fontWeight = "bold";
            const itemPic = document.createElement('img');
            itemPic.id = 'itempic';
            itemPic.setAttribute('src', product.proImage);
            const itemPrice = document.createElement('p');
            itemPrice.id = 'itemprice';
            itemPrice.textContent = '$' + product.proprice;
            itemPrice.style.color = 'darkgray';
            const itemDesc = document.createElement('p');
            itemDesc.id = 'itemdesc';
            itemDesc.textContent = product.prodesc;
            const removebttn = document.createElement('button');
            removebttn.textContent = "remove from cart";
            removebttn.addEventListener('click', () => removefromcart(product));
            item.appendChild(itemPic);
            item.appendChild(itemName);
            item.appendChild(itemDesc);
            item.appendChild(itemPrice);
            item.appendChild(removebttn);
            cart.appendChild(item);
        });
    }
    function toggleCart() {
        displayCart();
        cart.classList.toggle('show');
    }
    viewbttn.addEventListener('click', () => toggleCart);
    function addToCart(product) {
        cartitem.push(product);
        console.log("Product added to cart:", product);
        localStorage.setItem('cartitem', JSON.stringify(cartitem));
        displayCart();
    }
    function removefromcart(product) {
        cartitem = cartitem.filter(item => item.id !== product.id);
        displayCart();
    }
    allProducts = (yield fetchProducts()).map(product => new Product(product.id, product.proImage, product.proName, product.proprice, product.prodesc));
    console.log("All products:", allProducts);
}));
