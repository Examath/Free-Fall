"use strict"
/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />

// $(function () {
//     import {KeyController, KeyControllerForce} from "SpaceSim\KeyController.mjs";
// })

class SpaceSim {
    constructor(updatecall, DrawCall, w = 2600, h = 1500) {
        this._Rate = 100;
        this.Root = document.createElement("div");
        this.Root.classList.add("SpaceSimRoot");
        this.Canvas = document.createElement("canvas");
        this.ID = UniqueID.Get("SpaceSimCanvas");
        this.Canvas.id = this.ID;
        this.Canvas.width = w;
        this.Canvas.height = h;
        this.Context = this.Canvas.getContext("2d", { alpha: false });
        this.UI = {
            Root: document.createElement("div"),
            Toolbar: {
                Root: document.createElement("div"),
                Tools: [new Tool("Select", 0, true), new Tool("Pan", 1), new Tool("Zoom", 2)],
                SelectedTool: 0,
                Start: function () {
                    this.Root.classList.add("UIToolBar");
                    this.Tools.forEach(tool => {
                        this.Root.appendChild(tool.Root);
                    });
                },
                Update: function () {
                    if (Tool.SelectionChangedFlag && this.Tools[Tool.SelectedRefrenceIndex].Selected) {
                        this.SelectedTool = Tool.SelectedRefrenceIndex;
                        Tool.SelectionChangedFlag = false;
                    }
                }
            },
            Start: function () {
                this.Root.classList.add("SpaceSimUIRoot");
                this.Toolbar.Start();
                this.Root.appendChild(this.Toolbar.Root);
            },
            Update: function () {
                this.Toolbar.Update();
            }
        }
        this.UI.Start();
        this.Renderer = {
            X: 0,
            Y: 0,
            Z: 1
        }

        document.body.insertBefore(this.Root, document.body.childNodes[0]);
        this.Root.appendChild(this.Canvas);
        this.Root.appendChild(this.UI.Root);

        this.Objects = [];
        this.UpdateCall = updatecall;
        this.Interval = setInterval(updatecall, 1000 / this.Rate);
        window.requestAnimationFrame(DrawCall);
    }
    Update() {
        var t = performance.now();
        this.UI.Update();
        this.Objects.forEach(element => {
            element.Update(this.Rate);
        });
        if (MouseInputManager.MouseDown && MouseInputManager.MouseTarget == this.ID) {
            this.Pan();
        }
        document.getElementById("fu").innerHTML = performance.now() - t;
    }
    Draw(DrawCall) {
        var t = performance.now();
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Context.fillStyle = "#000000";
        this.Context.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Context.save();
        this.Context.translate(this.Canvas.width / 2 + this.Renderer.X, this.Canvas.height / 2 + this.Renderer.Y);
        Circle(this.Context, 0, 0, 10);
        this.Objects.forEach(element => {
            element.Draw(this.Context);
        });
        this.Context.restore();
        window.requestAnimationFrame(DrawCall); //TODO: improve
        document.getElementById("fd").innerHTML = performance.now() - t;
    }
    Pan() { 
        this.Renderer.X += MouseInputManager.MouseDelta.X;
        this.Renderer.Y += MouseInputManager.MouseDelta.Y;
    }
    get Rate() {
        return this._Rate;
    }
    set Rate(x) {
        this._Rate = x;
        clearInterval(this.Interval);
        this.Interval = setInterval(this.UpdateCall, 1000 / x);
    }
}

class SpaceObject {
    constructor(PositionX, PositionY, VelocityX, VelocityY, Col = "#00ffff") {
        this.Position = new Coordinate(PositionX, PositionY);
        this.Velocity = new Vector(VelocityX, VelocityY);
        this.Forces = [];
        this.Colour = Col;
        this.Trail = new Trail(Col);
        /*document.getElementById("x").innerHTML = "X" + this.Position.X;
        document.getElementById("y").innerHTML = "Y" + this.Position.Y;
        document.getElementById("vx").innerHTML = "Vx" + this.Velocity.X;
        document.getElementById("vy").innerHTML = "Vy" + this.Velocity.Y;
        document.getElementById("a").innerHTML = "Angle" + this.Position.Angle * (180 / Math.PI);
        document.getElementById("d").innerHTML = "Dist" + this.Position.Distance;*/
    }
    Update(Rate) {
        this.Forces.forEach(Force => {
            this.Velocity.Add(Force.Get());
        });
        this.Velocity.Add(GlobalForce.Get(this.Position), Rate);
        this.Position.Add(this.Velocity, Rate);
        if (this.Trail) this.Trail.Update(this.Position.X, this.Position.Y);
    };
    Draw(Context) {
        if (this.Trail) this.Trail.Draw(Context);        
        Circle(Context, this.Position.X, this.Position.Y, 4, this.Colour);
    }
}

var GlobalForce = {
    Gravity: 9.8,
    CentralMass: 5000,
    Get: function (position) {
        var a = this.Gravity * this.CentralMass / position.Influence;
        var x = a * position.RX * -1;
        var y = a * position.RY * -1;
        var force = new Vector(x, y);
        return force;
    }
}

var UniqueID = {
    Prefixes: [],
    Count: [],
    Get: function (prefix) {
        for (var i = 0; i < this.Prefixes.length; i++) {
            if (prefix == this.Prefixes[i]) {
                this.Count[i]++;
                return prefix + (this.Count[i] - 1);
            }
        }
        this.Prefixes.push(prefix);
        this.Count.push(1);
        return prefix + 0;
    }
}