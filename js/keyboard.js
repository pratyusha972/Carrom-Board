window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  T: 84,
  SPACE: 32,
  U: 85,
  P: 80,
  E: 69,
  SPACE: 32,
  LEFT:37,
  RIGHT:39,
  Up:38,
  Down:40,
  Enter:13,
  I: 73,
  C: 67,  
		
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


