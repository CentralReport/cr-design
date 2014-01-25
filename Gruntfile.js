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
                examples: '<%= cr.dirs.cwd %>examples',
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
                        '<%= cr.dirs.vendor %>/bootstrap/dist/js/bootstrap.js',
                        '<%= cr.dirs.vendor %>/flot/jquery.flot.js'
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
                        '<%= cr.dirs.vendor %>/bootstrap/dist/js/bootstrap.js',
                        '<%= cr.dirs.vendor %>/flot/jquery.flot.js'
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
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= cr.dirs.examples %>'
                    ]
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= cr.dirs %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= cr.dirs.dist %>/css/{,*/}*.css']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= cr.dirs.examples %>/{,*/}*.html'
//                    '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['bower', 'less', 'uglify', 'copy']);


    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });
};
