$(document).ready(function () {
  var game = window.game = {};

  game.changeDirection = function (keyCode) {
    switch(keyCode) {
    case 37:
      if (game.direction != 39) { game.direction = "left" }
      break;
    case 39:
      if (game.direction != 37) { game.direction = "right" }
      break;
    case 38:
      if (game.direction != 40) { game.direction = "up" }
      break;
    case 40:
      if (game.direction != 38) { game.direction = "down" }
      break;
    }
  };

  game.applyDeltas = function () {
    var xDelta;
    var yDelta;
    
    switch(game.direction) {
    case "left":
      xDelta = -1;
      yDelta = 0;
      break;
    case "up":
      xDelta = 0;
      yDelta = -1;
      break;
    case "right":
      xDelta = 1;
      yDelta = 0;
      break;
    case "down":
      xDelta = 0;
      yDelta = 1;
      break;
    default:
      xDelta = 0;
      yDelta = 0;
      break;
    }

    return [xDelta, yDelta];
  };

  game.moveSnake = function () {
    game.snake.shift();
    game.snake.push([_.last(game.snake)[0] + game.applyDeltas()[1], _.last(game.snake)[1] + game.applyDeltas()[0]]);
  };

  game.renderBoard = function () {
    game.snakeHead = _.last(game.snake);

    // reset if out-of-bounds
    if (game.snakeHead[0] < 0 || game.snakeHead[0] > 19 || game.snakeHead[1] < 0 || game.snakeHead[1] > 19 ) {
      game.initialize();
    }

    if (game.moving) {
      game.moveSnake();
    }

    // wipe squares and redraw
    $('.square').removeClass('snake-spot');

    _.each(game.snake, function (spot) {
      $('.square[data-coord="[' + spot[0] + ', ' + spot[1] + ']"]').addClass('snake-spot');
    });
  };

  game.initialize = function () {
    game.board = [];
    game.snake = [[10, 10], [10, 11], [10, 12]];
    game.moving = false;
    game.direction = "right";
    // we need to wipe the board when a reset happens
    $('#game-board').html("");

    // make board array and draw it
    for (var i = 0; i < 20; i++) {
      game.board.push([]);
      for (var j = 0; j < 20; j++) {
        game.board[i][j] = null;
        $('#game-board').append('<div class="square" data-coord="[' + i + ', ' + j + ']"></div>');
      }
    }

    Mousetrap.bind(['left', 'up', 'right', 'down'], function (event) {
      game.moving = true;
      game.changeDirection(event.keyCode);
      return false;
    });
  };

  game.initialize();
  window.setInterval(function () {
    game.renderBoard();
  }, 75);
});