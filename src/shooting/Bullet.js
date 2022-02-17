export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');

        scene.add.existing(this);
        this.scale = 2;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.scene = scene;

        // Properties
        this.velocity = 1000;

        // Enable world bound collision and listen for the 'worldbounds'
        // event, and then "destroy" when collision detected
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
            }
        }, this);
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        if(this.scene.major.flipX === true) {
            this.setVelocityX(-this.velocity)
        } else {
            this.setVelocityX(this.velocity);
        }
    }
}

