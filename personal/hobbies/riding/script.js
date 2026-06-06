/* all the JS does is update current top item index */
const section = document.querySelector('section');
const articles = Array.from(section.querySelectorAll('article'));
const S = section.style;
const N = articles.length;

let k = Number(getComputedStyle(section).getPropertyValue('--k'));
if (!Number.isFinite(k)) k = 0;
S.setProperty('--n', N);
S.setProperty('--k', k);

articles.forEach((article, index) => {
	article.style.setProperty('--i', index);
	const offset = index - (N - 1) / 2;
	article.style.setProperty('--a', `${offset * -4}deg`);
});

addEventListener('click', e => {
	const button = e.target.closest('button');
	if (!button) return;
	const inc = button.dataset.inc;
	if (!inc) return;
	const v = Number(inc);
	if (Number.isFinite(v) && N > 0) {
		k = ((k + v + N) % N);
		S.setProperty('--k', k);
	}
});