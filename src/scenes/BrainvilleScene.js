import 'phaser';
import MajorBrainer from '../characters/MajorBrainer';
import Bullet from '../shooting/Bullet';

const Delay = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}

export default class BrainvilleScene extends Phaser.Scene {
    constructor() {
        super();
        this.shotCount = 0;
    }

    preload() {
        // Game properties
        this.physics.world.setBounds(0, 0, 5040, 600);

        // Load Spritesheets
        this.load.spritesheet('major', 'assets/images/major-brainer-walk-anim.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('major-shoot', 'assets/images/major-brainer-walk-shoot.png', {frameWidth: 64, frameHeight: 96});

        //Load Tilemaps
        this.load.tilemapTiledJSON('street-map', 'assets/tilemaps/Street.json');

        //Load tilesets
        this.load.image('street-tiles', 'assets/tilesets/tileset-street.png');
        this.load.image('middleground-tiles', 'assets/tilesets/building-1.png');
        this.load.image('concrete-wall-tiles', 'assets/tilesets/concrete-wall.png');
        this.load.image('bush-1-tiles', 'assets/tilesets/bushes-1.png');

        //Load Json for initial stat
        this.load.json('world-init', 'data/world-load-01.json');

        // Load world stuff
        this.load.image('background', 'assets/images/background1.png');
        this.load.image('tree-city-background', 'assets/images/TreeCityBackground.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('nsx', 'assets/images/nsx.png');

        //Load Audio
        this.load.audio('welcome-to-brainville', 'assets/audio/Welcome to brainville.wav');
        this.load.audio('welcome-to-china-town', 'assets/audio/welcome to china town 2.wav');
        this.load.audio('glock-shot', 'assets/audio/Glock-2.wav');

    }

    create() {
        // Fade in the scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // Add background and set camera to bounds of image size
        let bg = this.add.image(0, 0, 'background').setScrollFactor(0).setOrigin(0, 0);
        let tcb = this.add.image(0, 0, 'tree-city-background').setOrigin(0, 0).setScrollFactor(0.5);
        this.cameras.main.setBounds(0, 0, 5040, bg.displayHeight);

        /**
         * Tilemap Data
         */
        var platformMap = this.make.tilemap({ key: 'street-map' });
        var concreteTileset = platformMap.addTilesetImage('tileset-street', 'street-tiles');
        var buildingTileset = platformMap.addTilesetImage('building-1', 'middleground-tiles');
        var wallTileset = platformMap.addTilesetImage('concrete-wall', 'concrete-wall-tiles');
        var bushTileset = platformMap.addTilesetImage('bushes-1', 'bush-1-tiles');

        /**
         * Tilemap creation
         */
        var streetPositionYPlatform = this.physics.world.bounds.bottom - (platformMap.height * platformMap.tileHeight);
        console.log(streetPositionYPlatform);
        // create middleground layers
        platformMap.createLayer('Building', buildingTileset, 0, streetPositionYPlatform -237);
        platformMap.createLayer('concrete-wall', wallTileset, 0, streetPositionYPlatform -16);
        platformMap.createLayer('trees-front', bushTileset, 0, streetPositionYPlatform -48);

        //Create street
        this.platforms = platformMap.createLayer('Street', concreteTileset, 0, streetPositionYPlatform);
        this.platforms.setCollisionByExclusion(-1, true);

        // Generate animations
        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('major', { frames: [0] }),
            frameRate: 0
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('major', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] }),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-backwards',
            frames: this.anims.generateFrameNumbers('major', { frames: [0, 1, 2, 3, 0] }),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'stop-shoot',
            frames: this.anims.generateFrameNumbers('major-shoot', { frames: [0] }),
            frameRate: 0
        });
        this.anims.create({
            key: 'walk-shoot',
            frames: this.anims.generateFrameNumbers('major-shoot', { frames: [0, 1, 2, 3, 0] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk-backwards-shoot',
            frames: this.anims.generateFrameNumbers('major-shoot', { frames: [0, 1, 2, 3, 0] }),
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

    update(time, delta) {
        this._addEvents(time);
    }

    init(data) {

    }

    _loadWorld(data) {
        /**
         * Decorations
         */
        this.add.image(data.car.x, data.car.y, 'nsx').setScale(0.2).setOrigin(0,0);
        this.major = new MajorBrainer(this, data.major.x, data.major.y, 'major');
        this.cameras.main.startFollow(this.major);
    }

    async _addEvents(time) {
        var position;

        // Set Left/Right keyboard for movement
        if (this.cursors.left.isDown) {
            position = this.major.move(-1);
        } else if (this.cursors.right.isDown) {
            position = this.major.move(1);
        } else {
            position = this.major.move(0);
        }

        // Set Up key for jump
        if (this.cursors.up.isDown) {
            this.major.jump();
        }

        // Set the X key to cause shooting animation/shooting logic
        if (this.xKey.isDown) {
            if (this.major.nextShot < this.time.now) {
                this._shootBullet();
                this.major.nextShot = this.time.now + this.major.fireRate;
            }
        }
    }

    async _shootBullet() {
        var bullet = new Bullet(this, 0, 0);
        bullet.fire(this.major.x + 30, this.major.y - 15);
        this.shotCount += 1;

        var glockShot = this.sound.add('glock-shot', {volume: 0.15});
        glockShot.play();
    }
}