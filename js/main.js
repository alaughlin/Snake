$(document).ready(function () {
  var game = window.game = {};
  game.board = [];
  game.snake = [[10, 10], [10, 11], [10, 12]];
  game.direction = 39;

  game.renderBoard = function () {
    var xDelta;
    var yDelta;
    
    switch(game.direction) {
    case 37:
      xDelta = -1;
      yDelta = 0;
      break;
    case 38:
      xDelta = 0;
      yDelta = -1;
      break;
    case 39:
      xDelta = 1;
      yDelta = 0;
      break;
    case 40:
      xDelta = 0;
      yDelta = 1;
      break;
    }

    game.snake.shift();
    game.snake.push([_.last(game.snake)[0] + yDelta, _.last(game.snake)[1] + xDelta])
    $('.square').removeClass('snake-spot');

    _.each(game.snake, function (spot) {
      $('.square[data-coord="[' + spot[0] + ', ' + spot[1] + ']"]').addClass('snake-spot');
    });
  };

  game.initialize = function () {
    for (var i = 0; i < 20; i++) {
      game.board.push([]);
      for (var j = 0; j < 20; j++) {
        game.board[i][j] = null;
        $('#game-board').append('<div class="square" data-coord="[' + i + ', ' + j + ']"></div>');
      }
    }

    Mousetrap.bind(['left', 'up', 'right', 'down'], function (event) {
      game.direction = event.keyCode;
      return false;
    });

    window.setInterval(function () {
      game.renderBoard();
    }, 100);
  };

  game.initialize();
});