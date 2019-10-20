"use strict"
/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />

// $(function () {
//     import {KeyController, KeyControllerForce} from "SpaceSim\KeyController.mjs";
// })

class SpaceSim {
    constructor(UpdateCall, w = 2600, h = 1500) {
        this.Rate = 100,
        
        this.Root = document.createElement("div");
        this.Root.classList.add("SpaceSimRoot");
        this.Canvas = document.createElement("canvas");
        this.Canvas.width = w;
        this.Canvas.height = h;
        this.Context = this.Canvas.getContext("2d");
        //this.UIRoot = ;ceSimUIRoot");
        this.UI = {
            Root: document.createElement("div"),
            Toolbar: {
                Root: document.createElement("div"),
                Tools: [new Tool("Select", true), new Tool("Pan"), new Tool("Zoom")],
                Start: function() {                        
                    this.Root.classList.add("UIToolBar");
                    this.Root.addEventListener('ToolSelectionChanged');
                    this.Root.
                    this.Tools.forEach(tool => {
                        this.Root.appendChild(tool.Root);
                    });
                }
            },
            Start: function() {
        //this.UIRoot.classList.add("Spa
                this.Root.classList.add("SpaceSimUIRoot");
                this.Toolbar.Start();
                this.Root.appendChild(this.Toolbar.Root);
            }
        }
        this.UI.Start();
        this.Renderer = {
            X: 0,
            Y: 0,
            Z: 1
        }

        this.Context.fillStyle = "#000000";
        this.Context.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
     
        document.body.insertBefore(this.Root, document.body.childNodes[0]);
        this.Root.appendChild(this.Canvas);
        this.Root.appendChild(this.UI.Root);

        this.Objects = [];
        this.Interval = setInterval(UpdateCall, 1000 / this.Rate);
    }
    Update() {  
        this.Context.save();    
        this.Context.translate(this.Canvas.width / 2 + this.Renderer.X, this.Canvas.height / 2 + this.Renderer.Y);
        this.Context.fillStyle = "rgba(0, 0, 0, 0.01)";
        this.Context.fillRect(-this.Canvas.width / 2, -this.Canvas.height / 2, this.Canvas.width, this.Canvas.height);
        Circle(this.Context, 0, 0, 10);
        this.Objects.forEach(element => {
            element.Update(this.Context, this.Rate);
        });  
        this.Context.restore();  
    }
}

class SpaceObject {
    constructor(PositionX, PositionY, VelocityX, VelocityY, Col = "#00ffff") {
        this.Position = new Coordinate(PositionX, PositionY);
        this.Velocity = new Vector(VelocityX, VelocityY);
        this.Forces = [];
        this.Colour = Col;
        /*document.getElementById("x").innerHTML = "X" + this.Position.X;
        document.getElementById("y").innerHTML = "Y" + this.Position.Y;
        document.getElementById("vx").innerHTML = "Vx" + this.Velocity.X;
        document.getElementById("vy").innerHTML = "Vy" + this.Velocity.Y;
        document.getElementById("a").innerHTML = "Angle" + this.Position.Angle * (180 / Math.PI);
        document.getElementById("d").innerHTML = "Dist" + this.Position.Distance;*/
    }
    Update(Context, Rate) {
        this.Forces.forEach(Force => {
            this.Velocity.Add(Force.Get());
        });
        this.Velocity.Add(GlobalForce.Get(this.Position));
        this.Position.Add(this.Velocity, Rate);
        Circle(Context, this.Position.X, this.Position.Y, 2, this.Colour);
    };
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

var UniqueID {
    Prefixes: [],
    Count: [],
    Get: function (prefix) {
        this.Prefixes.forEach(pf => {
            
        });
}