import Phaser from 'phaser';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
  }
 
  create() {
    // Images
    this.add.image(400, 80, 'star');
    this.add.image(400, 130, 'dude');

    // Title
    this.title = this.add.text(400, 250, 'Platformer', {
      fontSize: 50,
      fontStyle: 'bold',
      align: 'center',
      color: '#aaaaaa',
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
    this.gameButton = btn(this, 400, 330, 'Play', 35);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // Option button
    this.gameButton = btn(this, 400, 400, 'Options', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Options');
    });

    // Leaderboard button
    this.gameButton = btn(this, 400, 445, 'LeaderBoard', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('LeaderBoard');
    });

    // Credits button
    this.gameButton = btn(this, 400, 490, 'Credits', 28);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });
  }
};