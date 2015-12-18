define([
    'phaser'
], function (Phaser) {
    'use strict';
    function Boot() {}
    Boot.prototype = {
        constructor: Boot,
        create: function create() {
            this.game.stage.backgroundColor = '#333';
            this.game.state.start('preload');
        }
    };
    return Boot;
});