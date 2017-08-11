var gulp = require('gulp'), packager = require('electron-packager'), debianInstaller = require('electron-installer-debian');

gulp.task('CreateApplication-win-x64', function () {
	CreateApplication();
});
gulp.task('CreateApplication-linux-x64', function () {
    CreateApplicationLinux();
});
gulp.task('CreateDeb-linux-x64', function () {
    CreateInstallationLinux();
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

function CreateApplicationLinux() {
    packager({
        // 'asar': true,
        'dir': './app',
        'platform': 'linux',
        'arch': 'x64',
        'appCopyright': '© 2017 Gevorg Mansuryan',
        'appVersion': '1.0.0',
        'win32metadata': {
            'OriginalFilename': 'TopPlayer.exe',
            'ProductName': 'Top Player',
            'InternalName': 'Top Player',
            'FileDescription': 'Top Player'
        },
        'icon': './app/assets/images/icon1.png',
        'out': './compiled',
        'overwrite': true,
        'prune': false
    }, console.log)
}

function CreateInstallationLinux() {

    var options = {
        src: 'compiled/TopPlayer-linux-x64/',
        dest: 'dist/installers/',
        icon: './app/assets/images/icon1.png',
        categories: [
            "Player"
        ],
        arch: 'amd64'
    };

    console.log('Creating package (this may take a while)');

    debianInstaller(options, function (err) {
        if (err) {
            console.error(err, err.stack);
            process.exit(1)
        }

        console.log('Successfully created package at ' + options.dest)
    })
}