const menuBtn = document.getElementById('hamburger-menu');
const links = document.getElementById('nav-links-mobile');
const backdrop = document.getElementById('backdrop');

menuBtn.addEventListener('click', () => {
	if (menuBtn.classList.contains('toggle')) {
		menuBtn.classList.remove('toggle');
		links.style.display = 'none';
		backdrop.style.display = 'none';
	} else {
		menuBtn.classList.add('toggle');
		links.style.display = 'flex';
		backdrop.style.display = 'block';
	}
});

backdrop.addEventListener('click', () => {
	menuBtn.classList.remove('toggle');
	links.style.display = 'none';
	backdrop.style.display = 'none';
});
