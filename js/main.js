$(document).ready(function () {
  var game = window.game = {};

  game.renderBoard = function () {
    game.snakeHead = _.last(game.snake);
    if (game.snakeHead[0] < 0 || game.snakeHead[0] > 19 || game.snakeHead[1] < 0 || game.snakeHead[1] > 19 ) {
      game.initialize();
    }

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
    default:
      xDelta = 0;
      yDelta = 0;
      break;
    }

    if (game.direction) {
      game.snake.shift();
      game.snake.push([_.last(game.snake)[0] + yDelta, _.last(game.snake)[1] + xDelta]);
    }

    $('.square').removeClass('snake-spot');

    _.each(game.snake, function (spot) {
      $('.square[data-coord="[' + spot[0] + ', ' + spot[1] + ']"]').addClass('snake-spot');
    });
  };

  game.initialize = function () {
    game.board = [];
    game.snake = [[10, 10], [10, 11], [10, 12]];
    game.direction = null;
    $('#game-board').html("");

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
  };

  game.initialize();
  window.setInterval(function () {
      game.renderBoard();
    }, 75);
});