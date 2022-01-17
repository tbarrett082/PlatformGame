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
    }
};