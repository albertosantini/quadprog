"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                config: ".eslintrc"
            },
            src: [
                "Gruntfile.js",
                "index.js",
                "lib/**/*.js",
                "test/**/*-test.js"
            ]
        },

        vows: {
            all: {
                src: "test/*-test.js",
                options: {
                    reporter: "spec",
                    error: false
                }
            }
        },

        benchmark: {
            all: {
                src: ["test/first.js", "test/second.js"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-vows-runner");
    grunt.loadNpmTasks("grunt-benchmark");

    grunt.registerTask("default", [
        "eslint",
        "vows",
        "benchmark"
    ]);
};
