module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Displays the time taken for each task
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        cr: {
            dirs: {
                build: './dist',
                less: './less',
                vendor: './vendor'
            }
        },

        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    copy: false,
                    verbose: true,
                    targetDir: '<%= cr.dirs.vendor %>' // TODO - Remove this once "https://github.com/yatskevich/grunt-bower-task/pull/87" is merged
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ["<%= cr.dirs.less %>, <%= cr.dirs.vendor %>/bootstrap/less"],
                    report: 'gzip'
                },
                files: {
                    "build/centralreport.css": "<%= cr.dirs.less %>/main.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    report: 'gzip',
                    cleancss: true
                },
                files: {
                    "build/centralreport.min.css": "<%= cr.dirs.less %>/main.less"
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= cr.dirs.vendor %>/bootstrap/js/alert.js',
                dest: 'build/alert.min.js'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['bower', 'composer:update', 'less', 'uglify']);
};
