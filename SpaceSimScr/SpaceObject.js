/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />
/// <reference path="SpaceSim.js" />

class SpaceObject {    
    constructor(PositionX, PositionY, VelocityX = 0, VelocityY = 0, mass = 0) {
        this.Position = new Coordinate(PositionX, PositionY, mass);
        this.Velocity = new Vector(VelocityX, VelocityY);
        this.Forces = [];
        this.ID = 0;
    }
}

class CircularSpaceObject extends SpaceObject {
    constructor(PositionX, PositionY, VelocityX = 0, VelocityY = 0, mass = 0, radius = 4, colour = "#ffffff") {
        super(PositionX, PositionY, VelocityX, VelocityY, mass)
        this.Colour = colour;
        this.Radius = radius;
    }
    Update(Rate, GlobalForce) {
        this.Forces.forEach(Force => {
            this.Velocity.Add(Force.Get(), Rate);
        });
        this.Velocity.Add(GlobalForce.Get(this.Position, this.ID), Rate);
        this.Position.Add(this.Velocity, Rate);
        if (this.Trail)
            this.Trail.Update(this.Position.X, this.Position.Y);
    }
    Draw(Context) {
        if (this.Trail)
            this.Trail.Draw(Context);
        Circle(Context, this.Position.X, this.Position.Y, this.Radius, this.Colour);
    }
}

class StaticCircularSpaceObject extends SpaceObject {
    constructor(PositionX, PositionY, mass = 0, radius = 4, colour = "#ffffff") {
        super(PositionX, PositionY, 0, 0, mass)
        this.Colour = colour;
        this.Radius = radius;
    }
    Update() {
        //Colliders
    }
    Draw(Context) {
        Circle(Context, this.Position.X, this.Position.Y, this.Radius, this.Colour);
    }
}