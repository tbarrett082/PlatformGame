import 'phaser';
import MajorBrainer from '../characters/MajorBrainer';

export default class BrainvilleScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        // Game properties
        this.physics.world.setBounds( 0, 0, 960, 600 );

        // Load Spritesheets
        this.load.spritesheet('major', 'assets/images/major-brainer-walk-anim.png', { frameWidth: 96, frameHeight: 96 });

        //Load Json for initial stat
        this.load.json('world-init', 'data/world-load-01.json');

        // Load world stuff
        this.load.image('background', 'assets/images/background.png');
    }

    create() {
        /**
         * Tilemap Data
         */
        let bg = this.add.image(0, 0, 'background');
        bg.setOrigin(0, 0);

        // this.cameras.main.setZoom(2);
        this.physics.world.setBounds( 0, 0, 960, 600 );

        // Generate animations
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('major', { frames: [0] }),
            frameRate: 16
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('major', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,0] }),
            frameRate: 16,
            repeat: 0
        });
        this.anims.create({
            key: 'walk-backwards',
            frames: this.anims.generateFrameNumbers('major', { frames: [0, 1, 2, 3,0] }),
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
        this.cameras.main.startFollow(this.major);
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