import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';

export default {
    type: Phaser.AUTO,
    width: 960,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};