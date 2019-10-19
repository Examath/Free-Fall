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
    constructor(power = 1) {
        this.Power = power;
    }
    Get () {
        switch (KeyController.KeyPressed) {
            case 37: //Left
                return new Vector(-this.Power,0);
                break;
            case 38: //Up
                return new Vector(0,this.Power);
                break;
            case 39: //Right
                return new Vector(this.Power,0);
                break;
            case 40: //Down
                return new Vector(0,-this.Power);
                break;        
            default:
                break;
        }
    }
}

// class NavigationTransform {
//     constructor (element) {
//         this.deltaX = 0;
//         this.deltaY = 0;
//         window.addEventListener('mousemove', function (e) {
//             e.movementX
//         }
//     }
//     DeltaX () {
//         var x = this.deltaX;
//         this.deltaX = 0
//     }
// }

