export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(1500);
    }
}

