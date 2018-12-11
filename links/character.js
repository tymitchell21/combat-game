function Character(playerType, hp, mp, strength, speed, magic, shield, potion) {
    this.playerType = playerType;
    this.hp = hp;
    this.mp = mp;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.shield = shield;
    this.potion = potion;
}

Character.prototype.hey = function () {
    console.log('hey')
}