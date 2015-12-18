define([
    'phaser'
], function (Phaser) {
    'use strict';
    function Play() {}
    Play.prototype = {
        constructor: Play,
        addBackground: function addBackground() {
            this.background = this.game.add.sprite(0, 0, 'background');
            this.background.width = this.game.width;
            this.background.height = this.game.height;
            this.background.alpha = 0.25;
        },
        addKeyboardObjects: function addKeyboardObjects() {
            this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            this.key3 = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            this.keyShift = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        },
        addPlayer: function addPlayer() {
            this.player = this.game.add.sprite(
                this.game.world.centerX,
                this.game.world.centerY * 1.95,
                'dog',
                'idle/0001.png'
            );
            this.player.anchor.setTo(0.5, 1.0);
        },
        isPlayerMoving: function isPlayerMoving() {
            if (this.keyA.isDown || this.keyD.isDown) {
                if (this.keyShift.isDown) {
                    this.player.animations.play('run');
                } else {
                    this.player.animations.play('walk');
                }
            } else {
                this.player.animations.play('idle');
            }
        },
        addPlayerAnimations: function addPlayerAnimations() {
            this.dead = this.player.animations.add(
                'dead',
                Phaser.Animation.generateFrameNames('dead/', 1, 10, '.png', 4),
                18, false, false
            );
            this.fall = this.player.animations.add(
                'fall',
                Phaser.Animation.generateFrameNames('fall/', 1, 8, '.png', 4),
                18, true, false
            );
            this.hurt = this.player.animations.add(
                'hurt',
                Phaser.Animation.generateFrameNames('hurt/', 1, 10, '.png', 4),
                18, false, false
            );
            this.idle = this.player.animations.add(
                'idle',
                Phaser.Animation.generateFrameNames('idle/', 1, 10, '.png', 4),
                18, true, false
            );
            this.jump = this.player.animations.add(
                'jump',
                Phaser.Animation.generateFrameNames('jump/', 1, 8, '.png', 4),
                18, false, false
            );
            this.run = this.player.animations.add(
                'run',
                Phaser.Animation.generateFrameNames('run/', 1, 8, '.png', 4),
                18, true, false
            );
            this.slide = this.player.animations.add(
                'slide',
                Phaser.Animation.generateFrameNames('slide/', 1, 10, '.png', 4),
                18, true, false
            );
            this.walk = this.player.animations.add(
                'walk',
                Phaser.Animation.generateFrameNames('walk/', 1, 10, '.png', 4),
                18, true, false
            );
            this.hurt.onComplete.add(this.playerIdle, this);
            this.jump.onComplete.add(this.isPlayerMoving, this);
            this.playerIdle();
        },
        playerJump: function playerJump() {
            this.player.animations.play('jump');
        },
        playerGoLeft: function playerGoLeft() {
            this.player.scale.setTo(-1.0, 1.0);
            this.player.animations.play((this.keyA.shiftKey) ? 'run' : 'walk');
        },
        playerStopLeft: function playerStopLeft() {
            if(!this.keyD.isDown) {
                this.player.animations.play('idle');
            }
        },
        playerSlide: function playerSlide() {
            this.player.animations.play('slide');
        },
        playerGoRight: function playerGoRight() {
            this.player.scale.setTo(1.0, 1.0);
            this.player.animations.play((this.keyA.shiftKey) ? 'run' : 'walk');
        },
        playerStopRight: function playerStopRight() {
            if(!this.keyA.isDown) {
                this.player.animations.play('idle');
            }
        },
        playerFall: function playerFall() {
            this.player.animations.play('fall');
        },
        playerIdle: function playerIdle() {
            this.player.animations.play('idle');
        },
        playerHurt: function playerHurt() {
            this.player.animations.play('hurt');
        },
        playerDead: function playerDead() {
            this.player.animations.play('dead');
        },
        playerRun: function playerRun() {
            if (this.keyA.isDown || this.keyD.isDown) {
                this.player.animations.play('run');
            }
        },
        playerRunStop: function playerRunStop() {
            if (this.keyA.isDown || this.keyD.isDown) {
                this.player.animations.play('walk');
            }
        },
        addPlayerKeyboardControls: function addPlayerKeyboardControls() {
            this.keyW.onDown.add(this.playerJump, this);
            this.keyA.onDown.add(this.playerGoLeft, this);
            this.keyA.onUp.add(this.playerStopLeft, this);
            this.keyS.onDown.add(this.playerSlide, this);
            this.keyS.onUp.add(this.isPlayerMoving, this);
            this.keyD.onDown.add(this.playerGoRight, this);
            this.keyD.onUp.add(this.playerStopRight, this);
            this.key1.onDown.add(this.playerFall, this);
            this.key1.onUp.add(this.playerIdle, this);
            this.key2.onDown.add(this.playerHurt, this);
            this.key3.onDown.add(this.playerDead, this);
            this.keyShift.onDown.add(this.playerRun, this);
            this.keyShift.onUp.add(this.playerRunStop, this);
        },
        create: function create() {
            this.addBackground();
            this.addKeyboardObjects();
            this.addPlayer();
            this.addPlayerAnimations();
            this.addPlayerKeyboardControls();
            // Can use this in the update to move the character around the screen
            // this.cursors = this.game.input.keyboard.createCursorKeys();
        }
    };
    return Play;
});