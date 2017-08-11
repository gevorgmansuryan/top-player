export default [
	{
		title: 'Kinogo',
		regex: /kinogo.club\/(.*).html/g,
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