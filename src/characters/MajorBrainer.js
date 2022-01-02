export default class extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, tag) {
        super(scene, x, y, tag, 2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0,0);

        this.body.onWorldBounds = true;

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update() {
        super.update();
    }

    move(direction) {
        const SPEED = 75;
        this.setVelocityX(direction * SPEED);

        // Animations
        if (this.body.velocity.x > 0) {
            (!this.anims.isPlaying || this.anims.key !== 'walk') &&
                this.anims.play('walk', true); // here
        } else if (this.body.velocity.x < 0) {
            (!this.anims.isPlaying || this.anims.key !== 'walk-backwards') &&
                this.anims.play('walk-backwards', true); // and here
        }
    }
}
