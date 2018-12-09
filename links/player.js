let player;

function Player(playerType, hp, mp, strength, speed, magic, shield, potion) {
    this.playerType = playerType;
    this.hp = hp;
    this.mp = mp;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.shield = shield;
    this.potion = potion

    this.attack = function () {
        const lastAction = document.querySelector('#last-action')
        const enemyHP = document.querySelector('#enemy-hp')
        if (enemy.shield === false) {
            enemy.hp -= 20;
        } else {
            enemy.hp -= 5;
            enemy.shield = false
        }
        enemyHP.style.width = enemy.hp + '%'

        lastAction.innerHTML = 'You attacked the enemy'
        Game.updateFight('enemy')
    };

    this.useShield = function () {
        const lastAction = document.querySelector('#last-action')
        if (this.shield === false) this.shield = !this.shield

        lastAction.innerHTML = 'You have used your shield'
        Game.updateFight('enemy')
    };

    this.useMagic = function () {
        const lastAction = document.querySelector('#last-action')
        const enemyHP = document.querySelector('#enemy-hp')
        const playerMP = document.querySelector('#player-mp')

        if (enemy.shield === false) {
            enemy.hp -= 30;
        } else {
            enemy.hp -= 10;
            enemy.shield = false
        }
        player.mp -= 25;

        enemyHP.style.width = enemy.hp + '%'
        playerMP.style.width = player.mp + '%'

        lastAction.innerHTML = 'You have used magic on the enemy'
        Game.updateFight('enemy')
    };

    this.usePotion = function () {
        const lastAction = document.querySelector('#last-action')
        const playerHP = document.querySelector('#player-hp')

        this.potion -= 1
        this.hp += 20

        playerHP.style.width = this.hp + '%'

        lastAction.innerHTML = `You used a potion, ${this.potion} left`
        Game.updateFight('enemy')
    }
}

