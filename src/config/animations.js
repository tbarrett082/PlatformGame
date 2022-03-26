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
        key: 'jump-shoot',
        frames: this.anims.generateFrameNumbers('major', { frames: [14] }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'fall-shoot',
        frames: this.anims.generateFrameNumbers('major', { frames: [15] }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('major', { frames: [12] }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNumbers('major', { frames: [13] }),
        frameRate: 8,
        repeat: 0
    });
    this.anims.create({
        key: 'brain-slide',
        frames: this.anims.generateFrameNumbers('mini-brain-slide', { frames: [0, 1] }),
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'cop-car',
        frames: this.anims.generateFrameNumbers('cop-car', { frames: [0, 1, 2, 3, 4, 5] }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'brain-cop-1-stop',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [0] }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'brain-cop-1-walk',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: 'brain-cop-1-shot',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [11, 12, 13, 14] }),
        frameRate: 8,
        repeat: 0,
    });

    this.anims.create({
        key: 'brain-cop-1-shoot',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [10] }),
        frameRate: 8,
        repeat:4,
    });

    this.anims.create({
        key: 'brain-cop-1-die',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }),
        frameRate: 10,
        repeat: 0,
    });

    this.anims.create({
        key: 'brain-cop-1-dead',
        frames: this.anims.generateFrameNumbers('brain-cop-1', { frames: [25] }),
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: 'music-button-open',
        frames: this.anims.generateFrameNumbers('music-button', { frames: [0] }),
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: 'music-button-closed',
        frames: this.anims.generateFrameNumbers('music-button', { frames: [2] }),
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: 'music-button-open-hover',
        frames: this.anims.generateFrameNumbers('music-button', { frames: [1] }),
        frameRate: 1,
        repeat: -1,
    });

    this.anims.create({
        key: 'music-button-closed-hover',
        frames: this.anims.generateFrameNumbers('music-button', { frames: [3] }),
        frameRate: 1,
        repeat: -1,
    });
}