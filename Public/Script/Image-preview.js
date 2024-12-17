const imgpickEle = document.querySelector('#img-preview input');
const imgprevEle = document.querySelector('#img-preview img');

function updateImgPrev() {
    const files = imgpickEle.files;
    if (!files || files.length === 0) {
        imgprevEle.style.display = 'none';
        return;
    }
    const pickedFile = files[0];

    imgprevEle.src = URL.createObjectURL(pickedFile);
    imgprevEle.style.display = 'block'
}
imgpickEle.addEventListener('change', updateImgPrev);
