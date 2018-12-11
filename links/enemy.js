let enemy;

function Enemy(enemyType, hp, mp, strength, speed, magic, shield, potion) {
    Character.call(this, enemyType, hp, mp, strength, speed, magic, shield, potion)
}
// randomly chooses an action for the enemy
Enemy.prototype.actionChoice = function () {
    let choice = [0,0,0,0,1,1,1,2,2,3]
    let choiceUnder50HP = [0,0,1,1,2,2,2,3,3,3]
    let random
    let action
    // only chooses actions 0-2 if enemy is out of potions
    if (parseInt(this.potion) <= 0) {
        random = Math.floor(Math.random() * Math.floor(7));
    } else {
        random = Math.floor(Math.random() * Math.floor(10));
    }
    // puts enemy on defensive when health is below 50
    if (this.hp >= 50) {
        action = choice[random]
    } else {
        action = choiceUnder50HP[random]
    }
    // switch case to determine action from random number
    switch (action) {
        case 0:
            this.attack()
            break;
        case 1:
            if (this.mp >= 25) {
                this.useMagic()
            } else {
                this.attack()
            }
            break;
        case 2:
            if (this.shield == false) {
                this.useShield()
            } else {
                this.attack()
            }
            break;
        case 3:
            if (this.hp < 100) {
                this.usePotion()
            } else {
                this.attack()
            }
            break;
        default:
            this.attack()
            break;
    }
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
        player.hp -= this.strength/5;
        player.shield = false
    }
    playerHP.style.width = player.hp + '%'
    // animation for attack function
    myVar = setInterval(weaponFlip, 10)
    let deg = 100;
    let x = 1000;
    var audio = new Audio('links/audio/sword.mp3');
    audio.play();
    function weaponFlip () {
        const weapon = document.querySelector('#enemy-weapon')
        weapon.style.display = 'block'
        deg-=11
        x-=5
        if (x <= 400) {
            const fightMenu = document.querySelector('#fight-menu')
            fightMenu.style.display = 'flex'
            clearInterval(myVar)
            weapon.style.display = 'none'
        }
        weapon.style.left = x + 'px'
        weapon.style.transform = `rotate(${deg}deg)`
    }

    lastAction.innerHTML = 'The enemy has attacked you'
    Game.updateFight('player')
};
// function for enemies magic attack
Enemy.prototype.useMagic = function () {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.querySelector('#player-hp')
    const enemyMP = document.querySelector('#enemy-mp')

    if (player.shield === false) {
        player.hp -= 1000/player.speed;
    } else {
        player.hp -= 250/player.speed;
        player.shield = false
    }
    this.mp -= 25;

    playerHP.style.width = player.hp + '%'
    enemyMP.style.width = this.mp + '%'
    // animation for using magic
    myVar = setInterval(magicFly, 10)
    let height = 35;
    let x = 1040;
    let y = 425;
    var audio = new Audio('links/audio/magicSound.mp3');
    audio.play();
    function magicFly () {
        const magicBall = document.querySelector('#enemy-magic')
        magicBall.style.display = 'block'
        height+=3
        x-=10
        y-=1.5
        if (x <= 200) {
            const fightMenu = document.querySelector('#fight-menu')
            fightMenu.style.display = 'flex'
            clearInterval(myVar)
            magicBall.style.display = 'none'
        }
        magicBall.style.left = x + 'px'
        magicBall.style.top = y + 'px'
        magicBall.style.height = height + 'px'
    }

    lastAction.innerHTML = 'The enemy has used magic on you'
    Game.updateFight('player')
};
// enemies use shield function
Enemy.prototype.useShield = function () {
    const lastAction = document.querySelector('#last-action')
    if (this.shield === false) this.shield = !this.shield
    // animation for enemy using shield
    myVar = setInterval(showShield, 10)
    let shieldTime = 0;
    function showShield () {
        const shieldImage = document.querySelector('#enemy-shield')
        shieldImage.style.display = 'block'
        shieldTime+=1
        if (shieldTime >= 100) {
            const fightMenu = document.querySelector('#fight-menu')
            fightMenu.style.display = 'flex'
            clearInterval(myVar)
            shieldImage.style.display = 'none'
        }
    }

    lastAction.innerHTML = 'The enemy has shielded'
    Game.updateFight('player')
};
// function for enemy's use potion action
Enemy.prototype.usePotion = function () {
    const lastAction = document.querySelector('#last-action')
    const enemyHP = document.querySelector('#enemy-hp')
    let healAmt

    if (this.hp > 70) {
        healAmt = 100-this.hp
    } else {
        healAmt = 30
    }
    // animation for using potion
    myVar = setInterval(potionSpill, 10)
    let deg = 0;
    function potionSpill () {
        const potionBottle = document.querySelector('#enemy-potion')
        potionBottle.style.display = 'block'
        deg-=1
        if (deg <= -150) {
            const fightMenu = document.querySelector('#fight-menu')
            fightMenu.style.display = 'flex'
            clearInterval(myVar)
            potionBottle.style.display = 'none'
        }
        potionBottle.style.transform = `rotate(${deg}deg)`
    }

    this.potion -= 1
    this.hp += healAmt

    enemyHP.style.width = this.hp + '%'

    lastAction.innerHTML = `The enemy has used a potion, ${this.potion} left`
    Game.updateFight('player')
};