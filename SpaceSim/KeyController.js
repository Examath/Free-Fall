var KeyController = {
    KeyPressed: false,
    Start: function () {
        window.addEventListener('keydown', function (e) {
            this.KeyController.KeyPressed = e.keyCode;
          })
        window.addEventListener('keyup', function (e) {
            this.KeyController.KeyPressed = false;
        })
    }
}

// $(function () {
//     KeyController.Start();
// })

class KeyControllerForce {
    Get () {
        switch (KeyController.KeyPressed) {
            case 37: //Left
                return new Vector(-1,0);
                break;
            case 38: //Up
                return new Vector(0,1);
                break;
            case 39: //Right
                return new Vector(1,0);
                break;
            case 40: //Down
                return new Vector(0,-1);
                break;        
            default:
                break;
        }
    }
}