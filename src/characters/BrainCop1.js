export default class BrainCop1Group extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.facingLeft = true;
    }

    init(size) {
        this.createMultiple({
            classType: BrainCop1,
            frameQuantity: size,
            active: false,
            visible: false,
            key: 'brain-cop-1'
        })
    }

    startBrainCop(x, y) {
        var brainCop = this.getFirstDead(false);
        if (brainCop) {
            brainCop.start(x, y);
        }
    }
}

class BrainCop1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;

        scene.physics.add.collider(this, scene.platforms);
        scene.physics.add.collider(this, scene.building3Platforms);
        scene.physics.add.collider(this, scene.invisiLayerPlatforms);
        scene.physics.add.collider(this, scene.copCarBody);

        // Events
        this.on('GOT_SHOT', this._getShot);
        this.on('MOVE_TO_HERO', this._move);
        this.on('STOP', this._stop);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.scene.physics.overlap(this, this.scene.bullet)) {
            this.emit('GOT_SHOT');
        } else if (Phaser.Math.Distance.Between(this.scene.major.x, this.scene.major.y, this.x, this.y) < 400) {
            this.emit('MOVE_TO_HERO');
        } else {
            this.emit('STOP');
        }
    }

    start(x, y) {
        this.body.setCollideWorldBounds(true);

        this.anims.play('brain-cop-1-stop', true);
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.body.reset(x, y);
        this.body.setSize(this.width / this.scale.x, this.height / this.scale.y);
        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
    }

    _getShot() {
        this.scene.bullet.destroy();
        this.body.velocity.x = 0;
        this.off('MOVE_TO_HERO');
        this.off('STOP');
        this.anims.play('brain-cop-1-shot', true);
        this.on('animationcomplete-brain-cop-1-shot', function () {
            this.on('MOVE_TO_HERO', this._move);
            this.on('STOP', this._stop);
        }, this);
    }

    _move() {
        if (this.scene.major.x < this.x) {
            this.body.setVelocityX(-100);

            this.setFlipX(false);

        } else if (this.scene.major.x > this.x) {

            this.setFlipX(true);

            this.body.setVelocityX(100);
        }

        if (this.body.velocity.x > 0) {

            (!this.anims.isPlaying || this.anims.key !== 'brain-cop-1-walk') &&
                this.anims.play('brain-cop-1-walk', true);

        } else if (this.body.velocity.x < 0) {
            (!this.anims.isPlaying || this.anims.key !== 'brain-cop-1-walk') &&
                this.anims.play('brain-cop-1-walk', true);
        }
    }

    _stop() {
        this.body.setVelocityX(0);
        this.anims.play('brain-cop-1-stop', false);
    }
}