module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'vendor/twbs/bootstrap/js/alert.js',
                dest: 'build/alert.min.js'
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
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less']);

};