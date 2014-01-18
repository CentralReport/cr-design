module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Displays the time taken for each task
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        cr: {
            dirs: {
                cwd: './',
                build: '<%= cr.dirs.cwd %>dist',
                less: '<%= cr.dirs.cwd %>less',
                vendor: '<%= cr.dirs.cwd %>vendor'
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
                    paths: [
                        '<%= cr.dirs.less %>',
                        '<%= cr.dirs.vendor %>/bootstrap/less',
                        '<%= cr.dirs.vendor %>/font-awesome/less'
                    ],
                    report: 'gzip'
                },
                files: {
                    "<%= cr.dirs.build %>/css/centralreport.css": "<%= cr.dirs.less %>/main.less"
                }
            },
            production: {
                options: {
                    paths: [
                        '<%= cr.dirs.less %>',
                        '<%= cr.dirs.vendor %>/bootstrap/less',
                        '<%= cr.dirs.vendor %>/font-awesome/less'
                    ],
                    report: 'gzip',
                    cleancss: true
                },
                files: {
                    "<%= cr.dirs.build %>/css/centralreport.min.css": "<%= cr.dirs.less %>/main.less"
                }
            }
        },

        uglify: {
            development: {
                options: {
                    banner: '/*! <%= pkg.name %> - DEV - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    beautify: true,
                    mangle: false
                },
                files: {
                    '<%= cr.dirs.build %>/js/centralreport.js' : [
                        '<%= cr.dirs.vendor %>/jquery/jquery.js',
                        '<%= cr.dirs.vendor %>/bootstrap/js/*.js',
                        '<%= cr.dirs.vendor %>/flot/jquery.flot*.js'
                    ]
                }
            },
            production: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    '<%= cr.dirs.build %>/js/centralreport.min.js' : [
                        '<%= cr.dirs.vendor %>/jquery/jquery.js',
                        '<%= cr.dirs.vendor %>/bootstrap/js/*.js',
                        '<%= cr.dirs.vendor %>/flot/jquery.flot*.js'
                    ]
                }
            }
        },

        copy: {
            main: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: '<%= cr.dirs.vendor %>/font-awesome/fonts/',
                src: '**',
                dest: '<%= cr.dirs.build %>/fonts/'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['bower', 'less', 'uglify', 'copy']);
};
