document.addEventListener('DOMContentLoaded', function(event) {

  document.getElementById('play-btn').addEventListener('click', function( event ) {
    const currentGame = new Game();
    currentGame.readSettingsForm(document.forms.settings);
    currentGame.createBoard();

    currentGame.board.addEventListener('click', function(evt) {
      currentGame.clickCard(evt);
    });

    document.getElementById('end-btn').addEventListener('click', function( event ) {
      currentGame.destroyBoard();
      currentGame.returnToWelcomeBoard();
    });

    document.getElementById('new-start-btn').addEventListener('click', function( event ) {
      currentGame.destroyScoreBoard();
      currentGame.returnToWelcomeBoard();
    });
  });

});
