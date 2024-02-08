const menuBtn = document.getElementById('hamburger-menu');
const links = document.getElementById('nav-links-mobile');

menuBtn.addEventListener('click', () => {
    console.log(menuBtn);
    if (menuBtn.classList.contains('toggle')) {
        menuBtn.classList.remove('toggle');
        links.style.display = 'none';
    } else {
        menuBtn.classList.add('toggle');
        links.style.display = 'flex';
    }
    
});
