import Phaser from 'phaser';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.add.sprite(400, 100, 'dud');

    // options Title
    this.title = this.add.text(400, 200, 'Options', {
      font: '50px monospace',
      fill: '#aaaaaa',
      align: 'center',
    });
    this.title.setOrigin(0.5, 0.5);

    // Options text
    this.text = this.add.text(
      400,
      350,
      'Move to left and right using the\n keyboard arrows left and right\nrespectively, jump using up arrow,\n and try to collect all\n the stars avioding the bombs!',
      {
        font: '25px monospace',
        fill: '#999',
        align: 'center',
      },
    );
    this.text.setOrigin(0.5, 0.5);

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