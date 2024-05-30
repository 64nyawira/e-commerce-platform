document.addEventListener('DOMContentLoaded', (event) => {
  const display = document.querySelector(".display");
  let createButton;

  try {
    createButton = document.getElementById("createbttn") as HTMLButtonElement;
    if (createButton) {
      createButton.addEventListener('click', displayForm);
    }
  } catch (error) {
    console.error("Error finding element or function:", error);
  }

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

  async function saveProducts(product: Product): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3000/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        const errortext = await response.text();
        console.error("Error response from server:", response.status, errortext);
        throw new Error(`Failed to save product. Status: ${response.status}, Details: ${errortext}`);
      }
    } catch (error) {
      throw error;
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
    proName.name = "proName";
    proName.id = "proName"
    proName.placeholder = "name of product...";

    const proImage = document.createElement('input');
    proImage.type = "url";
    proImage.name = "proImage";
    proImage.id = "proImage"
    proImage.placeholder = "enter url...";

    const imageprev = document.createElement('img')
    imageprev.id = "imageprev"
    imageprev.style.display = "none"
    imageprev.style.maxWidth = '200px'

    const proprice = document.createElement('input');
    proprice.type = "number";
    proprice.id = "proprice"
    proprice.name = "proprice";
    proprice.placeholder = "what's the price...";

    const prodesc = document.createElement('textarea');
    prodesc.name = "prodesc";
    prodesc.id = "prodesc"
    prodesc.placeholder = "describe your product...";

    const btndiv=document.createElement('div')
    btndiv.className="btndiv"

    const proadd = document.createElement('button');
    proadd.id = "proadd";

    proadd.id = "proadd"
    proadd.type = "submit";
    proadd.textContent = "create";

    const cancel=document.createElement('button')
    cancel.id="cancel"
   
    cancel.textContent="X"

    cancel.addEventListener('click',()=>{
        form.style.display="none";
    })

   
    form.appendChild(proName);
    form.appendChild(proImage);
    form.appendChild(proprice);
    form.appendChild(prodesc);

    btndiv.appendChild(proadd)
    btndiv.appendChild(cancel)
   
    form.appendChild(btndiv);
    

    formcont.appendChild(form);
    formcontainer.append(formcont);


    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const name = formData.get('proName') as string;
      const image = formData.get('proImage') as string;
      const price = formData.get('proprice') as string;
      const description = formData.get('prodesc') as string;

      if (image && name && price && description) {
        
        const newProduct = new Product(
          `${Math.floor(Math.random() * 1000)}`,
          image,
          name,
          price,
          description
        );

        console.log('New product data:', newProduct);

        try {
          await saveProducts(newProduct);
          console.log('Product saved successfully');
          
          await displayProducts();
          alert("you have successfully created an item")
        } catch (error) {
          console.log("Failed to save product:", error);
        }
      } else {
        console.log("Please fill in all fields.");
      }
    });
   

  }

  async function fetchProducts(): Promise<any[]> {
    try {
      const response = await fetch("http://localhost:3000/product");
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to fetch peoducts.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }


  async function displayProducts() {
    const display = document.querySelector(".display")
    if (!display) return;

    display.innerHTML = '';

    const prodata = await fetchProducts();
    const products: Product[] = prodata.map((prodata: any) => {
      return new Product(prodata.id, prodata.proImage, prodata.proName, prodata.proprice, prodata.prodesc)

    });

    const proList = document.createElement('div');
    proList.className = "proList";

  
    const topA = document.querySelector('.top') as HTMLElement
    topA.className="topA"

    products.forEach((product) => {
      let myId = `${product.id}`

      const item = document.createElement('div')
      item.className = "item"
      item.id = `product-${product.id}`

      const itemname = document.createElement('p')
      itemname.id = 'itemname'
      itemname.textContent = product.proName
      itemname.style.fontWeight = "bold"

      const itempic = document.createElement('img')
      itempic.id = 'itempic'
      itempic.setAttribute(`src`, product.proImage)

      const itemprice = document.createElement('p')
      itemprice.id = 'itemprice '
      itemprice.textContent = '$' + product.proprice + ''
      itemprice.style.color = 'darkgray'

      const itemdesc = document.createElement('p')
      itemdesc.id = 'itemdesc'
      itemdesc.textContent = product.prodesc

      const buttons = document.createElement('div')
      buttons.id = 'buttons'

      const deleteitem = document.createElement('button')
      deleteitem.id = "delete"
      deleteitem.textContent = "Delete"

      deleteitem.addEventListener('click', async () => {
        try {
          let deleteIndex = myId
          await deleteProducts(deleteIndex);
          // proList.removeChild(item);
        } catch (error) {
          console.error("error deleting", error);
        }
      });



      const updateitem = document.createElement('button')
      updateitem.id = "updateitem"
      updateitem.textContent = "Update"

      buttons.appendChild(deleteitem)
      buttons.appendChild(updateitem)

      item.appendChild(itempic)
      item.appendChild(itemname)

      item.appendChild(itemdesc)
      item.appendChild(itemprice)
      item.appendChild(buttons)

      proList.appendChild(item)



      updateitem.addEventListener('click', async () => {
        console.log("update button clicked");

        let formdiv = document.createElement('div')
        formdiv.className = "formdiv"

        let theeform = document.createElement('div')
        theeform.className = "theeform"

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

       


        
        topA.appendChild(formdiv)



        let submitbttn = formdiv.querySelector('#submitbttn') as HTMLButtonElement
        if (!submitbttn) {
          console.error("submit bttn not found")
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        


        submitbttn.addEventListener('click', async (e) => {                                            
          console.log('submit');
          e.preventDefault();
          
          

          let myurl =formdiv.querySelector('#myurl') as HTMLInputElement
          let myname = formdiv.querySelector('#myname') as HTMLInputElement
          let myprice = formdiv.querySelector('#myprice') as HTMLInputElement
          let mydesc = formdiv.querySelector('#mydesc') as HTMLInputElement
       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
          
          

          if (myurl && myname && myprice && mydesc) {
            let updatedata = {
              proImage: myurl.value,
             proName: myname.value,
              proprice: myprice.value,
             prodesc: mydesc.value

              
            }
           
            
            try {
              const response = await fetch(`http://localhost:3000/product/${myId}`, {
                
                
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedata)
              });

              if (response.ok) {
                const updatedProduct = await response.json();
                console.log('Product updated successfully', updatedProduct);

                
                itempic.src = updatedata.proImage;
                itemname.textContent = updatedata.proName;
                itemprice.textContent = '$' + updatedata.proprice;
                itemdesc.textContent = updatedata.prodesc;

                
                formdiv.remove();
               
              } else {
                console.error('Failed to update product', response.statusText);
              }
            } catch (error) {
              console.error('Error updating product:', error);
            }
          } else {
            console.log("Please fill in all fields.");
          }
        });
      });

    
      itempic.addEventListener('click', async => {
        window.location.href = `product.html?id${product.id}`
      })
})
    display.appendChild(proList)


  }
  displayProducts();

  async function deleteProducts(id: string) {
    const response = await fetch(`http://localhost:3000/product/${id}`, {
      method: 'DELETE',


    });
    if (!response.ok) {
      throw new Error("failed to delete");
    }
    return response.json();
  }


})

