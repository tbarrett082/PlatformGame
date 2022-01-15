import Phaser from 'phaser';
import config from './config/config';
import BrainvilleScene from './scenes/BrainvilleScene';
import TitleScene from './scenes/TitleScene';

// const game = new Phaser.Game(config);

class Game extends Phaser.Game {
    constructor() {
        super(config);

        // Add Brainville scene
        this.scene.add('Title', TitleScene);
        this.scene.add('Brainville', BrainvilleScene);
        this.scene.start('Title');
    }
}

window.onload = function () {
    window.game = new Game();
}
