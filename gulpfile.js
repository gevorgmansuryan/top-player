var gulp = require('gulp'), packager = require('electron-packager');

gulp.task('CreateApplication-x64', function () {
	CreateApplication();
});

function CreateApplication() {
	packager({
		// 'asar': true,
		'dir': './app',
		'platform': 'win32',
		'arch': 'x64',
		'app-copyright': '© 2016 Gevorg Mansuryan',
		'app-version': '1.0.0',
		'win32metadata': {
			'OriginalFilename': 'TopPlayer.exe',
			'ProductName': 'Top Player',
			'InternalName': 'Top Player',
			'FileDescription': 'Top Player'
		},
		'icon': './app/assets/images/icon.ico',
		'out': './compiled',
		'overwrite': true,
		'prune': false
	}, console.log)
}
