
async function fetchProductData() {
    try {
      const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448');
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }
  

  function renderProductDetails(product) {
    
    const titleDetails = document.querySelector('.title');
    const description = document.querySelector('.product-description');
    const prices = document.querySelector('.prices-details');
    const colorsOptions = document.querySelector('.colors-option');
    const sizesOptions = document.querySelector('.sizes-option');
    
    if (product) {
      // Render title details
      titleDetails.innerHTML = `<p>${product.vendor}</p>
        <h1>${product.title}</h1>`;
  
      // Render description
      description.innerHTML = `<p>${product.description}</p>`;
  
      // Render prices
      prices.innerHTML = `<div> <h1>${product.price}</h1> <p class='discount'>35% off</p></div>
        <p>${product.compare_at_price}</p>`;
  
      // Render color options
      colorsOptions.innerHTML = `${product.options.find(option => option.name === 'Color').values.map(colorObject => `
        <div class='list-color' style="background-color: ${Object.values(colorObject)[0]}"></div>
      `).join('')}`;


   // Add click event listener to color options
const colorElements = document.querySelectorAll('.list-color');
colorElements.forEach(colorElement => {
  colorElement.addEventListener('click', () => {
    // Remove the 'selected' class from all color elements
    colorElements.forEach(otherColorElement => {
      otherColorElement.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked color element
    colorElement.classList.add('selected');
  });
});

  
      // Render size options
      sizesOptions.innerHTML = `${product.options.find(option => option.name === 'Size').values.map(value => `
        <li class='list-sizes'> 
          <input type='radio' id=${value} />
          <label for=${value}>${value}</label>
        </li>
      `).join('')}`;

      const sizeRadioButtons = document.querySelectorAll('.list-sizes input[type="radio"]');
        sizeRadioButtons.forEach(radioButton => {
            radioButton.addEventListener('change', () => {
                sizeRadioButtons.forEach(otherRadioButton => {
                    if (otherRadioButton !== radioButton) {
                        otherRadioButton.checked = false;
                    }
                });
            });
        });
    } else {
      console.error('Error fetching product data.');
    }
  }
  

  document.addEventListener('DOMContentLoaded', async () => {
    const productData = await fetchProductData();
    if (productData) {
      renderProductDetails(productData);
     
    } else {
      console.error('Product data is null.');
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const quantityElement = document.querySelector('.quantity');
    const cartCountElement = document.querySelector('.cart-count');

    let quantity = 0;

    
    function updateQuantity(amount) {
        quantity += amount;
        quantity = Math.max(0, quantity);
        quantityElement.textContent = quantity;
        cartCountElement.textContent = quantity;
    }

    // Event listener for decrement button
    document.getElementById('decrement').addEventListener('click', () => {
        updateQuantity(-1);
    });

    // Event listener for increment button
    document.getElementById('increment').addEventListener('click', () => {
        updateQuantity(1);
    });

    // Event listener for Add To Cart button (you can add your logic here)
    document.getElementById('addToCart').addEventListener('click', () => {
        updateQuantity(1)
    });
});

function changeThumbnail(image) {
    document.getElementById('mainImage').src = image.src;
  }
  
 
