export default [
	{
		title: 'Kinogo',
		regex: /kinogo.cc\/(.*).html/g,
		extJs: `
			var obj = $('.box.visible');
			obj.find('>*').not('object').remove();
			$('body').html(obj.html())
		`,
		extCss: `
			body {position: static !important;}
			.uppod_style_video {position: absolute; height: 100%; width: 100%;}
		`,
		url: (url) => {
			return url;
		}
	},
	{
		title: 'Kinomagnit.net',
		regex: /kinomagnit.net\/(.*).html/g,
		extJs: `
			var obj = $('#preroll-container-1');
			obj.find('>*').not('object').remove();
			$('body').html(obj.html())
		`,
		extCss: `
			body {position: static !important;}
			#player {position: absolute; height: 100%; width: 100%; top: 0; left: 0;}
		`,
		url: (url) => {
			return url;
		}
	},
	{
		title: 'YouTube',
		regex: /youtube.com\/watch\?v=(.*)/g,
		extJs: ``,
		extCss: ``,
		url: (url) => {
			let id = url.match(/youtube.com\/watch\?v=(.*)/i)[1];
			return `https://www.youtube.com/tv#/watch/video/control?v=${id}`;
		}
	},
	{
		title: 'SeasonVar',
		regex: /seasonvar.ru\/(.*)..html/g,
		extJs: `
			var obj = $('#player_wrap');
			obj.find('.pgs-mark_line').remove();
			obj.find('.yashare-auto-init').remove();
			obj.find('.player-extBtn').remove();
			$('#flashPlayer').attr('height', '100%');
						$('body').html(obj.html())
		`,
		extCss: `
			body {position: static !important; overflow: hidden;}
			#flashPlayer {position: absolute; height: 100%; width: 100%;}
		`,
		url: (url) => {
			return url;
		}
	},
]