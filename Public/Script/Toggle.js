const menueButton = document.getElementById("mobile-menu-btn");
const menue = document.getElementById("mobile-menu");

function toggle() {
    menue.classList.toggle('open');
}
menueButton.addEventListener('click', toggle);