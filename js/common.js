(function () {
    'use strict';
    requirejs.config({
        baseUrl: 'js/',
        paths: {
            phaser: 'contrib/phaser.min',
            game: 'custom/game',
            boot: 'custom/states/boot',
            preload: 'custom/states/preload',
            play: 'custom/states/play'
        },
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });
    require([
            'phaser',
            'game'
        ],
        function (Phaser, Game) {
            var game = new Game();
            game.start();
        }
    );
}());