export default class TitleScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('title-screen', 'assets/images/title-screen.png');
    }

    create() {
        this.add.image(0, 0, 'title-screen').setOrigin(0, 0);

        //Buttons
        var play = this.add.text(150, 450, 'Play');
        play.setInteractive({ useHandCursor: true });
        play.on('pointerdown', () => this._clickButton());
    }

    _clickButton() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Brainville');
        })
    }

}