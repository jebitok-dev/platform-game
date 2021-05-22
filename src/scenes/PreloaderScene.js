import Phaser from 'phaser';
import play from '../assets/play.png';
import credits from '../assets/credits.png';
import how2playbtn from '../assets/how2playbtn.png';
import success from '../assets/success.png';
import star from '../assets/star.png';
/* eslint-disable*/
import blue from '../assets/blue.png'
import bomb from '../assets/bomb.png';
import dud from '../assets/purpul-dud.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 1) {
      this.scene.start('Title');
    }
  }

  preload() {
    // load assets needed in our game
    this.load.image('blue', blue);
    this.load.image('success', success);
    this.load.image('star', star);
    this.load.image('bomb', bomb);
    this.load.spritesheet('dud', dud, { frameWidth: 32, frameHeight: 48 });

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timeEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('play', play);
    this.load.image('how2playbtn', how2playbtn);
    this.load.image('credits', credits);
  }
}