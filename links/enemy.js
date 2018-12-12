let enemy;

function Enemy({ characterName, strength, speed, magic }, imageElement, prefightNameElement) {
    Character.call(this, { characterName, strength, speed, magic }, imageElement, prefightNameElement)
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy


// randomly chooses an action for the enemy
Enemy.prototype.chooseAction = function () {
    const choices = ['attack', 'attack', 'attack', 'attack', 'tryMagic', 'tryMagic', 'tryMagic', 'goDefensive', 'goDefensive', 'tryPotion']
    const choicesUnder50HP = ['attack', 'attack', 'tryMagic', 'tryMagic', 'goDefensive', 'goDefensive', 'goDefensive', 'tryPotion', 'tryPotion', 'tryPotion']
    // only chooses actions 0-2 if enemy is out of potions
    const randomChoice = parseInt(this.potion) <= 0
        ? Game.getRandomNumber(7)
        : Game.getRandomNumber(10)

    // puts enemy on defensive when health is below 50
    const resolvedChoice = this.hp >= 50
        ? choices[randomChoice]
        : choicesUnder50HP[randomChoice]

    const resolvedAction = {
        attack: () => this.attack(),
        tryMagic: () => this.mp >= 25 ? this.useMagic() : this.attack(),
        goDefensive: () => this.shield == false ? this.useShield() : this.attack(),
        tryPotion: () => this.hp < 100 ? this.usePotion() : this.attack(),
    }[resolvedChoice]

    resolvedAction()

    // gets rid of continue button
    const continueBtn = document.querySelector('#continue')
    continueBtn.style.display = 'none'
};

// attack function for enemy
Enemy.prototype.attack = function () {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.querySelector('#player-hp')

    if (player.shield === false) {
        player.hp -= this.strength;
    } else {
        player.hp -= this.strength / 5;
        player.shield = false
    }

    playerHP.style.width = player.hp + '%'
    // animation and audio for attack function
    this.playAudio('links/audio/sword.mp3')
    this.doAnimation(Game.animatedObjectOptions['EnemyAttack'])

    lastAction.innerHTML = 'The enemy has attacked you'
    Game.updateFight('player')
};
// function for enemies magic attack
Enemy.prototype.useMagic = function () {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.querySelector('#player-hp')
    const enemyMP = document.querySelector('#enemy-mp')

    if (player.shield === false) {
        player.hp -= 1000 / player.speed;
    } else {
        player.hp -= 250 / player.speed;
        player.shield = false
    }
    this.mp -= 25;

    playerHP.style.width = player.hp + '%'
    enemyMP.style.width = this.mp + '%'
    // animation for using magic
    this.playAudio('links/audio/magicSound.mp3')
    this.doAnimation(Game.animatedObjectOptions['EnemyMagic'])

    lastAction.innerHTML = 'The enemy has used magic on you'
    Game.updateFight('player')
};
// enemies use shield function
Enemy.prototype.useShield = function () {
    const lastAction = document.querySelector('#last-action')
    if (this.shield === false) this.shield = !this.shield
    // animation for enemy using shield
    this.doAnimation(Game.animatedObjectOptions['EnemyShield'])

    lastAction.innerHTML = 'The enemy has shielded'
    Game.updateFight('player')
};
// function for enemy's use potion action
Enemy.prototype.usePotion = function () {
    const lastAction = document.querySelector('#last-action')
    const enemyHP = document.querySelector('#enemy-hp')
    let healAmt

    if (this.hp > 70) {
        healAmt = 100 - this.hp
    } else {
        healAmt = 30
    }
    // animation for using potion
    this.doAnimation(Game.animatedObjectOptions['EnemyPotion'])

    this.potion -= 1
    this.hp += healAmt

    enemyHP.style.width = this.hp + '%'

    lastAction.innerHTML = `The enemy has used a potion, ${this.potion} left`
    Game.updateFight('player')
};
