document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById("searchin") as HTMLElement;
    const productList = document.getElementById("productlist") as HTMLElement;
  
    if (!productList) return;
  
    let allProducts: Product[] = [];
  
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
  
        const deleteItem = document.createElement('button');
        deleteItem.id = "delete";
        deleteItem.textContent = "Delete";
  
        const updateItem = document.createElement('button');
        updateItem.id = "updateitem";
        updateItem.textContent = "Update";
  
        buttons.appendChild(deleteItem);
        buttons.appendChild(updateItem);
  
        item.appendChild(itemPic);
        item.appendChild(itemName);
        item.appendChild(itemDesc);
        item.appendChild(itemPrice);
        
  
        productList.appendChild(item);
      });
    }
  
    allProducts = await fetchProducts();
    displayProducts();
  
   // Add search functionality
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchQuery = (searchInput as HTMLInputElement).value;
        displayProducts(searchQuery);
      });
    }
})
  