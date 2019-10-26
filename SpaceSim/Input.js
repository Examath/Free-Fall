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
    MouseClickTarget: "",
    MouseMoveTarget: "",
    MouseClickPosition: {
        X: 0,
        Y: 0,
    },
    MouseDelta: {
        X: 0,
        Y: 0,
        Wheel: 0,
    },
    MousePressedButtons: new Array(5),
    Start: function () {
        window.addEventListener("mousedown", function (e) {
            if (e.button == 0) MouseInputManager.MouseDown = true;
            MouseInputManager.MouseClickTarget = e.target.id;
            MouseInputManager.MouseClickPosition.X = e.pageX;
            MouseInputManager.MouseClickPosition.Y = e.pageY;
            MouseInputManager.MouseDelta.X = 0;
            MouseInputManager.MouseDelta.Y = 0;
            //TODO: Stop annoying pan thingy
            for (let i = 0; i < 5; i++) {
                MouseInputManager.MousePressedButtons[i] = (e.buttons & 2 ** i) ? true : false;
            }
        })
        window.addEventListener("mouseup", function (e) {
            MouseInputManager.MouseDown = false;
            for (let i = 0; i < 5; i++) {
                MouseInputManager.MousePressedButtons[i] = (e.buttons & 2 ** i) ? true : false;
            }
        })
        window.addEventListener("mousemove", function (e) {
            MouseInputManager.MouseMoveTarget = e.target.id;
            MouseInputManager.MouseDelta.X = MouseInputManager.MouseClickPosition.X - e.pageX;
            MouseInputManager.MouseDelta.Y = MouseInputManager.MouseClickPosition.Y - e.pageY;
        })
        window.addEventListener("wheel", function (e) {
            MouseInputManager.MouseDelta.Wheel += e.deltaY;
            MouseInputManager.MouseClickTarget = e.target.id;
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