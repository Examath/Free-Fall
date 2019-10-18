"use strict"
/// <reference path="Cartesian.js" />
/// <reference path="KeyController.js" />
/// <reference path="Renderer.js" />

// $(function () {
//     //import {KeyController, KeyControllerForce} from "SpaceSim\KeyController.mjs";
// })

class SpaceSim {
    constructor(UpdateCall, w = 2600, h = 1500) {
        this.Rate = 100,
            this.Element = document.createElement("canvas");
        this.Element.width = w;
        this.Element.height = h;
        this.Context = this.Element.getContext("2d");

        this.Context.translate(this.Element.width / 2, this.Element.height / 2);
        this.Context.fillStyle = "#000000";
        this.Context.fillRect(-this.Element.width / 2, -this.Element.height / 2, this.Element.width, this.Element.height);

        document.body.insertBefore(this.Element, document.body.childNodes[0]);
        this.Objects = [];
        this.Interval = setInterval(UpdateCall, 1000 / this.Rate);
    }
    Update() {
        this.Context.fillStyle = "rgba(0, 0, 0, 0.01)";
        this.Context.fillRect(-this.Element.width / 2, -this.Element.height / 2, this.Element.width, this.Element.height);
        Circle(this.Context, 0, 0, 10);
        this.Objects.forEach(element => {
            element.Update(this.Context, this.Rate);
        });
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