document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById("searchin") as HTMLElement;
    const productList = document.getElementById("productlist") as HTMLElement;
    const cart=document.getElementById('cart')as HTMLElement
    const viewbttn= document.getElementById("viewbttn") as HTMLElement

   
    if (!productList || !cart) return;
  
    let allProducts: Product[] = [];
    let cartitem:Product[]=[];
  
    class Product {
      id: string;
      proImage: string;
      proName: string;
      proprice: string;
      prodesc: string;
  
      constructor(id: string, proImage: string, proName: string, proprice: string, prodesc: string) {
        this.id = id;
        this.proImage = proImage;
        this.proName = proName;
        this.proprice = proprice;
        this.prodesc = prodesc;
      }
    }
  
    async function fetchProducts(): Promise<Product[]> {
      try {
        const response = await fetch("http://localhost:3000/product");
        if (response.ok) {
            console.log("fetched successfully");
            
          const data = await response.json();
          return data.map((product: any) => new Product(
            product.id,
            product.proImage,
            product.proName,
            product.proprice,
            product.prodesc
          ));
        } else {
          throw new Error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    }
  
    async function displayProducts(searchQuery: string = '') {
      productList.innerHTML = '';

      const filteredProducts = allProducts.filter(product =>
        (product.proName && product.proName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.prodesc && product.prodesc.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
  
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
  
  
        const addcart=document.createElement('button')
        addcart.textContent="Add to cart"
        addcart.addEventListener('click', ()=> addToCart(product))
  
        item.appendChild(itemPic);
        item.appendChild(itemName);
        item.appendChild(itemDesc);
        item.appendChild(itemPrice);
        item.appendChild(addcart)
        
  
        productList.appendChild(item);
      });
    }
  
    allProducts = await fetchProducts();
    displayProducts();
  
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchQuery = (searchInput as HTMLInputElement).value;
        displayProducts(searchQuery);
      });
    }

   

    function displayCart(){
        cart.innerHTML='';

        cartitem.forEach(product =>{
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

        const removebttn= document.createElement('button')
        removebttn.textContent="remove from cart"
        removebttn.addEventListener('click',()=> removefromcart(product))

        
  

        item.appendChild(itemPic);
        item.appendChild(itemName);
        item.appendChild(itemDesc);
        item.appendChild(itemPrice);
        item.appendChild(removebttn)

        cart.appendChild(item)
        })

        


    }
    function toggleCart(){
        displayCart();
        cart.classList.toggle('show');
    }

    viewbttn.addEventListener('click',()=> toggleCart())

    function addToCart(product:Product){
       cartitem.push(product)
       displayCart();
    }

    function removefromcart(product:Product){
        cartitem.filter(item=>item.id !== product.id);
        displayCart();
     }

     allProducts=(await fetchProducts()).map(product=> new Product(
        product.id,
        product.proImage,
        product.proName,
        product.proprice,
        product.prodesc
     ));


})


  