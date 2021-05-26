import Phaser from 'phaser';
import api from '../js/api';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  async create() {
    const response = await api.ScoreList();
    const scoreList = response.result.sort((a, b) => b.score - a.score);
    let player = '';
    for (let i = 0; i < 5; i += 1) {
      player += `${i + 1}.    ${scoreList[i].user}: ${scoreList[i].score
      }\n\n`;
      if (i === scoreList.length - 1) {
        break;
      }
    }

    // Title
    this.title = this.add.text(400, 90, 'Top Scores', {
      font: '50px monospace',
      fill: '#32a852',
      align: 'center',
    });
    this.title.setOrigin(0.5, 0.5);

    // Table
    this.position = this.add.text(100, 150, 'Position', {
      font: '20px monospace',
      fill: '#32a852',
    });

    this.name = this.add.text(320, 150, 'Player', {
      font: '20px monospace',
      fill: '#32a852',
    });

    this.score = this.add.text(530, 150, 'Score', {
      font: '20px monospace',
      fill: '#32a852',
    });

    this.playerScore = this.add.text(400, 350, player, {
      font: '25px monospace',
      fill: '#32a852',
      align: 'center',
    });
    this.playerScore.setOrigin(0.5, 0.5);

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