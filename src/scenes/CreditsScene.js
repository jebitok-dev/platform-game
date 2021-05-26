import Phaser from 'phaser';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.add.sprite(400, 100, 'dud');

    // Title
    this.title = this.add.text(400, 200, 'Credits', {
      font: '50px monospace',
      fill: '#32a852',
      align: 'center',
    });
    this.title.setOrigin(0.5, 0.5);

    // Credits text
    this.title = this.add.text(
      400,
      350,
      'This game has been built with\ntechnologies and help from:\n\n - Phaser - Phaser-Documentation\n Microverse.\n\n All of the assets were taken from\n Phaser mainpage.',
      {
        font: '25px monospace',
        fill: '#999999',
        align: 'center',
      },
    );
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
    this.gameButton = btn(this, 300, 500, 'Play', 35);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // Menu button
    this.gameButton = btn(this, 500, 500, 'Menu', 35);
    this.gameButton.on('pointerdown', () => {
      this.scene.start('Title');
    });
  }
}