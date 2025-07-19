let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "beaded bracelet",
        tag:  "bracelet",
        price: 20,
        inCart: 0
    },
    {
        name: "Multicolored bag",
        tag:  "bag",
        price: 15,
        inCart: 0

    },
  
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', ()  => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
    
    

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
            <tr class= "product">
              <td><h1>hii</h1></td>
            </tr>
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
                    £${cartCost},00

                </h4>
        `;


    }

}

onLoadCartNumbers();
displayCart();

