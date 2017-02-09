import apps from '../config/apps'

export default (url) => {
	for (let i in apps) {
		let app = apps[i];
		if (url.match(app.regex)) {
			return {
				url: app.url(url),
				js: app.extJs,
				css: app.extCss
			}
		}
	}
	return null;
}