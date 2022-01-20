export default class MiniBrainGroup extends Phaser.Physics.Arcade.Group {

    constructor (scene) {
        super (scene.physics.world, scene);
    }

    init(size) {
        this.createMultiple({
            classType: MiniBrain,
            frameQuantity: size,
            active: false,
            visible: false,
            key: 'mini-brain -slide'
        })
    }

    startMiniBrain(x, y) {
        var miniBrain = this.getFirstDead(false);
        if (miniBrain) {
            miniBrain.startMoving(x, y);
        }
    }
}

class MiniBrain extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.velocity = -90;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.body.blocked.right) {
            this.flipX = false;
            this.setVelocityX(this.velocity);
        } else if (this.body.blocked.left) {
            this.flipX = true;
            this.setVelocityX(-this.velocity);
        }
    }

    startMoving(x, y) {
        this.body.setCollideWorldBounds();

        // Start animations
        (!this.anims.isPlaying || this.anims.key !== 'brain-slide') &&
                    this.anims.play('brain-slide', true);
        
        // Add body to the scene and set it to move
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.body.reset(x, y);
        this.setScale(2);
        this.body.setSize(this.width/this.scale.x, this.height/this.scale.y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(this.velocity);
    }
}