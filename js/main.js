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

  game.checkIfEatsApple = function () {
    if (game.apple.toString() === game.snakeHead.toString()) {
      $(game.board[game.apple[0]][game.apple[1]]).removeClass('apple-spot');
      game.addToSnake(game.apple);
      game.apple = game.newApple();
    }
  };

  game.newApple = function () {
    var snake = _.map(game.snake, function (spot) { return String(spot) });
    var newApple = [_.random(0, 19), _.random(0, 19)];
    while (_.contains(snake, String(newApple))) {
      newApple = [_.random(0, 19), _.random(0, 19)];
    }

    return newApple;
  };

  game.checkIfCollision = function () {
    // out of bounds?
    if (game.snakeHead[0] < 0 || game.snakeHead[0] > 19 || game.snakeHead[1] < 0 || game.snakeHead[1] > 19 ) {
      game.initialize();
    }

    // did we collide with ourself?
    var body = _.map(game.snakeBody, function (spot) { return String(spot) });
    if (_.contains(body, String(game.snakeHead))) {
      console.log("fired");
      game.initialize();
    }
  };

  game.render = function () {
    $('.square').removeClass('snake-spot');

    _.each(game.snake, function (spot) {
      $(game.board[spot[0]][spot[1]]).addClass('snake-spot');
    });

    $(game.board[game.apple[0]][game.apple[1]]).addClass('apple-spot');

    $('#score').html(game.snake.length - 1);
  };

  game.tick = function () {
    game.snakeHead = _.last(game.snake);
    game.snakeBody = game.snake.slice(0, game.snake.length - 1);

    game.moveSnake();
    game.checkIfEatsApple();
    game.checkIfCollision();
    game.render();
  };

  game.initialize = function () {
    game.board = [];
    game.snake = [[10, 10]];
    game.apple = game.newApple();
    game.moving = false;
    game.direction = null;
    // we need to wipe the board when a reset happens
    $('#game-board').html("");

    // make board array and draw it
    for (var i = 0; i < 20; i++) {
      game.board.push([]);
      for (var j = 0; j < 20; j++) {
        game.board[i][j] = $('<div class="square"></div>');
        $('#game-board').append(game.board[i][j]);
      }
    }

    Mousetrap.bind(['left', 'up', 'right', 'down'], function (event) {
      if (game.moving === false) { game.moving = true };
      game.changeDirection(event.keyCode);
      return false;
    });
  };

  game.initialize();

  window.setInterval(function () {
    game.tick();
  }, 75);
});
