let Cat = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

let Moon = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

let Game = function () {
    this.board = document.querySelectorAll('#board div');
    this.cat = new Cat;
    this.moon = new Moon;
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    }

    this.showCat = function () {
        this.board[this.index(this.cat.x, this.cat.y)].classList.add('cat');
    }

    this.hideVisibleCat = function () {
        document.querySelector('.cat').classList.remove('cat');
    }
    this.showMoon = function () {
        this.board[this.index(this.moon.x, this.moon.y)].classList.add('moon');
    }

    this.moveCat = function (x, y) {
        if (this.cat.direction === "right") {
            this.cat.x = this.cat.x + 1;
        } else if (this.cat.direction === "left") {
            this.cat.x = this.cat.x - 1;
        } else if (this.cat.direction === "up") {
            this.cat.y = this.cat.y - 1;
        } else if (this.cat.direction === "down") {
            this.cat.y = this.cat.y + 1;
        }
        this.gameOver();
        this.showCat();
        this.checkMoonCollision();
    }

    this.turnCat = function (event) {
        switch (event.which) {
            case 37:
                this.cat.direction = 'left';
                break;
            case 39:
                this.cat.direction = 'right';
                break;
            case 38:
                this.cat.direction = 'up';
                break;
            case 40:
                this.cat.direction = 'down';
        }
    }
    document.addEventListener('keydown', function (event) {
        self.turnCat(event);
    });

    this.checkMoonCollision = function () {
        if (this.cat.x == this.moon.x && this.cat.y == this.moon.y) {
            document.querySelector('.moon').classList.remove('moon');
            this.score++;
            document.querySelector('#score1').innerText = this.score;
            this.moon = new Moon();
            this.showMoon();
        }
    }

    this.gameOver = function () {
        if (this.cat.x < 0 || this.cat.x > 9 || this.cat.y < 0 || this.cat.y > 9) {
            document.querySelector('#over').classList.remove('invisible');
            document.querySelector('#score1').innerText = this.score;
            return clearInterval(this.idSetInterval);

        }
        this.hideVisibleCat();
    }

    let self = this;
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveCat();
        }, 250)

    }

    this.showCat();
    this.showMoon();
    this.startGame();

}
const game = new Game();