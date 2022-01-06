export default class extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, tag) {
        super(scene, x, y, tag, 2);

        this.scene = scene;
        
        // Add to game and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        // Collisions
        scene.physics.add.collider(this, scene.platforms);

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update() {
        super.update();
    }

    move(direction) {
        const SPEED = 200;
        this.setVelocityX(direction * SPEED);

        // Animations
        if (this.body.velocity.x > 0) {
            (!this.anims.isPlaying || this.anims.key !== 'walk') &&
                this.anims.play('walk', true); // here
        } else if (this.body.velocity.x < 0) {
            (!this.anims.isPlaying || this.anims.key !== 'walk-backwards') &&
                this.anims.play('walk-backwards', true); // and here
        } else {
            this.anims.play('stop', false);
        }

        return this.body.position.x;
    }
}
