module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			main: {
				files: {
					'app/dist/style.min.css': ['app/css/style.css']
				}
			}
		},
		concat: {
			// concat task configuration goes here.
			main: {
				options: {
					separator: ';',
					stripBanners: true,
				},
				src: ['app/app.js', 'app/**/*.js', '!app/**/*.spec.js', '!app/dist/**/*.js'],
				dest: 'app/dist/main.js',
			},
			dependenciesJs: {
				src: [
					'node_modules/angular/angular.min.js',
					'node_modules/angular-websocket/dist/angular-websocket.min.js',
				],
				dest: 'app/dist/dependencies.min.js',
			}
		},
		uglify: {
			main: {
				options: {
					mangle: false,
					preserveComments: false
				},
				src: ['app/app.js', 'app/js/**/*.js', '!app/**/*.spec.js', '!app/dist/**/*.js'],
				dest: 'app/dist/main.min.js',
			}
		},
		copy: {
			jsmap: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'node_modules/angular/angular.min.js.map',
							'node_modules/angular-websocket/dist/angular-websocket.min.js.map',
						],
						dest: 'app/dist/',
						filter: 'isFile'
					},
				],
			},
			cssmap: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							//'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
						],
						dest: 'app/dist/',
						filter: 'isFile'
					},
				],
			}
		},
		watch: {
			//run unit tests with karma (server needs to be already running)
			testTask: {
				files: [
					'app/app.js',
					'app/**/*.css',
					'app/**/*.html',
					'app/**/*.js',
					'app/**/*.spec.js',
					'!app/dist/**',
					'!**/node_modules/**'
				],
				tasks: ['devDist']
			},
		},
		ngtemplates: {
			main: {
				src: ['app/**/*.html'],
				dest: 'app/dist/templates.js',
				options: {
					module: 'chatWebSocket.templates',
					standalone: true,
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true, // Only if you don't use comment directives! 
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					},
					url: function(url) {
						return url.replace('app/', '');
					}
				}
			}
		},
		eslint: {
			options: {
				quiet: true
			},
			target: ['app/app.js', 'app/**/**.js', '!app/dist/**.js']
		},
		karma: {
			options: {
				configFile: 'karma.conf.js',
			},
			start: {
				configFile: 'karma.conf.js',
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-eslint');

	//tasks
	grunt.registerTask('default', ['cssmin', 'concat', 'uglify', 'ngtemplates', 'copy', 'eslint', 'watch']);
	grunt.registerTask('dist', ['cssmin', 'concat', 'uglify', 'ngtemplates', 'eslint', 'karma', 'watch']);
	grunt.registerTask('devDist', ['cssmin', 'concat:main', 'uglify', 'ngtemplates', 'eslint', 'karma', 'watch']);
	grunt.registerTask('test', ['karma', 'watch']);
};