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
        attack: () => this.attack(player, 'player-hp', 'EnemyAttack'),
        tryMagic: () => this.mp >= 25 
            ? this.useMagic(player, 'player-hp', 'enemy-mp', 'EnemyMagic') 
            : this.attack(player, 'player-hp', 'EnemyAttack'),
        goDefensive: () => this.shield == false 
            ? this.useShield(player, 'EnemyShield') 
            : this.attack(player, 'player-hp', 'EnemyAttack'),
        tryPotion: () => this.hp < 100 
            ? this.usePotion(player, 'enemy-hp', 'EnemyPotion')
            : this.attack(player, 'player-hp', 'EnemyAttack'),
    }[resolvedChoice]

    resolvedAction()

    // gets rid of continue button
    const continueBtn = document.querySelector('#continue')
    continueBtn.style.display = 'none'
};

document.querySelector('#continue').addEventListener('click', () => {
    enemy.chooseAction()
})
