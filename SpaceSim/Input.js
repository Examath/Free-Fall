var KeyboardInputManager = {
    KeyPressed: false,
    Start: function () {
        window.addEventListener("keydown", function (e) {
            KeyboardInputManager.KeyPressed = e.keyCode;
        })
        window.addEventListener("keyup", function (e) {
            KeyboardInputManager.KeyPressed = false;
        })
    }
}

var MouseInputManager = {
    MouseDown: false,
    MouseTarget: "",
    MouseDelta: {
        X: 0,
        Y: 0,
    },
    Start: function () {
        window.addEventListener("mousedown", function (e) {
            MouseInputManager.MouseDown = true;
            MouseInputManager.MouseTarget = e.target.id;
        })
        window.addEventListener("mouseup", function (e) {
            MouseInputManager.MouseDown = false;
        })
        window.addEventListener("mousemove", function (e) {
            if (MouseInputManager.MouseDown) {
                MouseInputManager.MouseDelta.X = e.movementX;
                MouseInputManager.MouseDelta.Y = e.movementY;
            }
        })
    }
}

// class MouseController {
//     constructor(Root /*:HTMLCanvasElement*/) {
//         this.MouseDown = false;
//         Root.addEventListener('mousedown', function (e) {
//             this.MouseDown = true;
//         })
//         Root.addEventListener('mouseup', function (e) {
//             this.MouseDown = false;
//         })     
//     }
// }

KeyboardInputManager.Start();
MouseInputManager.Start();

class KeyControllerForce {
    constructor(power = 1) {
        this.Power = power;
    }
    Get() {
        switch (KeyboardInputManager.KeyPressed) {
            case 37: //Left
                return new Vector(-this.Power, 0);
                break;
            case 38: //Up
                return new Vector(0, this.Power);
                break;
            case 39: //Right
                return new Vector(this.Power, 0);
                break;
            case 40: //Down
                return new Vector(0, -this.Power);
                break;
            default:
                break;
        }
    }
}