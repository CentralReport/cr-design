module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Displays the time taken for each task
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    copy: false,
                    verbose: true,
                    targetDir: './vendor' // TODO - Remove this once "https://github.com/yatskevich/grunt-bower-task/pull/87" is merged
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "build/centralreport.css": "less/main.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true
                },
                files: {
                    "build/centralreport.min.css": "less/main.less"
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'vendor/twbs/bootstrap/js/alert.js',
                dest: 'build/alert.min.js'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['bower', 'less', 'uglify']);
};
