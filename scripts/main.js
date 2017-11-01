document.addEventListener("DOMContentLoaded", function(event) {

  let submitBtn = document.getElementById('submit-settings');
  let currentGame;

  submitBtn.addEventListener('click', function( event ) {
    let settings = readSettingsForm(document.forms.settings);
    currentGame = new Game(settings.theme, settings.difficulty);
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



