const ButtenTargetElement = document.querySelectorAll(".cart-item-management");
const Badge = document.querySelector('.nav-items .badge');

const CT = document.getElementById('totalID')
async function UpdateMethodAjsx(event) {
    event.preventDefault();
    const form = event.target;
    const ProductID = form.dataset.proid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response
    try {
        response = await fetch('/Cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: ProductID,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
      
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Request failed: ' + error);
    }
    if (!response) {
        alert('Error: ');
        return;
    }
    const ResponceData = await response.json();
    const CTP = form.parentElement.querySelector('.totalprice');
    CTP.textContent = ResponceData.updated.updatedItemPrice;
    CT.textContent = ResponceData.updated.newtotalprice;
    Badge.textContent = ResponceData.updated.totalQuantity
    console.log(ResponceData)
}
console.log(ButtenTargetElement)
for (const formElement of ButtenTargetElement) {
    formElement.addEventListener('submit', UpdateMethodAjsx);
}