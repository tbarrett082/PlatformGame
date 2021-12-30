import 'phaser';
import MajorBrainer from '../characters/MajorBrainer';

export default class BrainvilleScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        // Game properties

        // Load Spritesheets
        this.load.spritesheet('major', 'assets/images/major-brainer-walk-anim.png', { frameWidth: 64, frameHeight: 128 });

        //Load Json for initial stat
        this.load.json('world-init', 'data/world-load-01.json');

        // Load world stuff
        this.load.image('background', 'assets/images/background.png');
    }

    create() {
        /**
         * Tilemap Data
         */
        this.add.image(0, 0, 'background');

        // this.cameras.main.setZoom(2);

        // Generate animations
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('major', { frames: [1] }),
            frameRate: 8
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('major', { frames: [4, 5, 6, 7] }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'walk-backwards',
            frames: this.anims.generateFrameNumbers('major', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: 0
        });

        // Load the cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        /**
         * Character Loading
         */
        this._loadWorld(this.cache.json.get('world-init'), this);
    }

    update() {
        this._handleInput();
    }

    init(data) {

    }

    _loadWorld(data) {
        this.major = new MajorBrainer(this, data.major.x, data.major.y, 'major');
    }

    _handleInput() {
        if (this.cursors.left.isDown) {
            this.major.move(-1);
        } else if (this.cursors.right.isDown) {
            this.major.move(1);
        } else {
            this.major.move(0);
        }
    }
}