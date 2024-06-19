document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');

    let products = [];

    // Function to handle form submission
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Extract form data
        const imageFile = document.getElementById('product-image').files[0];
        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = document.getElementById('product-price').value;
        const contactInfo = document.getElementById('contact-info').value;

        // Create a new product object
        const product = {
            id: Date.now(),
            image: URL.createObjectURL(imageFile),
            name: productName,
            description: productDescription,
            price: productPrice,
            contact: contactInfo,
            sticker: "New"
        };

        // Add the product to the products array
        products.push(product);

        // Clear the form
        uploadForm.reset();

        // Display the products
        displayProducts(products);
    });

    // Function to display products
    function displayProducts(productArray) {
        productList.innerHTML = '';

        productArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <div class="sticker">${product.sticker}</div>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Contact: ${product.contact}</p>
            `;

            productList.appendChild(productCard);
        });
    }

    // Function to handle search
    searchBar.addEventListener('input', function () {
        const searchQuery = searchBar.value.toLowerCase();

        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchQuery) ||
                   product.description.toLowerCase().includes(searchQuery);
        });

        displayProducts(filteredProducts);
    });
});