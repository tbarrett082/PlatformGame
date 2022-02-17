export default class BrainCop1Group extends Phaser.Physics.Arcade.Group {
    constructor (scene) {
        super (scene.physics.world, scene);
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
    constructor (scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (Phaser.Math.Distance.Between(this.scene.major.x, this.scene.major.y, this.x, this.y) < 400) {
            if (this.scene.major.x < this.x) {
                this.body.setVelocityX(-100);
                if (!this.facingLeft) {
                    this.facingLeft = true;
                    this.setFlipX(false);
                }
            } else if (this.scene.major.x > this.x) {
                if (this.facingLeft){
                    this.facingLeft = false;
                    this.setFlipX(true);
                }
                this.body.setVelocityX(100);
            }
        } else {
            this.body.setVelocityX(0);
        }

        if (this.body.velocity.x > 0) {
            
                (!this.anims.isPlaying || this.anims.key !== 'brain-cop-1-walk') &&
                    this.anims.play('brain-cop-1-walk', true);
            
        } else if (this.body.velocity.x < 0) {
                (!this.anims.isPlaying || this.anims.key !== 'brain-cop-1-walk') &&
                    this.anims.play('brain-cop-1-walk', true);
        } else {
                this.anims.play('brain-cop-1-stop', false);
        }
    }

    start(x, y) {
        this.body.setCollideWorldBounds(true);

        this.anims.play('brain-cop-1-stop', true);
        this.scene.physics.add.collider(this, this.scene.platforms);
        this.body.reset(x, y);
        this.body.setSize(this.width/this.scale.x, this.height/this.scale.y);
        this.setScale(2);
        this.setActive(true);
        this.setVisible(true);
    }
}