
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItem') 
    const storedCartItems = JSON.parse(localStorage.getItem('cartItem')) || [];
  
    if (!cartItemsContainer) return;
  
    
    storedCartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = item.proName;
      cartItemsContainer.appendChild(itemDiv);
    });
  });
  