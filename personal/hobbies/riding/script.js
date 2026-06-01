/* all the JS does is update current top item index */
const section = document.querySelector('section');
const computed = getComputedStyle(section);
const S = section.style;
const N = +computed.getPropertyValue('--n') || section.querySelectorAll('article').length;

let k = +computed.getPropertyValue('--k');
if (!Number.isFinite(k)) k = 0;
if (!computed.getPropertyValue('--n').trim()) S.setProperty('--n', N);
if (!computed.getPropertyValue('--k').trim()) S.setProperty('--k', k);

addEventListener('click', e => {
	const inc = e.target.dataset.inc;
	if (!inc) return;
	const v = Number(inc);
	if (Number.isFinite(v) && N > 0) {
		k = ((k + v + N) % N);
		S.setProperty('--k', k);
	}
});