import 'phaser';
import MajorBrainer from '../characters/MajorBrainer';
import MiniBrainGroup from '../characters/MiniBrains';
import createAnimations from '../config/animations';
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
        this.physics.world.setBounds(0, 0, 15000, 1800);

        // Load Spritesheets
        this.load.spritesheet('major', 'assets/images/major-brainer-walk-anim.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('major-shoot', 'assets/images/major-brainer-walk-shoot.png', { frameWidth: 64, frameHeight: 96 });
        this.load.spritesheet('mini-brain-slide', 'assets/images/mini-brain-move-anim.png', { frameWidth: 16, frameHeight: 14 });

        //Load Tilemaps
        this.load.tilemapTiledJSON('street-map', 'assets/tilemaps/Street.json');

        //Load tilesets
        this.load.image('street-tiles', 'assets/tilesets/tileset-street.png');
        this.load.image('middleground-tiles', 'assets/tilesets/building-1.png');
        this.load.image('concrete-wall-tiles', 'assets/tilesets/concrete-wall.png');
        this.load.image('bush-1-tiles', 'assets/tilesets/bushes-1.png');
        this.load.image('building-3-tiles', 'assets/tilesets/building-3-tiles.png');
        this.load.image('building-4-tiles', 'assets/tilesets/building-4.png');
        this.load.image('invisi-layer-tiles', 'assets/tilesets/invisi-layer.png');

        //Load Json for initial stat
        this.load.json('world-init', 'data/world-load-01.json');

        // Load world stuff
        this.load.image('background', 'assets/images/background1.png');
        this.load.image('tree-city-background', 'assets/images/TreeCityBackground2.png');
        this.load.image('building-3-inside', 'assets/images/building-3-inside.png');
        this.load.image('bridge', 'assets/images/Bridge.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('nsx', 'assets/images/nsx.png');

        // Load Street Slope sprites
        this.load.image('road-flat-1', 'assets/images/road-flat-1.png');
        this.load.image('road-flat-2', 'assets/images/road-slope/road-flat-2.png');
        this.load.image('road-flat-3', 'assets/images/road-slope/road-flat-3.png');
        this.load.image('road-flat-4', 'assets/images/road-slope/road-flat-4.png');
        this.load.image('road-slope', 'assets/images/road-slope.png');
        this.load.image('road-slope-2', 'assets/images/road-slope-2.png');
        this.load.image('road-slope-3', 'assets/images/road-slope/road-slope-3.png');
        this.load.image('road-slope-4', 'assets/images/road-slope/road-slope-4.png');

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
        this.add.image(2000, 0, 'building-3-inside').setOrigin(0, 0).setScrollFactor(0.5, 1);
        let tcb = this.add.image(0, 1200, 'tree-city-background').setOrigin(0, 0).setScrollFactor(0.5, 1);
        this.cameras.main.setBounds(0, 0, 15000, 1800);

        /**
         * Tilemap Data
         */
        var platformMap = this.make.tilemap({ key: 'street-map' });
        var concreteTileset = platformMap.addTilesetImage('tileset-street', 'street-tiles');
        var wallTileset = platformMap.addTilesetImage('concrete-wall', 'concrete-wall-tiles');
        var bushTileset = platformMap.addTilesetImage('bushes-1', 'bush-1-tiles');
        var building3Tileset = platformMap.addTilesetImage('building-3', 'building-3-tiles');
        var invisiLayerTileset = platformMap.addTilesetImage('invisi-layer', 'invisi-layer-tiles');

        /**
         * Tilemap creation
         */
        var streetPositionYPlatform = this.physics.world.bounds.bottom - (platformMap.height * platformMap.tileHeight);


        // create middleground layers
        platformMap.createLayer('concrete-wall', wallTileset, 0, streetPositionYPlatform - 16);
        platformMap.createLayer('trees-front', bushTileset, 0, streetPositionYPlatform - 48);


        //Create street
        this.platforms = platformMap.createLayer('Street', concreteTileset, 0, streetPositionYPlatform);
        this.platforms.setCollisionByExclusion(-1, true);
        this.building3Platforms = platformMap.createLayer('building-3', building3Tileset, 0, streetPositionYPlatform - 16).setScrollFactor(0.5, 1);
        this.building3Platforms.setCollisionByExclusion(-1, true);
        this.invisiLayerPlatforms = platformMap.createLayer('invisi-layer', invisiLayerTileset, 0, streetPositionYPlatform - 16);
        this.invisiLayerPlatforms.setCollisionByExclusion(-1, true);



        // Generate animations
        var createAnims = createAnimations.bind(this);
        createAnims();

        /**
         * Create audio
         */
        var brainvilleSong = this.sound.add('welcome-to-brainville', { loop: true, seek: 13.689 });
        // brainvilleSong.play({seek: 13.689});


        // Load the keyboard keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.xKey = this.input.keyboard.addKey('X');

        /**
         * Character/World Loading
         */
        this.miniBrains = new MiniBrainGroup(this);
        this._loadWorld(this.cache.json.get('world-init'), this);
    }

    update(time, delta) {
        this._addEvents(time);
    }

    init(data) {

    }

    _loadWorld(data) {

        this.add.image(data.car.x, data.car.y, 'nsx').setScale(0.3).setOrigin(0, 0);
        this._loadStreetSlope(this);

        //Create the player
        this.major = new MajorBrainer(this, data.major.x, data.major.y, 'major');
        this.cameras.main.startFollow(this.major);

        /** 
         * Mini Brains
         */
        var miniBrainPositions = data.miniBrains;
        this.miniBrains.init(miniBrainPositions.length);
        miniBrainPositions.forEach(function (obj) { this.miniBrains.startMiniBrain(obj.x, obj.y) }, this);
    }

    _loadStreetSlope() {
        this.roadSlope = this.physics.add.sprite(6000, 1700, 'road-slope').setOrigin(0, 0);
        this.roadSlope.body.setCollideWorldBounds(true);
        this.roadSlope.body.setAllowGravity(false);
        this.roadSlope.body.setImmovable(true);
        this.slopeTriangle1 = new Phaser.Geom.Triangle(
            6000,
            1800,
            6000 + this.roadSlope.width,
            1800,
            6000 + this.roadSlope.width,
            1800 - this.roadSlope.height);

        this.graphics = this.add.graphics({
            lineStyle: { width: 2, color: 0x00aa00 },
            fillStyle: { color: 0xFFFFFF }
        });

        this.graphics.visible = true;
        this.graphics.strokeTriangleShape(this.slopeTriangle1);

        this.roadFlat1 = this.physics.add.sprite(6588, 1660, 'road-flat-1').setOrigin(0, 0);
        this.roadFlat1.body.setImmovable(true);
        this.roadFlat1.body.setAllowGravity(false);
        this.roadFlat1.body.checkCollision.left = false;
        this.roadFlat1.body.checkCollision.right = false;

        this.roadSlope2 = this.physics.add.sprite(6840, 1553, 'road-slope-2').setOrigin(0, 0);
        this.roadSlope2.body.setImmovable(true);
        this.roadSlope2.body.setAllowGravity(false);
        this.slopeTriangle2 = new Phaser.Geom.Triangle(
            6840,
            1553 + this.roadSlope2.height,
            6840 + this.roadSlope2.width,
            1553 + this.roadSlope2.height,
            6840 + this.roadSlope2.width,
            1553);
            this.graphics.strokeTriangleShape(this.slopeTriangle2);

        this.roadFlat2 = this.physics.add.sprite(7107, 1553, 'road-flat-2').setOrigin(0, 0);
        this.roadFlat2.body.setImmovable(true);
        this.roadFlat2.body.setAllowGravity(false);
        this.roadFlat2.body.checkCollision.left = false;
        this.roadFlat2.body.checkCollision.right = false;

        this.roadSlope3 = this.physics.add.sprite(7184, 1465, 'road-slope-3').setOrigin(0, 0);
        this.roadSlope3.body.setImmovable(true);
        this.roadSlope3.body.setAllowGravity(false);
        this.slopeTriangle3 = new Phaser.Geom.Triangle(
            7184,
            1465 + this.roadSlope3.height,
            7184 + this.roadSlope3.width,
            1465 + this.roadSlope3.height,
            7184 + this.roadSlope3.width,
            1465);
            this.graphics.strokeTriangleShape(this.slopeTriangle3);

        this.roadFlat3 = this.physics.add.sprite(7564, 1464, 'road-flat-3').setOrigin(0, 0);
        this.roadFlat3.body.setImmovable(true);
        this.roadFlat3.body.setAllowGravity(false);
        this.roadFlat3.body.checkCollision.left = false;
        this.roadFlat3.body.checkCollision.right = false;

        this.roadSlope4 = this.physics.add.sprite(7803, 1345, 'road-slope-4').setOrigin(0, 0);
        this.roadSlope4.body.setImmovable(true);
        this.roadSlope4.body.setAllowGravity(false);
        this.slopeTriangle4 = new Phaser.Geom.Triangle(
            7803,
            1344 + this.roadSlope4.height,
            7803 + this.roadSlope4.width,
            1344 + this.roadSlope4.height,
            7803 + this.roadSlope4.width,
            1344);
            this.graphics.strokeTriangleShape(this.slopeTriangle4);

        this.roadFlat4 = this.physics.add.sprite(8086, 1345, 'road-flat-4').setOrigin(0, 0);
        this.roadFlat4.body.setImmovable(true);
        this.roadFlat4.body.setAllowGravity(false);
        this.roadFlat4.body.checkCollision.left = false;
        this.roadFlat4.body.checkCollision.right = false;

        this.graphics.clear();

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

        var glockShot = this.sound.add('glock-shot', { volume: 0.15 });
        glockShot.play();
    }
}