// generate bubbles dynamically so we can control count, spread and randomness
;(function () {
	const container = document.querySelector('.bubbles');
	if (!container) return;

	const count = 30; // number of bubbles
	for (let i = 1; i <= count; i++) {
		const span = document.createElement('span');
		// randomize a small index used in CSS calculations
		const idx = Math.floor(Math.random() * 28) + 4; // 4..31
		span.style.setProperty('--i', idx);
		// random x position override to spread more
		const randX = Math.floor(Math.random() * 95); // 0..95%
		span.style.setProperty('--rand-x', randX + '%');
		// slight size variation
		const size = Math.floor(Math.random() * 28) + 10; // 10..38px
		span.style.width = size + 'px';
		span.style.height = size + 'px';
		container.appendChild(span);
	}
		// add extra bubbles on the far-left to fill vacant area
		const leftCount = 8;
		for (let j = 0; j < leftCount; j++) {
			const span = document.createElement('span');
			const idx = Math.floor(Math.random() * 28) + 6;
			span.style.setProperty('--i', idx);
			// force them to the left edge area
			const leftPct = Math.floor(Math.random() * 7); // 0..6%
			span.style.setProperty('--rand-x', leftPct + '%');
			const size = Math.floor(Math.random() * 42) + 16; // slightly larger
			span.style.width = size + 'px';
			span.style.height = size + 'px';
			// reduce opacity a bit for background subtlety
			span.style.opacity = '0.75';
			container.appendChild(span);
		}
})();

