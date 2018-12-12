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

