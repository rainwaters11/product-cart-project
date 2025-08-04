// Product List with Cart - Enhanced with Local Storage & Search

// Global variables with Local Storage support
let cart = JSON.parse(localStorage.getItem('dessertCart')) || [];
let products = [];
let currentFilter = 'All';
let currentSearch = '';

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const filterButtonsContainer = document.querySelector('.filter-buttons');
const searchInput = document.getElementById('search-input');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const confirmOrderBtn = document.querySelector('.confirm-order-btn');
const cartSection = document.querySelector('.cart-section h2');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    updateCartDisplay(); // Load saved cart from localStorage
    setupSearchFunctionality();
});

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('dessertCart', JSON.stringify(cart));
        console.log('💾 Cart saved to localStorage');
    } catch (error) {
        console.warn('Could not save cart to localStorage:', error);
    }
}

// Setup search functionality
function setupSearchFunctionality() {
    if (!searchInput) return;
    
    // Add clear search button
    const clearButton = document.createElement('button');
    clearButton.classList.add('clear-search');
    clearButton.innerHTML = '×';
    clearButton.title = 'Clear search';
    searchInput.parentNode.appendChild(clearButton);
    
    // Search input event listener
    searchInput.addEventListener('input', function(e) {
        currentSearch = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (currentSearch) {
            clearButton.classList.add('show');
        } else {
            clearButton.classList.remove('show');
        }
        
        // Filter and display products
        filterAndDisplayProducts();
    });
    
    // Clear search button event listener
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        currentSearch = '';
        clearButton.classList.remove('show');
        filterAndDisplayProducts();
        searchInput.focus();
    });
    
    // Enter key to clear search when empty
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            currentSearch = '';
            clearButton.classList.remove('show');
            filterAndDisplayProducts();
        }
    });
}

// Fetch products from data.json and display them
function fetchProducts() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            products = data;
            
            // Step 1: Create filter buttons from unique categories
            createFilterButtons();
            
            // Step 2: Display all products initially with filtering support
            filterAndDisplayProducts();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            // Show error message to user
            productsGrid.innerHTML = '<p>Sorry, there was an error loading the products. Please try again later.</p>';
        });
}

// Create filter buttons dynamically from product categories
function createFilterButtons() {
    // Step 1: Get all unique categories from products
    const categories = ['All', ...new Set(products.map(product => product.category))];
    
    // Step 2: Clear existing buttons
    filterButtonsContainer.innerHTML = '';
    
    // Step 3: Create a button for each category
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        button.textContent = category;
        button.dataset.category = category;
        
        // Step 4: Make "All" button active by default
        if (category === 'All') {
            button.classList.add('active');
        }
        
        // Step 5: Add click event listener to filter products
        button.addEventListener('click', () => filterProducts(category, button));
        
        // Step 6: Add the button to the container
        filterButtonsContainer.appendChild(button);
    });
}

// Combined filter and search functionality
function filterAndDisplayProducts() {
    let filteredProducts = products;
    
    // Step 1: Apply category filter
    if (currentFilter !== 'All') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === currentFilter
        );
    }
    
    // Step 2: Apply search filter
    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch) ||
            product.category.toLowerCase().includes(currentSearch)
        );
    }
    
    // Step 3: Display filtered products
    displayProducts(filteredProducts);
    
    // Step 4: Show search/filter results message
    updateResultsMessage(filteredProducts.length);
}

// Update results message
function updateResultsMessage(count) {
    const existingMessage = document.querySelector('.results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (currentSearch || currentFilter !== 'All') {
        const message = document.createElement('div');
        message.classList.add('results-message');
        
        let messageText = '';
        if (count === 0) {
            messageText = `No desserts found`;
            if (currentSearch) messageText += ` for "${currentSearch}"`;
            if (currentFilter !== 'All') messageText += ` in ${currentFilter} category`;
        } else {
            messageText = `Showing ${count} dessert${count !== 1 ? 's' : ''}`;
            if (currentSearch) messageText += ` matching "${currentSearch}"`;
            if (currentFilter !== 'All') messageText += ` in ${currentFilter} category`;
        }
        
        message.innerHTML = `<p>${messageText}</p>`;
        productsGrid.parentNode.insertBefore(message, productsGrid);
    }
}

// Enhanced filter products function
function filterProducts(selectedCategory, clickedButton) {
    // Step 1: Update the current filter
    currentFilter = selectedCategory;
    
    // Step 2: Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');
    
    // Step 3: Apply combined filtering
    filterAndDisplayProducts();
    
    // Step 4: Visual feedback
    clickedButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedButton.style.transform = 'scale(1)';
    }, 150);
}

// Display products in the grid
function displayProducts(productsData) {
    // Clear existing content
    productsGrid.innerHTML = '';
    
    productsData.forEach((product, index) => {
        // Create product card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.dataset.productId = index;

        // Build the product card HTML
        productCard.innerHTML = `
            <div class="product-image-container">
                <picture>
                    <source media="(max-width: 480px)" srcset="${product.image.mobile}">
                    <source media="(max-width: 768px)" srcset="${product.image.tablet}">
                    <img class="product-image" src="${product.image.desktop}" alt="${product.name}">
                </picture>
                <button class="add-to-cart-btn" data-product-id="${index}">
                    <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" width="16" height="16">
                    Add to Cart
                </button>
            </div>
            <div class="product-details">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        `;

        // Add event listener to the add to cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => handleAddToCart(index, addToCartBtn));

        // Add the card to the grid
        productsGrid.appendChild(productCard);
    });
    
    // Update product card states to show quantity selectors for items already in cart
    setTimeout(() => {
        updateAllProductCardStates();
    }, 100); // Small delay to ensure DOM is updated
}

// Handle adding item to cart with smooth animations and localStorage
function handleAddToCart(productId, buttonElement) {
    const product = products[productId];
    let isNewItem = false;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Item exists, increment quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // New item, add to cart
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image.thumbnail,
            quantity: 1
        });
        isNewItem = true;
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update product card to show quantity selector
    updateProductCardState(buttonElement, productId);
    
    // Update cart display with animation flag
    updateCartDisplay(isNewItem);
    
    // Add enhanced visual feedback for button
    buttonElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        buttonElement.style.transform = 'scale(1)';
        // Add a subtle glow effect
        buttonElement.style.boxShadow = '0 0 20px rgba(235, 87, 87, 0.3)';
        setTimeout(() => {
            buttonElement.style.boxShadow = '';
        }, 500);
    }, 150);
}

// Update the add to cart button based on cart state
function updateAddToCartButton(buttonElement, productId) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem && cartItem.quantity > 0) {
        // Show quantity controls
        buttonElement.classList.add('active');
        buttonElement.innerHTML = `
            <div class="quantity-controls">
                <button class="quantity-btn decrement" data-product-id="${productId}">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease quantity" width="10" height="2">
                </button>
                <span class="quantity-display">${cartItem.quantity}</span>
                <button class="quantity-btn increment" data-product-id="${productId}">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="Increase quantity" width="10" height="10">
                </button>
            </div>
        `;
        
        // Add event listeners to quantity buttons
        const decrementBtn = buttonElement.querySelector('.decrement');
        const incrementBtn = buttonElement.querySelector('.increment');
        
        decrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleQuantityChange(productId, -1);
        });
        
        incrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleQuantityChange(productId, 1);
        });
    } else {
        // Show add to cart button
        buttonElement.classList.remove('active');
        buttonElement.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon" width="16" height="16">
            Add to Cart
        `;
    }
}

// Update product card to show quantity selector or add to cart button
function updateProductCardState(buttonElement, productId) {
    const cartItem = cart.find(item => item.id === productId);
    const container = buttonElement.parentElement; // image container
    
    if (cartItem && cartItem.quantity > 0) {
        // Replace button with quantity selector
        const existingSelector = container.querySelector('.product-quantity-selector');
        if (existingSelector) {
            existingSelector.remove();
        }
        
        // Hide the add to cart button
        buttonElement.style.display = 'none';
        
        // Create quantity selector
        const quantitySelector = document.createElement('div');
        quantitySelector.className = 'product-quantity-selector';
        quantitySelector.innerHTML = `
            <button class="product-quantity-btn decrement" data-product-id="${productId}">−</button>
            <span class="product-quantity-display">${cartItem.quantity}</span>
            <button class="product-quantity-btn increment" data-product-id="${productId}">+</button>
        `;
        
        container.appendChild(quantitySelector);
        
        // Add event listeners
        const decrementBtn = quantitySelector.querySelector('.decrement');
        const incrementBtn = quantitySelector.querySelector('.increment');
        
        decrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleProductCardQuantityChange(productId, -1);
        });
        
        incrementBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleProductCardQuantityChange(productId, 1);
        });
    } else {
        // Show add to cart button, hide quantity selector
        const existingSelector = container.querySelector('.product-quantity-selector');
        if (existingSelector) {
            existingSelector.remove();
        }
        buttonElement.style.display = 'flex';
    }
}

// Handle quantity changes on product cards
function handleProductCardQuantityChange(productId, change) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
        
        // Save cart and update displays
        saveCart();
        updateCartDisplay();
        
        // Update all product cards to reflect new state
        updateAllProductCardStates();
    }
}

// Update all product card states (useful when loading from localStorage)
function updateAllProductCardStates() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        const buttonElement = card.querySelector('.add-to-cart-btn');
        if (buttonElement) {
            updateProductCardState(buttonElement, index);
        }
    });
}

// Handle quantity changes with localStorage
function handleQuantityChange(productId, change) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update button state
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const buttonElement = productCard.querySelector('.add-to-cart-btn');
    updateAddToCartButton(buttonElement, productId);
    
    // Update cart display
    updateCartDisplay();
}

// Update cart display with smooth animations
function updateCartDisplay(isNewItem = false) {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart header with animation
    cartSection.textContent = `Your Cart (${cartCount})`;
    
    // Update total price with bounce animation
    const oldPrice = totalPriceElement.textContent;
    const newPrice = `$${cartTotal.toFixed(2)}`;
    
    if (oldPrice !== newPrice) {
        totalPriceElement.classList.add('updated');
        totalPriceElement.textContent = newPrice;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            totalPriceElement.classList.remove('updated');
        }, 400);
    }
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        // Show enhanced empty cart state with fade in
        const emptyState = document.createElement('div');
        emptyState.classList.add('cart-empty');
        emptyState.style.opacity = '0';
        emptyState.innerHTML = `
            <img src="./assets/images/illustration-empty-cart.svg" alt="Empty cart illustration">
            <p>Your cart is empty</p>
            <p class="empty-subtitle">Add some delicious desserts to get started!</p>
        `;
        cartItemsContainer.appendChild(emptyState);
        
        // Fade in empty state
        setTimeout(() => {
            emptyState.style.transition = 'opacity 0.3s ease';
            emptyState.style.opacity = '1';
        }, 10);
        
        confirmOrderBtn.style.display = 'none';
    } else {
        // Show cart items with staggered animations
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            // Add new-item class for animation if this is a new addition
            if (isNewItem && index === cart.length - 1) {
                cartItem.classList.add('new-item');
            }
            
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-details">
                        <span class="cart-item-quantity">${item.quantity}x</span>
                        <span class="cart-item-price">@ $${item.price.toFixed(2)}</span>
                        <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-item-btn" data-product-id="${item.id}">
                    <img src="./assets/images/icon-remove-item.svg" alt="Remove item" width="10" height="10">
                </button>
            `;
            
            // Add remove button event listener with animation
            const removeBtn = cartItem.querySelector('.remove-item-btn');
            removeBtn.addEventListener('click', () => removeFromCartWithAnimation(item.id, cartItem));
            
            cartItemsContainer.appendChild(cartItem);
            
            // Trigger fade-in animation for new items
            if (cartItem.classList.contains('new-item')) {
                setTimeout(() => {
                    cartItem.classList.remove('new-item');
                    cartItem.classList.add('fade-in');
                }, 10);
            }
        });
        
        // Add carbon neutral badge with slight delay for smooth appearance
        setTimeout(() => {
            const carbonBadge = document.createElement('div');
            carbonBadge.classList.add('carbon-neutral');
            carbonBadge.style.opacity = '0';
            carbonBadge.innerHTML = `
                <img src="./assets/images/icon-carbon-neutral.svg" alt="Carbon neutral" width="21" height="20">
                This is a <strong>carbon-neutral</strong> delivery
            `;
            cartItemsContainer.appendChild(carbonBadge);
            
            // Fade in carbon badge
            setTimeout(() => {
                carbonBadge.style.transition = 'opacity 0.3s ease';
                carbonBadge.style.opacity = '1';
            }, 10);
        }, cart.length * 50); // Delay based on number of items
        
        confirmOrderBtn.style.display = 'block';
    }
}

// Enhanced remove function with animation and localStorage
function removeFromCartWithAnimation(productId, cartItemElement) {
    // Add removing animation class
    cartItemElement.classList.add('removing');
    
    // Wait for animation to complete, then remove from cart
    setTimeout(() => {
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            
            // Save cart to localStorage
            saveCart();
            
            // Update the product button
            const productCard = document.querySelector(`[data-product-id="${productId}"]`);
            const buttonElement = productCard.querySelector('.add-to-cart-btn');
            updateAddToCartButton(buttonElement, productId);
            
            // Update cart display
            updateCartDisplay();
        }
    }, 300); // Wait for removal animation
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        
        // Update the product button
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        const buttonElement = productCard.querySelector('.add-to-cart-btn');
        updateAddToCartButton(buttonElement, productId);
        
        // Update cart display
        updateCartDisplay();
    }
}

// Handle confirm order
confirmOrderBtn.addEventListener('click', function() {
    if (cart.length > 0) {
        showOrderConfirmation();
    }
});

// Show order confirmation modal
function showOrderConfirmation() {
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    
    // Create modal content
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    // Build order summary
    let orderSummaryHTML = '';
    cart.forEach(item => {
        orderSummaryHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50" height="50">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <div class="cart-item-details">
                        <span class="cart-item-quantity">${item.quantity}x</span>
                        <span class="cart-item-price">@ $${item.price.toFixed(2)}</span>
                    </div>
                </div>
                <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <img src="./assets/images/icon-order-confirmed.svg" alt="Order confirmed" width="48" height="48">
        <h3>Order Confirmed</h3>
        <p>We hope you enjoy your food!</p>
        <div class="order-summary">
            ${orderSummaryHTML}
            <div class="cart-total">
                <p>Order Total</p>
                <p class="total-price">$${cartTotal.toFixed(2)}</p>
            </div>
        </div>
        <button class="new-order-btn">Start New Order</button>
    `;
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    // Add event listener to start new order button
    const newOrderBtn = modal.querySelector('.new-order-btn');
    newOrderBtn.addEventListener('click', function() {
        startNewOrder();
        modalOverlay.remove();
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}

// Start new order (reset cart and localStorage)
function startNewOrder() {
    cart = [];
    
    // Clear localStorage
    saveCart();
    
    updateCartDisplay();
    
    // Reset all product card states to show "Add to Cart" buttons
    updateAllProductCardStates();
    
    console.log('🆕 New order started - cart cleared');
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }
});

// Handle responsive image loading
function updateProductImages() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach((img, index) => {
        const product = products[index];
        if (product) {
            const screenWidth = window.innerWidth;
            
            if (screenWidth <= 480) {
                img.src = product.image.mobile;
            } else if (screenWidth <= 768) {
                img.src = product.image.tablet;
            } else {
                img.src = product.image.desktop;
            }
        }
    });
}

// Update images on window resize
window.addEventListener('resize', updateProductImages);

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Could add a placeholder image here
    }
}, true);

console.log('Product List & Cart app initialized successfully! 🛒');
