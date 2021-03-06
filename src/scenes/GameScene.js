import Phaser from 'phaser';
import LocalStorage from '../js/localStorage';

let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;
let bombs;
let gameOver = false;

const collectStar = (player, star) => {
  star.disableBody(true, true);

  score += 10000;
  scoreText.setText(`Score: ${score}`);

  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });

    const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bombed = bombs.create(x, 16, 'bomb');
    bombed.setBounce(1);
    bombed.setCollideWorldBounds(true);
    bombed.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
};
/* eslint-disable*/
const hitBomb = (player, bombed) => {
  player.setTint(0xf00);
  player.anims.play('turn');
  gameOver = true;
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // this.add.image(400, 300, 'blue');

    // Platforms
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'success').setScale(2).refreshBody();

    platforms.create(750, 470, 'success');
    platforms.create(0, 200, 'success').setScale(0.4).refreshBody();
    platforms.create(170, 100, 'success').setScale(0.1).refreshBody();
    platforms.create(450, 390, 'success').setScale(0.3).refreshBody();
    platforms.create(750, 130, 'success').setScale(0.5).refreshBody();
    platforms.create(200, 320, 'success').setScale(0.5).refreshBody();
    platforms.create(500, 200, 'success').setScale(0.2).refreshBody();
    platforms.create(200, 230, 'success').setScale(0.2).refreshBody();
    platforms.create(330, 160, 'success').setScale(0.2).refreshBody();

    // Player
    player = this.physics.add.sprite(100, 450, 'dud');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);

    // Anims
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dud', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dud', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dud', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Stars
    stars = this.physics.add.group({
      key: 'star',
      repeat: 15,
      setXY: { x: 12, y: 0, stepX: 50 },
    });
    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    // Score
    scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#32a852',
    });

    // Bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
  }

  update() {
    // Cursors
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-350);
    }
    if (gameOver) {
      this.physics.pause();
      this.scene.stop('Game');
      this.scene.start('GameOver');
      LocalStorage.saveScore(score);
      gameOver = false;
      score = 0;
    }
  }
}