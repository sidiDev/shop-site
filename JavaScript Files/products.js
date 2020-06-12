// Get cart container class
let cartContainer = document.querySelector('.cart-container span');

// Get number of products from local storage
let productsNum = localStorage.getItem('addedToCartNumber');

// Add number of products in cart container

cartContainer.textContent = Number(productsNum);

// get products data from local storage
let productsData = localStorage.getItem('productsData');

// Get shopping-cart-alert class
let shoppingCartAlert = document.querySelector('.shooping-cart .shopping-cart-alert');

// get products-container class

let productsContainer = document.querySelector('.products-container .products');

// Hide shopping-cart-alert if productsNum equal null else show it
if (productsData) {

    document.querySelector('.shooping-cart-container')
    .classList.add('shooping-cart-container-by-js');
    document.querySelector('.your-product').style.display = 'block';

    // add hide-sopping-cart-alert class in shopping-cart-alert class
    shoppingCartAlert.classList.add('hide-sopping-cart-alert');

    // put products data in elements

    productsData = JSON.parse(productsData);

    Object.values(productsData).map((el) => {
        
        productsContainer.innerHTML += `
        <div class="product-container">
                <div class="remove-product-btn">
                    <spn class="remove-btn">&times</span>
                </div>
                <div class="product-image">
                    <img src="${el.image}">
                </div>
                <div class="product-info-container">
                <div class="product-details">
                    <span>Name:</span>
                    <span>Numbers:</span>
                </div>
                <div class="product-info">
                    <span>${el.name}</span>
                    <span>${el.inCart}</span>
                </div>
                </div>
                <div class="product-price">
                    <span>$${el.price * el.inCart}</span>
                </div>
            </div>
        `;
    });

    let priceContainer = document.querySelectorAll('.product-price span');
    let priceTotalContainer = document.querySelector('.prices-total')
    let array = [];
    for (let i = 0; i < priceContainer.length; i++) {
        
        let prices = Number(priceContainer[i].textContent.slice(1));
        
        array.push(prices)

        let pricesTotal = array.reduce((acc,val) => acc + val,0);

        priceTotalContainer.innerHTML = `
        <span>Total:</span>
        <span>$${pricesTotal}</span>
        <span class="coupon" id="coupon"></span>
        `
    }


} else {

    // remove hide-sopping-cart-alert class from shopping-cart-alert class
    shoppingCartAlert.classList.remove('hide-sopping-cart-alert');
    document.querySelector('.shooping-cart-container')
    .classList.remove('shooping-cart-container-by-js');
    document.querySelector('.your-product').style.display = 'none';

};

// Get checkbox classes
let paymentOptions = document.querySelectorAll('.check-payment .payment-option .checkBox');
// Checked first checkbox
paymentOptions[0].checked = true;

for (let i = 0; i < paymentOptions.length; i++) {

    paymentOptions[i].onchange = function () {

        // If this checkbox has paypal id hide pay-by-vis and show pay-by-paypal

        if (this.id == 'paypal') {
            
            document.querySelector('.pay-by-paypal').style.display = 'block';
            document.querySelector('.pay-by-visa').style.display = 'none';
            console.log('pay-by-paypal')

        } else { // Else this checkbox dosn't has paypal id hide pay-by-paypal  and show pay-by-visa

            document.querySelector('.pay-by-paypal').style.display = 'none';
            document.querySelector('.pay-by-visa').style.display = 'block';
            console.log('pay-by-visa')
        }
    }
}

// Remove localstorage

function deleteProducts () {

    localStorage.removeItem('productsData');
    localStorage.removeItem('addedToCartNumber');
    localStorage.removeItem('coupon');
    localStorage.removeItem('couponePrice')
    location.reload()
}

let coupon = document.querySelector('.coupon');
let outputCoupon = document.querySelector('.output-coupon p')
let copyCouponBtn = document.querySelector('.copy-coupon-btn')

if (localStorage.getItem('coupon') != null ) {
    
    outputCoupon.textContent = JSON.parse(localStorage.getItem('coupon'));
}

function getCoupon () {

    let couponData = localStorage.getItem('coupon');

    if (couponData == null) {

        document.querySelector('.get-coupon-cover').style.display = 'block';

        let couponSymbole = 'ABCDEFGHIJKLMNOPQRSTUVWZabcdefghijklmnopqrstuvwz123456789@#$*$^%)}{?/';
        let couponer;
        
        let couponSymboleArray = Array.from(couponSymbole);
        
        for (let i = 1; i <= 17; i++) {
    
            let random = Math.floor(Math.random() * couponSymboleArray.length)
        
            couponer = couponSymboleArray[random];
    
            outputCoupon.textContent += couponer;

            localStorage.setItem('coupon',JSON.stringify(outputCoupon.textContent));

            copyCouponBtn.onclick = function () {

                let createEl = document.createElement('textarea');
                document.body.appendChild(createEl);
                let createElValue = document.querySelector('textarea');
                createElValue.value = outputCoupon.textContent;
                createElValue.select();
                document.execCommand('copy');
                createElValue.remove();
                document.querySelector('.get-coupon-cover').style.display = 'none';
                
            }
            
        }
    
    } else if (coupon.textContent == '') {

        document.querySelector('.get-coupon-cover').style.display = 'block';

        copyCouponBtn.onclick = function () {

            let createEl = document.createElement('textarea');
            document.body.appendChild(createEl);
            let createElValue = document.querySelector('textarea');
            createElValue.value = outputCoupon.textContent;
            createElValue.select();
            document.execCommand('copy');
            createElValue.remove();
            document.querySelector('.get-coupon-cover').style.display = 'none';
            
        }

    } else {

        document.querySelector('.alert-coupon-cover').style.display = 'block';
        document.querySelector('.close-coupon-btn')
        .onclick = function () {
            document.querySelector('.alert-coupon-cover').style.display = 'none';
        }
    }
    
}

let couponPrice = localStorage.getItem('couponePrice');

if (couponPrice != null) {

    coupon.textContent = `-${couponPrice}`;
}

document.querySelector('.coupon-form button')
.onclick = function () {
    
    let input = document.querySelector('.coupon-form input');
    let couponData = localStorage.getItem('coupon');

    if (input.value) {

        let priceTotalContainer = document.querySelectorAll('.prices-total span');
        let priceTotal = Number(priceTotalContainer[1].textContent.slice(1));
        let coupon = document.querySelector('.coupon')
        
        if (input.value == JSON.parse(couponData)) {

            if (priceTotal >= 14) {

                localStorage.setItem('couponePrice', 14);
                
                coupon.textContent = `-${14}`;
                input.value = '';
                document.querySelector('.note-coupone').textContent = '';
            }

        } else {

            document.querySelector('.note-coupone').textContent = 'Sorry this code is wrong';
        }

    } else {

        document.querySelector('.note-coupone').textContent = 'Sorry the input is empty';
    }
    
}

// when click on menu button first time open menu and second time close

// Get navigation links class

let navigationLinks = document.querySelector('.navigation-links');

function openClaoseMenu () {

    navigationLinks.classList.toggle('open-and-close-menu')

}


// If productsData is Exist
if (productsData) {
    
    //Get productData delete buttons
    let deleteProductBtn = document.querySelectorAll('.remove-product-btn .remove-btn');
    //Convert json data to Object 
    let getProductsData = JSON.parse(localStorage.getItem('productsData'));

    //Loop on productData delete buttons
    for (let i = 0; i < deleteProductBtn.length; i++) {

        let inCart = getProductsData[Object.keys(getProductsData)[i]].inCart;
        deleteProductBtn[i].setAttribute('datanum',inCart);
        deleteProductBtn[i].setAttribute('dataset',Object.keys(getProductsData)[i])

        //When click on productData delete button remove the product from page and localstorage
        // and reduce the number of products
        deleteProductBtn[i].onclick = function () {

            let getInCart = Number(this.getAttribute('datanum'));
            cartContainer.textContent = (cartContainer.textContent - getInCart)
            localStorage.setItem('addedToCartNumber',Number(cartContainer.textContent));

            let getProductData = this.getAttribute('dataset');
            this.parentElement.parentElement.remove();
            delete getProductsData[getProductData];
            localStorage.setItem('productsData',JSON.stringify(getProductsData))
            reloadPageAuto()
        }

    }
}

//When cartContainer become equal 0 reload page and remove all data from localStorage
function reloadPageAuto() {

    if (cartContainer.textContent == '0') {

        location.reload();
        localStorage.removeItem('productsData');
        localStorage.removeItem('addedToCartNumber')
    }
}