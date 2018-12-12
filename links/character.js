function Character({ characterName, strength, speed, magic, potion = 3 }, imageElement, prefightNameElement) {
    this.characterName = characterName;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.potion = potion;
    this.imageElement = imageElement
    this.prefightNameElement = prefightNameElement
    this.hp = 100;
    this.mp = 100;
    this.shield = false;

    this.setupElements()
}

Character.prototype.setupElements = function () {
    this.imageElement.id = this.characterName.toLowerCase()
    this.imageElement.src = `links/img/${this.imageElement.id}.png`
    this.prefightNameElement.innerHTML = this.characterName
}

