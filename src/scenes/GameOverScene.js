import Phaser from 'phaser';
import Dom from '../js/dom';
import LocalStorage from '../js/localStorage';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.title = this.add.text(400, 120, 'Game Over', {
      font: '50px monospase',
      fill: '#bbb',
    });
    this.title.setOrigin(0.5, 0.5);

    const score = LocalStorage.getScore();
    LocalStorage.clearStorage();

    this.score = this.add.text(400, 200, `Your score is: ${score}`, {
      font: '35px monoscape',
      fill: '#888',
    });
    this.score.setOrigin(0.5, 0.5);

    const btn = (scene, positionX, positionY, btnDet, textSize) => {
      const btn = scene.add.text(positionX, positionY, btnDet, {
        fontSize: textSize,
      });
      btn.setOrigin(0.5, 0);
      btn.setInteractive();
      return btn;
    };

    this.gameButton = btn(this, 300, 500, 'Play', 35);
    this.gameButton.on('pointerdown', () => {
      Dom.removeDomElements();
      this.scene.start('Game');
    });

    this.gameButton = btn(this, 500, 500, 'Play', 35);
    this.gameButton.on('pointerdown', () => {
      Dom.removeDomElements();
      this.scene.start('Title');
    });

    Dom.nameForm();
    Dom.submitButtonAction(score);
  }
}