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
]