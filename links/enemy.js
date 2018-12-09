let enemy;

function Enemy(enemyType, hp, mp, strength, speed, magic, shield, potion) {
    this.enemyType = enemyType;
    this.hp = hp;
    this.mp = mp;
    this.strength = strength;
    this.speed = speed;
    this.magic = magic;
    this.shield = shield;
    this.potion = potion;

    this.actionChoice = function () {
        let random
        if (parseInt(this.potion) > 0) {
            random = Math.floor(Math.random() * Math.floor(10));
            console.log(random)
        } else {
            random = Math.floor(Math.random() * Math.floor(7));
        }

        if (this.hp >= 50) {
            switch (random) {
                case 0:
                    this.attack()
                    break;
                case 1:
                    this.attack()
                    break;
                case 2:
                    this.attack()
                    break;
                case 3:
                    this.attack()
                    break;
                case 4:
                    this.useMagic()
                    break;
                case 5:
                    this.useMagic()
                    break;
                case 6:
                    this.useMagic()
                    break;
                case 7:
                    this.useShield()
                    break;
                case 8:
                    this.useShield()
                    break;
                case 9:
                    this.usePotion()
                    break;
                default:
                    this.attack()
            }
        }
        else {
            switch (random) {
                case 0:
                    this.attack()
                    break;
                case 1:
                    this.attack()
                    break;
                case 2:
                    this.useMagic()
                    break;
                case 3:
                    this.useMagic()
                    break;
                case 4:
                    this.useShield()
                    break;
                case 5:
                    this.useShield()
                    break;
                case 6:
                    this.useShield()
                    break;
                case 7:
                    this.usePotion()
                    break;
                case 8:
                    this.usePotion()
                    break;
                case 9:
                    this.usePotion()
                    break;
                default:
                    this.attack()
            }
        }
        const continueBtn = document.querySelector('#continue')
        continueBtn.style.display = 'none'
    };

    this.attack = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const playerHP = document.querySelector('#player-hp')

        if (player.shield === false) {
            player.hp -= 20;
        } else {
            player.hp -= 5;
            player.shield = false
        }
        playerHP.style.width = player.hp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has attacked you'
        Game.updateFight('player')
    };

    this.useMagic = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const playerHP = document.querySelector('#player-hp')
        const enemyMP = document.querySelector('#enemy-mp')

        if (player.shield === false) {
            player.hp -= 30;
        } else {
            player.hp -= 10;
            player.shield = false
        }
        this.mp -= 25;

        playerHP.style.width = player.hp + '%'
        enemyMP.style.width = this.mp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has used magic on you'
        Game.updateFight('player')
    };

    this.useShield = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        if (this.shield === false) this.shield = !this.shield

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = 'The enemy has shielded'
        Game.updateFight('player')
    };

    this.usePotion = function () {
        const lastAction = document.querySelector('#last-action')
        const fightMenu = document.querySelector('#fight-menu')
        const enemyHP = document.querySelector('#enemy-hp')

        this.potion -= 1
        this.hp += 20

        enemyHP.style.width = this.hp + '%'

        fightMenu.style.display = 'flex'
        lastAction.innerHTML = `The enemy has used a potion, ${this.potion} left`
        Game.updateFight('player')
    };
}