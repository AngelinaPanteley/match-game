class Game {
  constructor() {
    this.board = document.getElementById('game-board');
    this.openCount = 0;
    this.removeCount = 0;
    this.openedCards = [];
  }

  readSettingsForm(form) {
    const settings = {};
    const theme = form.elements.theme;
    const difficulty = form.elements.difficulty;

    theme.forEach(function(elem) {
      if(elem.checked)
        settings.theme = elem.id.slice(-1);
    });

    difficulty.forEach(function(elem) {
      if(elem.checked)
        settings.difficulty = elem.id.slice(-1);
    });

    this.theme = settings.theme;
    this.difficulty = [[5,2],[6,3],[8,3]][+settings.difficulty];
  }

  createBoard() {
    this.board.style.width = this.difficulty[0] * (150 + 10) + 20 + 'px';
    document.querySelector('.wrapper').style['min-width'] = this.difficulty[0] * (150 + 10) + 40 + 'px';
    this.board.classList.add('show', `theme${this.theme}`);
    document.querySelector('.timer-container').classList.add('show');
    document.querySelector('.end-btn').classList.add('show');
    document.querySelector('.welcome-board').classList.remove('show');
    let imageAmount = 8;

    if (this.theme === '2')
      imageAmount = 12;

    const cardArray = [];
    const cardAmount = this.difficulty[0] * this.difficulty[1];

    for (let i = 0; i < cardAmount / 2; i++) {
      let k = i;
      if (k >= imageAmount)
        k = i - imageAmount;
      cardArray.push(k,k);
    }

    this.shuffleArray(cardArray);

    for (let i = 0; i < cardAmount; i++) {
      this.board.innerHTML += `<div class="card"><figure class="front" ><img src="images/theme${this.theme}.jpg" alt="front-card"/></figure><figure class="back" ><img src="images/theme${this.theme}-${cardArray[i]}.jpg"alt="back-card"/></figure></div>`;
    }

    this.timer = new Timer(document.timer.stopwatch);
    this.timer.start();
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    [array[currentIndex],array[randomIndex]] = [array[randomIndex],array[currentIndex]];
    }

    return array;
  }

  clickCard(evt) {
    const card = evt.target.parentNode.parentNode;

    if (
      card.classList.contains('card')
      && !card.classList.contains('clicked')
      && this.openCount !== 2
    ) {
      this.openCount++;
      card.classList.add('clicked');
      this.openedCards.push(card);
      if (this.openCount === 2)
        this.tryMatch(this.openedCards);
    }
  }

  tryMatch() {
    const srcFirst = this.openedCards[0].querySelector('.back>img').src.slice(-6);
    const srcSecond = this.openedCards[1].querySelector('.back>img').src.slice(-6);

    if (srcFirst === srcSecond)
      setTimeout(this.removeCards.bind(this),700);
    else
      setTimeout(this.upendCards.bind(this),700);
  }

  removeCards() {
    this.openedCards[0].classList.add('transparent');
    this.openedCards[1].classList.add('transparent');
    this.openedCards = [];
    this.openCount = 0;
    this.removeCount += 2;

    if (this.removeCount === this.difficulty[0] * this.difficulty[1]) {
      this.destroyBoard();
      this.createScoreBoard();
    }
  }

  upendCards() {
    this.openedCards[0].classList.remove('clicked');
    this.openedCards[1].classList.remove('clicked');
    this.openedCards = [];
    this.openCount = 0;
  }

  createScoreBoard() {
    document.querySelector('.congrats-board').classList.add('show');
    document.querySelector('.wrapper').style['min-width'] = 'initial';
    document.querySelector('.new-start-btn').classList.add('show');
    document.getElementById('score-output').innerHTML = this.score;
  }

  destroyBoard() {
    this.timer.stop();
    this.score = this.timer.form.value;
    this.board.classList.remove('show', 'theme' + this.theme);
    this.board.innerHTML = '';
    document.querySelector('.end-btn').classList.remove('show');
    document.querySelector('.timer-container').classList.remove('show');
  }

  destroyScoreBoard() {
    document.querySelector('.congrats-board').classList.remove('show');
    document.querySelector('.new-start-btn').classList.remove('show');
  }

  returnToWelcomeBoard() {
    document.querySelector('.welcome-board').classList.add('show');
    document.querySelector('.wrapper').style['min-width'] = 'initial';
  }

}
