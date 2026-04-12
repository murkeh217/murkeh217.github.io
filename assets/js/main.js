/*
	TXT by HTML5 UP
	html5up.net
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px', '1680px' ],
		large:   [ '981px',  '1280px' ],
		medium:  [ '737px',  '980px'  ],
		small:   [ '361px',  '736px'  ],
		xsmall:  [ null,     '360px'  ]
	});

	// Remove preload class after load
	$window.on('load', function() {
		setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Dropdown nav
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		speed: 300,
		alignment: 'center'
	});

	// Smooth scroll
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function() { return $nav.height() - 5; }
	});

	// Mobile nav
	$(
		'<div id="titleBar">' +
			'<a href="#navPanel" class="toggle"></a>' +
			'<span class="title">' + $('#logo').html() + '</span>' +
		'</div>'
	).appendTo($body);

	$(
		'<div id="navPanel">' +
			'<nav>' + $('#nav').navList() + '</nav>' +
		'</div>'
	)
	.appendTo($body)
	.panel({
		delay: 500,
		hideOnClick: true,
		hideOnSwipe: true,
		resetScroll: true,
		resetForms: true,
		side: 'left',
		target: $body,
		visibleClass: 'navPanel-visible'
	});

})(jQuery);


// ============================
// IFRAME HANDLING (FIXED)
// ============================

document.addEventListener("DOMContentLoaded", () => {

	const iframe = document.getElementById("myIframe");
	const infoBox = document.querySelector(".project_info");

	if (!iframe) return;

	let loadTimeout;

	function showLoading() {
		if (infoBox) {
			infoBox.innerHTML = `
				<p style="text-align:center;">⏳ Loading game...</p>
			`;
		}
	}

	function showFallback() {
		if (infoBox) {
			infoBox.innerHTML = `
				<p style="text-align:center;">
					⚠️ This game cannot be embedded due to browser restrictions.
				</p>
				<div style="text-align:center;">
					<button onclick="window.open('${iframe.src}', '_blank')">
						▶ Open Game in New Tab
					</button>
				</div>
			`;
		}
	}

	function handleIframeLoad() {
		clearTimeout(loadTimeout);

		let isBlocked = false;

		try {
			const doc = iframe.contentDocument || iframe.contentWindow.document;

			if (!doc || !doc.body || doc.body.innerHTML.trim() === "") {
				isBlocked = true;
			}
		} catch (e) {
			isBlocked = true;
		}

		if (isBlocked) {
			showFallback();
		} else {
			iframe.classList.add("loaded");
		}
	}

	// When iframe loads
	iframe.addEventListener("load", handleIframeLoad);

	// When user clicks a game
	document.querySelectorAll("a[target='gameplay']").forEach(link => {
		link.addEventListener("click", () => {

			showLoading();

			// fallback timeout (in case load lies)
			loadTimeout = setTimeout(() => {
				showFallback();
			}, 3000);
		});
	});

});
