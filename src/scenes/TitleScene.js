import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Images
    this.add.image(600, 80, 'star');
    this.add.image(600, 130, 'dud');

    // Title
    this.title = this.add.text(600, 250, 'Platformer', {
      fontSize: 50,
      fontStyle: 'bold',
      align: 'center',
      color: '#32a852',
    });
    this.title.setOrigin(0.5, 0.5);

    // Buttons constructor
    const btn = (scene, positionX, positionY, btnDet, textSize) => {
      const btn = scene.add.text(positionX, positionY, btnDet, {
        fontSize: textSize,
      });
      btn.setOrigin(0.5, 0);
      btn.setInteractive();
      return btn;
    };
    // Play button
    this.gameButton = btn(this, 600, 330, 'Play', 35);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // Option button
    this.gameButton = btn(this, 600, 400, 'Options', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    // Leaderboard button
    this.gameButton = btn(this, 600, 445, 'LeaderBoard', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
    });

    // Credits button
    this.gameButton = btn(this, 600, 490, 'Credits', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });
  }
}