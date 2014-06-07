module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        eslint: {
            options: {
                config: ".eslintrc"
            },
            src: [
                "Gruntfile.js",
                "lib/**/*.js",
                "test/**/*-test.js"
            ]
        },

        vows: {
            all: {
                src: "test/*.js",
                options: {
                    reporter: "spec",
                    error: false
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-vows-runner");

    grunt.registerTask("default", [
        "eslint",
        "vows"
    ]);
};
