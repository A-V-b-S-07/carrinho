document.addEventListener("DOMContentLoaded", function() {
    let cartItems = [
      { 
        id: 1,
        name: "Produto 1",
        price: 10.00,
        quantity: 1,
        image: "product1.jpg"
      },
      { 
        id: 2,
        name: "Produto 2",
        price: 15.00,
        quantity: 1,
        image: "product2.jpg"
      }
    ];
  
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal-value');
    const totalElement = document.querySelector('.total-value');
  
    let subtotal = 0;
  
    function renderCartItems() {
      cartItemsContainer.innerHTML = '';
      subtotal = 0;
      cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>R$ ${item.price.toFixed(2)}</p>
            <div class="actions">
              <button class="remove-item" data-id="${item.id}">Cancelar</button>
              <input type="number" class="quantity" value="${item.quantity}" min="1">
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
      });
  
      const total = subtotal;
  
      subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
      totalElement.textContent = `R$ ${total.toFixed(2)}`;
  
      updateLocalStorage();
    }
  
    function updateLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
    function removeFromCart(id) {
      cartItems = cartItems.filter(item => item.id !== id);
      renderCartItems();
    }
  
    function updateQuantity(id, quantity) {
      const itemIndex = cartItems.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        renderCartItems();
      }
    }
  
    cartItemsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-item')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        removeFromCart(itemId);
      }
    });
  
    cartItemsContainer.addEventListener('change', function(event) {
      if (event.target.classList.contains('quantity')) {
        const itemId = parseInt(event.target.parentElement.parentElement.querySelector('.remove-item').getAttribute('data-id'));
        const newQuantity = parseInt(event.target.value);
        updateQuantity(itemId, newQuantity);
      }
    });
  
    renderCartItems();
  });
  