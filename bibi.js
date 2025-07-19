let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "Purple Aso-Oke",
        tag:  "purple",
        price: 20000,
        inCart: 0
    },

    {
        name: "Red Aso-Oke",
        tag:  "Red1",
        price: 30000,
        inCart: 0

    },

    {
        name: "Gold Aso-Oke",
        tag:  "Gold",
        price: 15000,
        inCart: 0
    },



   {
        name: "Green Aso-Oke",
        tag:  "Green",
        price: 40000,
        inCart: 0

    },

    {
        name: "Silver Aso-Oke",
        tag:  "silver",
        price: 40000,
        inCart: 0

  
    },

    {
        name: "Gblue",
        tag:  "Gblue",
        price: 40000,
        inCart: 0

    },

    
    {
        name: "blue Aso-Oke",
        tag:  "blue",
        price: 40000,
        inCart: 0

    },

    {
        name: "Lemon Aso-Oke",
        tag:  "lemon",
        price: 45000,
        inCart: 0

    },

    
    {
        name: "pink Aso-Oke",
        tag:  "pink",
        price: 40000,
        inCart: 0

    },

      {
        name: "Gold1 Aso-Oke",
        tag:  "Gold1",
        price: 40000,
        inCart: 0

    },

  {
        name: "Cyan Aso-Oke",
        tag:  "Cyan",
        price: 40000,
        inCart: 0

    },

]
// Loop through all "add to cart" buttons
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        let tag = carts[i].getAttribute('data-tag');
        let selectedProduct = products.find(p => p.tag === tag);
        
        if (selectedProduct) {
            cartNumbers(selectedProduct);
            totalCost(selectedProduct);
        }
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
  
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

    
function setItems(product) {
    let cartItems = localStorage.getItem('productsinCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1; 

        cartItems = {
            [product.tag]: product

        }
            
       
    }
    
    
    localStorage.setItem("productsinCart", JSON.stringify
    (cartItems));

}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);

    }

    
    



}

function displayCart() {
    let cartItems = localStorage.getItem("productsinCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
   
    console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class= "product">
              <i class="fas fa-times-circle"></i>
              <img src="chichi.jpg" width="100%" alt="" >
              <span>${item.name}</span>
            </div>
              <div class="price">${item.price},00</div>
              <div class="quantity">
                 <i class="fas fa-arrow-alt-circle-right"></i>
                 <span>${item.inCart}</span>
                 <i class="fas fa-arrow-alt-circle-left"></i>
              </div 
              <div class= "total">
                  £${item.inCart * item.price},00
               </div>

            `;

        });


        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                <h4 class="basketTotal">
                    ₦${cartCost},00

                </h4>
        `;


    }

}

onLoadCartNumbers();
displayCart();



// Load wishlist from localStorage
const wishlist = (JSON.parse(localStorage.getItem('wishlist')) || [])
.filter(product => product.name && product.img && product.price);

// Reference the count span
const wishlistCountEl = document.getElementById('wishlist-count');

// Function to update the wishlist count display
function updateWishlistCount() {
  wishlistCountEl.textContent = wishlist.length;
}

// Initialize hearts on page load
document.querySelectorAll('.wishlist-icon').forEach(icon => {
  const name = icon.dataset.name;
  const inWishlist = wishlist.find(item => item.name === name);
  if (inWishlist) icon.querySelector('i').classList.replace('far', 'fas');
});

// Toggle wishlist item on heart click
document.querySelectorAll('.wishlist-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const heart = icon.querySelector('i');
    const product = {
      name: icon.dataset.name,
      img: icon.dataset.img,
      price: icon.dataset.price
    };

    const index = wishlist.findIndex(item => item.name === product.name);

    if (index > -1) {
      wishlist.splice(index, 1);
      heart.classList.replace('fas', 'far');
    } else {
      wishlist.push(product);
      heart.classList.replace('far', 'fas');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount(); // 🔄 Update count after change
  });
});

// Initialize count on page load
updateWishlistCount();

 // Filter out invalid products


