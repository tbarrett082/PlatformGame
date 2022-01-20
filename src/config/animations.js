export default function createAnimations() {
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
    this.anims.create({
        key: 'brain-slide',
        frames: this.anims.generateFrameNumbers('mini-brain-slide', { frames: [0, 1] }),
        frameRate: 8,
        repeat: -1
    });
}