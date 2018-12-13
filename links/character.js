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

Character.prototype.doAnimation = function ({ xPos, xChange=0, yPos, yChange=0, height, heightChange=0, deg, degChange=0, totalTime, image, nextButton }) {
    let interval = setInterval(animationInterval, 10)
    let time = 0
    function animationInterval() {
        const imageElement = document.getElementById(image)
        const continueBtn = document.getElementById(nextButton) 

        imageElement.style.display = 'block'

        xPos += xChange
        yPos += yChange
        height += heightChange
        deg += degChange
        time += 1
    
        if (time >= totalTime) {
            imageElement.style.display = 'none'
            continueBtn.style.display = 'flex'

            clearInterval(interval)
        } else {
            imageElement.style.left = xPos + 'px'
            imageElement.style.top = yPos + 'px'
            imageElement.style.height = height + 'px'
            imageElement.style.transform = `rotate(${deg}deg)`
        }
    }
}

Character.prototype.playAudio = function (audioFile) {
    var audio = new Audio(audioFile);
    audio.play();
}

Character.prototype.attack = function (characterAttacked, hpElement, animatedObject) {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.getElementById(hpElement)

    if (characterAttacked.shield === false) {
        characterAttacked.hp -= this.strength;
    } else {
        characterAttacked.hp -= this.strength / 5;
        characterAttacked.shield = false
    }
    playerHP.style.width = characterAttacked.hp + '%'
    // animation and audio for attack function
    this.playAudio('links/audio/sword.mp3')
    this.doAnimation(Game.animatedObjectOptions[animatedObject])

    lastAction.innerHTML = `${this.characterName} has attacked ${characterAttacked.characterName}`
    Game.updateFight(characterAttacked)
}
// attack function
Character.prototype.useMagic = function (characterAttacked, attackedHP, attackingMP, animationObject) {
    const lastAction = document.querySelector('#last-action')
    const enemyHP = document.getElementById(attackedHP)
    const playerMP = document.getElementById(attackingMP)

    if (this.mp >= 25) {
        if (characterAttacked.shield === false) {
            characterAttacked.hp -= 1000 / characterAttacked.speed;
        } else {
            characterAttacked.hp -= 250 / characterAttacked.speed;
            characterAttacked.shield = false
        }
        this.mp -= 25;
        // this animates the magic action
        this.playAudio('links/audio/magicSound.mp3')
        this.doAnimation(Game.animatedObjectOptions[animationObject])
        // updates mp and hp
        lastAction.innerHTML = `${this.characterName} used magic on ${characterAttacked.characterName}`
        enemyHP.style.width = characterAttacked.hp + '%'
        playerMP.style.width = this.mp + '%'

        Game.updateFight(characterAttacked)
    } else {
        lastAction.innerHTML = 'You do not have enough mp to use magic'
    }
}

Character.prototype.useShield = function (nextPlayer, animatedObject) {
    const lastAction = document.querySelector('#last-action')
    if (this.shield === false) {
        this.shield = !this.shield
        this.doAnimation(Game.animatedObjectOptions[animatedObject])
        lastAction.innerHTML = `${this.characterName} shielded`
    } else {
        lastAction.innerHTML = 'You are already shielded'
        return
    }
    Game.updateFight(nextPlayer)
}

Character.prototype.usePotion = function (nextCharacter, hpElement, animatedObject) {
    const lastAction = document.querySelector('#last-action')
    const playerHP = document.getElementById(hpElement)
    let healAmt
    // only works if the player has enough potion and hp
    if (this.potion > 0) {
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
        this.doAnimation(Game.animatedObjectOptions[animatedObject])

        this.potion -= 1
        this.hp += healAmt
        playerHP.style.width = this.hp + '%'

        lastAction.innerHTML = `${this.characterName} used a potion, ${this.potion} left`
        Game.updateFight(nextCharacter)
    } else {
        lastAction.innerHTML = 'You do not have any more potions'
    }
};

