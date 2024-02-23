const menuBtn = document.getElementById('hamburger-menu');
const links = document.getElementById('nav-links-mobile');
const backdrop = document.getElementById('backdrop');

menuBtn.addEventListener('click', () => {
	menuBtn.classList.toggle('visible');

	if (menuBtn.classList.contains('visible')) {
		backdrop.style.display = 'block';
        links.style.left = 0;
	} else {
        links.style.left = '-154px';
		backdrop.style.display = 'none';
	}
});

backdrop.addEventListener('click', () => {
	backdrop.style.display = 'none';

	if (menuBtn.classList.contains('visible')) {
		menuBtn.classList.remove('visible');
		links.style.left = '-154px';
	}
});
