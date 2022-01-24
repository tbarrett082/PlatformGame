import TextPlayerPlugin from 'phaser3-rex-plugins/plugins/textplayer-plugin.js';

export default {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 500},
            arcade: {debug: true}
        }
    },
    plugins: {
        global: [{
            key: 'rexTextPlayerPlugin',
            plugin: TextPlayerPlugin,
            start: true
        }]
    }
};