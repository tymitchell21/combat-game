let player;
// player object
function Player({ characterName, strength, speed, magic }, imageElement, prefightNameElement) {
    Character.call(this, { characterName, strength, speed, magic }, imageElement, prefightNameElement)
}

Player.prototype = Object.create(Character.prototype)
Player.prototype.constructor = Player;

Player.prototype.attack = function () {
    const lastAction = document.querySelector('#last-action')
    const enemyHP = document.querySelector('#enemy-hp')

    if (enemy.shield === false) {
        enemy.hp -= this.strength;
    } else {
        enemy.hp -= this.strength / 5;
        enemy.shield = false
    }

    this.playAudio('links/audio/sword.mp3')
    this.doAnimation(Game.animatedObjectOptions['PlayerAttack'])
    
    enemyHP.style.width = enemy.hp + '%'

    lastAction.innerHTML = 'You attacked the enemy'
    Game.updateFight('enemy')
};

Player.prototype.useShield = function () {
    const lastAction = document.querySelector('#last-action')
    if (this.shield === false) {
        this.shield = !this.shield
        this.doAnimation(Game.animatedObjectOptions['PlayerShield'])
        lastAction.innerHTML = 'You have used your shield'
    } else {
        lastAction.innerHTML = 'You are already shielded'
        return
    }

    Game.updateFight('enemy')
};
// function for the magic action
Player.prototype.useMagic = function () {
    const lastAction = document.querySelector('#last-action')
    const enemyHP = document.querySelector('#enemy-hp')
    const playerMP = document.querySelector('#player-mp')
    // only does anything if the player has enoug mp
    if (this.mp >= 25) {
        if (enemy.shield === false) {
            enemy.hp -= 1000 / enemy.speed;
        } else {
            enemy.hp -= 250 / enemy.speed;
            enemy.shield = false
        }
        player.mp -= 25;
        // this animates the magic action
        this.playAudio('links/audio/magicSound.mp3')
        this.doAnimation(Game.animatedObjectOptions['PlayerMagic'])
        // updates mp and hp
        lastAction.innerHTML = 'You have used magic on the enemy'
        enemyHP.style.width = enemy.hp + '%'
        playerMP.style.width = player.mp + '%'

        Game.updateFight('enemy')
    } else {
        lastAction.innerHTML = 'You do not have enough mp to use magic'
    }
};
// function for the using a potion
Player.prototype.usePotion = function () {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.querySelector('#player-hp')
    let healAmt
    // only works if the player has enough potion and hp
    if (this.potion == 0) {
        lastAction.innerHTML = 'You do not have any more potions'
    } else {
        if (this.hp >= 100) {
            lastAction.innerHTML = 'You already have full health'
            return
        }
        else if (this.hp > 70) {
            healAmt = 100 - this.hp
        } else {
            healAmt = 30
        }
        // animates the use potion
        this.doAnimation(Game.animatedObjectOptions['PlayerPotion'])

        this.potion -= 1
        this.hp += healAmt
        playerHP.style.width = this.hp + '%'

        lastAction.innerHTML = `You used a potion, ${this.potion} left`
        Game.updateFight('enemy')
    }
};