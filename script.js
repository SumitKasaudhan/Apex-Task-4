// Global variables
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';
let products = [];

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Section navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.add('active');
    
    // Update URL hash
    window.location.hash = sectionId;
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email}.`);
        contactForm.reset();
    });
}

// To-Do List functionality
function initTodoApp() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    
    // Add todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.unshift(todo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Render todos
    function renderTodos() {
        const filteredTodos = getFilteredTodos();
        
        todoList.innerHTML = '';
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
                <button class="todo-delete" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            todoList.appendChild(li);
        });
        
        updateTodoStats();
    }
    
    // Get filtered todos
    function getFilteredTodos() {
        switch (currentFilter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }
    
    // Update todo statistics
    function updateTodoStats() {
        const activeTodos = todos.filter(todo => !todo.completed).length;
        const todoCount = document.getElementById('todoCount');
        todoCount.textContent = `${activeTodos} task${activeTodos !== 1 ? 's' : ''} remaining`;
    }
    
    // Toggle todo completion
    window.toggleTodo = function(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
    };
    
    // Delete todo
    window.deleteTodo = function(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    };
    
    // Clear completed todos
    function clearCompleted() {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    }
    
    // Event listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTodos();
        });
    });
    
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // Initial render
    renderTodos();
}

// Product listing functionality
function initProductApp() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    const productsGrid = document.getElementById('productsGrid');
    
    // Sample product data
    products = [
        {
            id: 1,
            name: "Wireless Headphones",
            category: "electronics",
            price: 99.99,
            rating: 4.5,
            description: "High-quality wireless headphones with noise cancellation.",
            icon: "fas fa-headphones"
        },
        {
            id: 2,
            name: "Cotton T-Shirt",
            category: "clothing",
            price: 24.99,
            rating: 4.2,
            description: "Comfortable 100% cotton t-shirt in various colors.",
            icon: "fas fa-tshirt"
        },
        {
            id: 3,
            name: "JavaScript Guide",
            category: "books",
            price: 39.99,
            rating: 4.8,
            description: "Comprehensive guide to modern JavaScript development.",
            icon: "fas fa-book"
        },
        {
            id: 4,
            name: "Garden Tools Set",
            category: "home",
            price: 79.99,
            rating: 4.3,
            description: "Complete set of essential gardening tools.",
            icon: "fas fa-tools"
        },
        {
            id: 5,
            name: "Smartphone",
            category: "electronics",
            price: 699.99,
            rating: 4.6,
            description: "Latest smartphone with advanced camera and features.",
            icon: "fas fa-mobile-alt"
        },
        {
            id: 6,
            name: "Denim Jeans",
            category: "clothing",
            price: 59.99,
            rating: 4.1,
            description: "Classic denim jeans with modern fit.",
            icon: "fas fa-user-tie"
        },
        {
            id: 7,
            name: "Cooking Recipes",
            category: "books",
            price: 29.99,
            rating: 4.4,
            description: "Collection of delicious and easy-to-make recipes.",
            icon: "fas fa-utensils"
        },
        {
            id: 8,
            name: "LED Desk Lamp",
            category: "home",
            price: 49.99,
            rating: 4.7,
            description: "Adjustable LED desk lamp with multiple brightness levels.",
            icon: "fas fa-lightbulb"
        }
    ];
    
    let filteredProducts = [...products];
    
    // Render products
    function renderProducts() {
        productsGrid.innerHTML = '';
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <i class="${product.icon}"></i>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        <span class="stars">${generateStars(product.rating)}</span>
                        <span class="rating-text">(${product.rating})</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }
    
    // Generate star rating
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Filter and sort products
    function filterAndSortProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const sortBy = sortSelect.value;
        
        // Filter by search term and category
        filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        
        // Sort products
        switch (sortBy) {
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
        
        renderProducts();
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterAndSortProducts);
    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortSelect.addEventListener('change', filterAndSortProducts);
    
    // Initial render
    renderProducts();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
    initTodoApp();
    initProductApp();
    
    // Handle initial hash navigation
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === hash) {
                link.classList.add('active');
            }
        });
    } else {
        showSection('home');
        document.querySelector('[data-section="home"]').classList.add('active');
    }
});

// Handle browser back/forward navigation
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});