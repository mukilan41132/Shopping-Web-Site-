const delectproductButtonElements = document.querySelectorAll('.product-items button');

async function deleteProduct(event) {
    const Buttonelement = event.target;
    const productId = Buttonelement.dataset.productid;
    const csrftoken = Buttonelement.dataset.csrf;
    const responce = await fetch('/main/products/' + productId + '?_csrf=' + csrftoken, {
        method: 'DELETE'
    });
    if (!responce) {
        alert('record Was not delete');
        return;
    }
    Buttonelement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const delectproductbyid of delectproductButtonElements) {
    delectproductbyid.addEventListener('click', deleteProduct);
}