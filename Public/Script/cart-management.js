const addtocarrtButtonElement = document.querySelector('#product-details button');
const Badge = document.querySelector('.nav-items .badge')


async function addToCart() {
    const ProductID = addtocarrtButtonElement.dataset.productid;
    const csrfToken = addtocarrtButtonElement.dataset.csrf;
    let response;
    try {
        response = await fetch('/Cart/items', {
            method: 'Post',
            body: JSON.stringify({
                productId: ProductID,
                _csrf:csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        alert(error, 'somthing went Wrong!');
        return
    }
    if (!response.ok) {
        alert('somthing went Wrong!');
        return
    }
    const ResponceData = await response.json();

    const newTotalQuaantaty = ResponceData.newTotalItems;

    Badge.textContent = newTotalQuaantaty;
}
addtocarrtButtonElement.addEventListener('click', addToCart)