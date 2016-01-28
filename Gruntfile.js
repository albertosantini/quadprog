"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        benchmark: {
            all: {
                src: [
                    "test/first.js",
                    "test/second.js",
                    "test/third.js",
                    "test/fourth.js",
                    "test/fifth.js"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-benchmark");

    grunt.registerTask("default", [
        "benchmark"
    ]);
};
