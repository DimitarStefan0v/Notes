const menuBtn = document.getElementById('hamburger-menu');
const links = document.getElementById('nav-links-mobile');
const backdrop = document.getElementById('backdrop');

menuBtn.addEventListener('click', () => {
	menuBtn.classList.toggle('visible');

	if (menuBtn.classList.contains('visible')) {
		links.style.display = 'flex';
		backdrop.style.display = 'block';
	} else {
		links.style.display = 'none';
		backdrop.style.display = 'none';
	}
});

backdrop.addEventListener('click', () => {
	backdrop.style.display = 'none';

	if (menuBtn.classList.contains('visible')) {
		menuBtn.classList.remove('visible');
		links.style.display = 'none';
	}
});
