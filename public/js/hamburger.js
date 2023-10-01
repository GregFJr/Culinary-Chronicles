const hamburgerIcon = document.querySelector('.hamburger-icon');
const menuLinks = document.querySelector('.menu-links');

hamburgerIcon.addEventListener('click', () => {
    menuLinks.style.display = menuLinks.style.display === 'block' ? 'none' : 'block';
});
