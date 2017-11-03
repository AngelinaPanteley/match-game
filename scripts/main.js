document.addEventListener("DOMContentLoaded", function(event) {

  document.getElementById('play-btn').addEventListener('click', function( event ) {
    let settings = readSettingsForm(document.forms.settings);
    let currentGame = new Game(settings.theme, settings.difficulty);
    currentGame.createBoard();
    let timer = new Timer(document.timer.stopwatch);
    timer.start();

    currentGame.board.addEventListener('click', function(evt) {
      currentGame.clickCard(evt);
    });

    document.getElementById('end-btn').addEventListener('click', function( event ) {
      currentGame.destroyBoard();
      currentGame.returnToWelcomeBoard();
      timer.stop();
    });

    document.getElementById('new-start-btn').addEventListener('click', function( event ) {
      currentGame.destroyScoreBoard();
      currentGame.returnToWelcomeBoard();
    });
  });

});

function readSettingsForm(form) {
  let settings = {};
  let theme = form.elements.theme;
  let difficulty = form.elements.difficulty;
  theme.forEach(function(elem){
    if(elem.checked)
      settings.theme = elem.id.slice(-1);
  });
  difficulty.forEach(function(elem){
    if(elem.checked)
      settings.difficulty = elem.id.slice(-1);
  });
  return settings;
}



