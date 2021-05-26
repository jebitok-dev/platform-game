import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1400,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};