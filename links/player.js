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

        if (this.mp >= 25) {
            if (enemy.shield === false) {
                enemy.hp -= 30;
            } else {
                enemy.hp -= 10;
                enemy.shield = false
            }
            player.mp -= 25;

            lastAction.innerHTML = 'You have used magic on the enemy'
            enemyHP.style.width = enemy.hp + '%'
            playerMP.style.width = player.mp + '%'

            Game.updateFight('enemy')   
        } else {
            lastAction.innerHTML = 'You do not have enough mp to use magic'
        }
    };

    this.usePotion = function () {
        const lastAction = document.querySelector('#last-action')
        const playerHP = document.querySelector('#player-hp')
        let healAmt

        if (this.potion == 0) {
            lastAction.innerHTML = 'You do not have any more potions'
        } else {
            if (this.hp >= 100) {
                lastAction.innerHTML = 'You already have full health'
                return
            }
            else if (this.hp > 80) {
                healAmt = 100-this.hp
            } else {
                healAmt = 20
            }

            this.potion -= 1
            this.hp += healAmt

            playerHP.style.width = this.hp + '%'

            lastAction.innerHTML = `You used a potion, ${this.potion} left`
            Game.updateFight('enemy')
        }
    }
}

