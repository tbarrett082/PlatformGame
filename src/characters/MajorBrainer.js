export default class extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, tag) {
        super(scene, x, y, tag, 2);

        this.scene = scene;
        this.fireRate = 500;
        this.nextShot = 0;
        this.speed = 200;

        // Add to game and physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        // Collisions
        scene.physics.add.collider(this, scene.platforms);
        scene.physics.add.collider(this, scene.building3Platforms);
        scene.physics.add.collider(this, scene.invisiLayerPlatforms);
        scene.physics.add.collider(this, scene.copCarBody);
        scene.physics.add.collider(this, scene.roadFlat1);
        scene.physics.add.collider(this, scene.roadFlat2);
        scene.physics.add.collider(this, scene.roadFlat3);
        scene.physics.add.collider(this, scene.roadFlat4);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    update() {
        super.update();
    }

    move(direction) {
        this.setVelocityX(direction * this.speed);

        // Animations
        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
            if (this.scene.xKey.isDown) {
                (!this.anims.isPlaying || this.anims.key !== 'walk-shoot') &&
                    this.anims.play('walk-shoot', true);
            } else {
                (!this.anims.isPlaying || this.anims.key !== 'walk') &&
                    this.anims.play('walk', true);
            }
        } else if (this.body.velocity.x < 0) {
            this.setFlipX(true);
            if (this.scene.xKey.isDown) {
                (!this.anims.isPlaying || this.anims.key !== 'walk-shoot') &&
                    this.anims.play('walk-shoot', true);
            } else {
                (!this.anims.isPlaying || this.anims.key !== 'walk') &&
                    this.anims.play('walk', true);
            }
        } else {
            if (this.scene.xKey.isDown) {
                this.anims.play('stop-shoot', true);
            } else {
                this.anims.play('stop', false);
            }
        }

        /**
         * Overlaps with street slopes
         */
        if (this.scene.physics.overlap(this, this.scene.roadSlope)) {
            if (this._intersectsSlopeTriangle(this.getBounds(), this.scene.slopeTriangle1)) {
                this.body.blocked.down = true;
                if (this.scene.cursors.up.isDown) {
                    this.jump();
                } else {
                    var x1 = this.scene.roadSlope.body.position.x;
                    var x2 = x1 + this.scene.roadSlope.width;
                    var y2 = this.scene.roadSlope.body.position.y;
                    var y1 = y2 + this.scene.roadSlope.body.height;

                    this.body.y = this._getSlopePositionY(x1, x2, y1, y2);
                    this.body.setAllowGravity(false);
                }
            }
        }
        else {
            this.body.setAllowGravity(true);
        }
        if (this.scene.physics.overlap(this, this.scene.roadSlope2)) {
            if (this._intersectsSlopeTriangle(this.getBounds(), this.scene.slopeTriangle2)) {
                this.body.blocked.down = true;
                if (this.scene.cursors.up.isDown) {
                    this.jump();
                } else {
                    var x1 = this.scene.roadSlope2.body.position.x;
                    var x2 = x1 + this.scene.roadSlope2.width;
                    var y2 = this.scene.roadSlope2.body.position.y;
                    var y1 = y2 + this.scene.roadSlope2.body.height;

                    this.body.y = this._getSlopePositionY(x1, x2, y1, y2);
                    this.body.setAllowGravity(false);
                }
            }
        } else {
            this.body.setAllowGravity(true);
        }

        if (this.scene.physics.overlap(this, this.scene.roadSlope3)) {
            if (this._intersectsSlopeTriangle(this.getBounds(), this.scene.slopeTriangle3)) {
                this.body.blocked.down = true;
                if (this.scene.cursors.up.isDown) {
                    this.jump();
                } else {
                    var x1 = this.scene.roadSlope3.body.position.x;
                    var x2 = x1 + this.scene.roadSlope3.width;
                    var y2 = this.scene.roadSlope3.body.position.y;
                    var y1 = y2 + this.scene.roadSlope3.body.height;

                    this.body.y = this._getSlopePositionY(x1, x2, y1, y2);
                    this.body.setAllowGravity(false);
                }
            }
        } else {
            this.body.setAllowGravity(true);
        }

        if (this.scene.physics.overlap(this, this.scene.roadSlope4)) {
            if (this._intersectsSlopeTriangle(this.getBounds(), this.scene.slopeTriangle4)) {
                this.body.blocked.down = true;
                if (this.scene.cursors.up.isDown) {
                    this.jump();
                } else {
                    var x1 = this.scene.roadSlope4.body.position.x;
                    var x2 = x1 + this.scene.roadSlope4.width;
                    var y2 = this.scene.roadSlope4.body.position.y;
                    var y1 = y2 + this.scene.roadSlope4.body.height;

                    this.body.y = this._getSlopePositionY(x1, x2, y1, y2);
                    this.body.setAllowGravity(false);
                }
            }
        } else {
            this.body.setAllowGravity(true);
        }

        /**
         * Intersects with building 3
         */
       if (this._intersectsRectangle(this.getBounds(), this.scene.building3Rectangle)) {
           this.speed = 125;
       } else {
           this.speed = 200;
       }

        return this.body.position.x;
    }

    jump() {
        if (this.body.blocked.down) {
            this.scene.boing.play();
            this.setVelocityY(-400);
        }
    }

    _getSlopePositionY(x1, x2, y1, y2) {
        var width = x2 - x1;
        var height = y2 - y1;
        var playerRelX;
        if (this.body.position.x < x1) {
            return this.body.position.y;
        } else {
            playerRelX = this.body.position.x - x1;
        }
        var percent = playerRelX / width;
        var heightPercent = percent * height;
        var finalHeight = heightPercent + y1 - (this.body.height);

        return finalHeight;
    }

    _intersectsSlopeTriangle(objA, objB) {
        return Phaser.Geom.Intersects.RectangleToTriangle(objA, objB);
    }

    _intersectsRectangle(objA, objB) {
        return Phaser.Geom.Intersects.RectangleToRectangle(objA, objB);
    }
}
