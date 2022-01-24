export default class OpeningCutscene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet('cut-scene-1', 'assets/images/OpeningCutscene-1.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-2', 'assets/images/OpeningCutscene-2.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-3', 'assets/images/OpeningCutscene-3.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-4', 'assets/images/OpeningCutscene-4.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-5', 'assets/images/OpeningCutscene-5.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-6', 'assets/images/OpeningCutscene-6.png', { frameWidth: 400, frameHeight: 300 });
        this.load.spritesheet('cut-scene-7', 'assets/images/OpeningCutscene-7.png', { frameWidth: 400, frameHeight: 300 });
    }

    create() {

        // Fade in the scene
        this.cameras.main.fadeIn(2000, 0, 0, 0);

        this.anims.create({
            key: 'title-scene-play-1',
            frames: this.anims.generateFrameNumbers('cut-scene-1', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-2',
            frames: this.anims.generateFrameNumbers('cut-scene-2', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-3',
            frames: this.anims.generateFrameNumbers('cut-scene-3', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-4',
            frames: this.anims.generateFrameNumbers('cut-scene-4', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-5',
            frames: this.anims.generateFrameNumbers('cut-scene-5', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-6',
            frames: this.anims.generateFrameNumbers('cut-scene-6', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'title-scene-play-7',
            frames: this.anims.generateFrameNumbers('cut-scene-7', { start: 0, end: 26 }),
            frameRate: 12,
            repeat: 0
        });

        var cutsceneSprite1 = this.add.sprite(0, 0, 'cut-scene-1').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite2 = this.add.sprite(0, 0, 'cut-scene-2').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite3 = this.add.sprite(0, 0, 'cut-scene-3').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite4 = this.add.sprite(0, 0, 'cut-scene-4').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite5 = this.add.sprite(0, 0, 'cut-scene-5').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite6 = this.add.sprite(0, 0, 'cut-scene-6').setOrigin(0, 0).setScale(2).setVisible(false);
        var cutsceneSprite7 = this.add.sprite(0, 0, 'cut-scene-7').setOrigin(0, 0).setScale(2).setVisible(false);

        cutsceneSprite1.setVisible(true).play('title-scene-play-1');

        cutsceneSprite1.on('animationcomplete-title-scene-play-1', function () {
            cutsceneSprite1.destroy;
            cutsceneSprite2.setVisible(true).play('title-scene-play-2');
        }, this);

        cutsceneSprite2.on('animationcomplete-title-scene-play-2', function () {
            cutsceneSprite2.destroy;
            cutsceneSprite3.setVisible(true).play('title-scene-play-3');
        }, this);

        cutsceneSprite3.on('animationcomplete-title-scene-play-3', function () {
            cutsceneSprite3.destroy;
            cutsceneSprite4.setVisible(true).play('title-scene-play-4');
        }, this);

        cutsceneSprite4.on('animationcomplete-title-scene-play-4', function () {
            cutsceneSprite4.destroy;
            cutsceneSprite5.setVisible(true).play('title-scene-play-5');
        }, this);

        cutsceneSprite5.on('animationcomplete-title-scene-play-5', function () {
            cutsceneSprite5.destroy;
            cutsceneSprite6.setVisible(true).play('title-scene-play-6');
        }, this);

        cutsceneSprite6.on('animationcomplete-title-scene-play-6', function () {
            cutsceneSprite6.destroy;
            cutsceneSprite7.setVisible(true).play('title-scene-play-7');
        }, this);

        cutsceneSprite7.on('animationcomplete-title-scene-play-7', function () {
            cutsceneSprite7.destroy;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Brainville');
            })
        }, this);
    }
}