const navbtn = document.querySelector("#ham-btn");

const navLinks = document.querySelector('#nav-bar');

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    navLinks.classList.toggle('show');
})

