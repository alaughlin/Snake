$(document).ready(function () {
  var game = window.game = {};

  game.changeDirection = function (keyCode) {
    switch(keyCode) {
    case 37:
      if (game.direction != "right") { game.direction = "left" }
      break;
    case 39:
      if (game.direction != "left") { game.direction = "right" }
      break;
    case 38:
      if (game.direction != "down") { game.direction = "up" }
      break;
    case 40:
      if (game.direction != "up") { game.direction = "down" }
      break;
    }
  };

  game.getDeltas = function () {
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
    if (game.moving) {
      game.snake.push([_.last(game.snake)[0] + game.getDeltas()[1], _.last(game.snake)[1] + game.getDeltas()[0]]);
      game.snake.shift();
    }
  };

  game.addToSnake = function (apple) {
    game.snake.unshift(apple);
  };

  game.renderBoard = function () {
    game.snakeHead = _.last(game.snake);

    // check if snake eats apple
    _.each(game.apples, function (apple) {
      if (apple.toString() === game.snakeHead.toString()) {
        game.apples = _.reject(game.apples, function (spot) { return apple === spot});
        $('.square[data-coord="[' + apple[0] + ', ' + apple[1] + ']"]').removeClass('apple-spot');
        game.addToSnake(apple);
      }
    });

    // reset if out-of-bounds
    if (game.snakeHead[0] < 0 || game.snakeHead[0] > 19 || game.snakeHead[1] < 0 || game.snakeHead[1] > 19 ) {
      game.initialize();
    }

    // wipe squares and redraw
    $('.square').removeClass('snake-spot');

    _.each(game.snake, function (spot) {
      $('.square[data-coord="[' + spot[0] + ', ' + spot[1] + ']"]').addClass('snake-spot');
    });

    _.each(game.apples, function (spot) {
      $('.square[data-coord="[' + spot[0] + ', ' + spot[1] + ']"]').addClass('apple-spot');
    });

    // update score
    $('#score').html(game.snake.length);
  };

  game.initialize = function () {
    game.board = [];
    game.snake = [[10, 10]];
    game.apples = [];
    game.moving = false;
    game.direction = null;
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

    game.apples = [[10, 12], [0, 0], [5, 5]];

    Mousetrap.bind(['left', 'up', 'right', 'down'], function (event) {
      if (game.moving === false) { game.moving = true };
      game.changeDirection(event.keyCode);
      return false;
    });
  };

  game.initialize();
  window.setInterval(function () {
    game.moveSnake();
    game.renderBoard();
  }, 75);
});