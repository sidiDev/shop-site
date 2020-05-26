// Get sliding image in header
let slidingImage = document.querySelector('header img');

// Array contain images sliding
let slidingImagesArray = [
    'images/cover-2.png',
    'images/cover-3.png',
    'images/cover-1.png'
];

// Get sliding points in header in sliding-points-container class
let slidingPoints = document.querySelector('.sliding-points .sliding-points-container');

// Array contain All span in sliding-point class

let slidingPointsArray = [
    slidingPoints.children[1],
    slidingPoints.children[2],
    slidingPoints.children[0]
]

let slidingPointArray = [
    slidingPoints.children[0],
    slidingPoints.children[1],
    slidingPoints.children[2]
]


// augment number

let aug = 0;

// Change header cover and sliding point every 3 seconds

setInterval(function() {
    
    aug++;

    // if aug equal 4 change number to 0;
    if (aug == 4) {

        aug = 0;

    } else { // else augment the numbers

        // Put augment number in sliding image and sliding point
        slidingImage.setAttribute('src', slidingImagesArray[aug -1]);
        slidingPointsArray[aug -1].classList.add('sliding-point');

        // Remove sliding point class
        slidingPointArray[aug -1].classList.remove('sliding-point');
        
    }


},4000)

// when click on follow us button scroll to footer

function scrollToFooter () {

    document.querySelector('.footer-container').scrollIntoView({behavior: 'smooth'})
}

// when click on menu button first time open menu and second time close

// Get navigation links class

let navigationLinks = document.querySelector('.navigation-links');

function openClaoseMenu () {

    navigationLinks.classList.toggle('open-and-close-menu')

}

// when click show search form
function showSearch () {

    document.querySelector('.search-container-in-small-devices')
    .classList.add('show-search-form');

    // Get hidden button class // when click hide search form
    document.querySelector('.search-container-in-small-devices-container img')
    .addEventListener('click' , () => {

        document.querySelector('.search-container-in-small-devices')
        .classList.remove('show-search-form');
    })
}

// Get products data

// Array contain a objects it's contain products data

let products = [
    {
        name : 'Heades',
        tag: 'Heades',
        price: 90,
        inCart: 0,
        image: 'images/product-img-1.png'
    },
    {
        name : 'Sport shoes',
        tag: 'SportShoes',
        price: 100,
        inCart: 0,
        image: 'images/product-img-2.png'
    },
    {
        name : 'Windows 10',
        tag: 'Windows10',
        price: 950,
        inCart: 0,
        image: 'images/product-img-3.png'
    },
    {
        name : 'Iphone 11',
        tag: 'Iphone11',
        price: 450,
        inCart: 0,
        image: 'images/product-img-4.png'
    },
    {
        name : 'Watch pro',
        tag: 'WatchPro',
        price: 70,
        inCart: 0,
        image: 'images/product-img-5.png'
    },
    {
        name : 'Harpik',
        tag: 'Harpik',
        price: 15,
        inCart: 0,
        image: 'images/product-img-6.png'
    },
    {
        name : 'Camera 10 pro',
        tag: 'Camera10Pro',
        price: 150,
        inCart: 0,
        image: 'images/product-img-7.png'
    },
    {
        name : 'Pingo',
        tag: 'Pingo',
        price: 80,
        inCart: 0,
        image: 'images/product-img-8.png'
    },
    {
        name : 'Molar',
        tag: 'Molar',
        price: 190,
        inCart: 0,
        image: 'images/product-img-9.png'
    },
    {
        name : 'Advenced molar',
        tag: 'AdvencedMolar',
        price: 199,
        inCart: 0,
        image: 'images/product-img-10.png'
    },
    {
        name : 'Play station 4',
        tag: 'PlayStation4',
        price: 320,
        inCart: 0,
        image: 'images/product-img-11.png'
    },
    {
        name : 'Steve jobs life',
        tag: 'SteveJobsLife',
        price: 105,
        inCart: 0,
        image: 'images/product-img-12.png'
    }
];

// Get All add to cart button
let addToCartBtn = document.querySelectorAll('.product-container .product-info button');

// create for loop to loop on add to cart button
for (let i = 0; i < addToCartBtn.length; i++) {

    addToCartBtn[i].addEventListener('click', function () {
        
        addToCart (products[i]);
    })
}

// Get cart container class

let cartContainer = document.querySelector('.cart-container span');

// Get number of cart from local storage
let addedToCartNum = localStorage.getItem('addedToCartNumber');

// If the storage not equal null put number of cart from local storage in cart container
if (addedToCartNum != null) {

    // Put number of cart from local storage in cart container
    cartContainer.textContent = Number(addedToCartNum)
}


function addToCart (product) {
    
    // Get number of cart from local storage
    let addedToCartNum = localStorage.getItem('addedToCartNumber');

    // if addedToCartNum variable is exist augment the value with 1
    if (addedToCartNum) {

        localStorage.setItem('addedToCartNumber', Number(addedToCartNum) + 1)
        cartContainer.textContent = Number(addedToCartNum) + 1;

    } else { // else addedToCartNum variable is not exist set item in local storage contain value 1
        
        localStorage.setItem('addedToCartNumber', 1);
        cartContainer.textContent = 1;

    }

    getProductData (product)
}

// function to put product data in local storage
function getProductData (product) {

    let getProductData = localStorage.getItem('productsData');
        getProductData = JSON.parse(getProductData);

        if (getProductData == null) {

            getProductData = {

                [product.tag]: product
            }

            product.inCart = 1;

        } else {

            if (getProductData[product.tag] == undefined) {

                getProductData = {
                    ...getProductData,
                    [product.tag]:product
                }
            }

            getProductData[product.tag].inCart += 1;
        }

    localStorage.setItem('productsData', JSON.stringify(getProductData))
}