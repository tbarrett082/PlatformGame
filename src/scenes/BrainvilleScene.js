import 'phaser';
import MajorBrainer from '../characters/MajorBrainer';
import Bullet from '../shooting/Bullet';

export default class BrainvilleScene extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        // Game properties
        this.physics.world.setBounds( 0, 0, 5000, 600 );

        // Load Spritesheets
        this.load.spritesheet('major', 'assets/images/major-brainer-walk-anim.png', { frameWidth: 64, frameHeight: 96 });

        //Load Tilemaps
        this.load.tilemapTiledJSON('street-map', 'assets/tilemaps/street-map.json');

        //Load tilesets
        this.load.image('street-tiles', 'assets/tilesets/tileset-street.png');

        //Load Json for initial stat
        this.load.json('world-init', 'data/world-load-01.json');

        // Load world stuff
        this.load.image('background', 'assets/images/background1.png');
        this.load.audio('welcome-to-brainville', 'assets/audio/Welcome to brainville.wav');
        this.load.audio('welcome-to-brainville', 'assets/audio/welcome to china town 2.wav');
        this.load.audio('welcome-to-brainville', 'assets/audio/welcome to da circus.wav');
        this.load.image('bullet', 'assets/images/bullet.png');
    }

    create() {
        // Add background and set camera to bounds of image size
        let bg = this.add.image(0, 0, 'background').setScrollFactor(0).setOrigin(0,0);
        this.cameras.main.setBounds(0, 0, 2000, bg.displayHeight);
        
        /**
         * Tilemap Data
         */
        var platformMap = this.make.tilemap({key: 'street-map'});
        var concreteTileset = platformMap.addTilesetImage('street-tileset', 'street-tiles');

        /**
         * Tilemap creation
         */
        var streetPositionY = this.physics.world.bounds.bottom - (platformMap.height * platformMap.tileHeight); 
        console.log(streetPositionY);
        this.platforms = platformMap.createLayer('Tile Layer 1', concreteTileset, 0, streetPositionY);
        this.platforms.setCollisionByExclusion(-1, true);

        // Generate animations
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('major', { frames: [0] }),
            frameRate: 0
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('major', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,0] }),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-backwards',
            frames: this.anims.generateFrameNumbers('major', { frames: [0, 1, 2, 3,0] }),
            frameRate: 8,
            repeat: 0
        });

        /**
         * Load welcome to brainville song
         */
        var brainvilleSong = this.sound.add('welcome-to-brainville');
        // brainvilleSong.play();

        // Load the keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.xKey = this.input.keyboard.addKey('X');

        /**
         * Character/World Loading
         */
        this._loadWorld(this.cache.json.get('world-init'), this);
    }

    update() {
        this._addEvents();
    }

    init(data) {

    }

    _loadWorld(data) {
        this.major = new MajorBrainer(this, data.major.x, data.major.y, 'major');
        this.cameras.main.startFollow(this.major);
    }

    _addEvents() {
        var position;

        // Set Left/Right keyboard for movement
        if (this.cursors.left.isDown) {
            position = this.major.move(-1);
        } else if (this.cursors.right.isDown) {
            position =this.major.move(1);
        } else {
            position = this.major.move(0);
        }

        // Set X keyboard input for shooting
        if (this.xKey.isDown) {
            this._shootBullet();
        }
    }

    _shootBullet() {
        var bullet = new Bullet(this, 0, 0);
        bullet.fire(this.major.x, this.major.y -20);
    }
}