/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />
/// <reference path="SpaceSim.js" />

class SpaceObject {
    constructor(PositionX, PositionY, VelocityX = 0, VelocityY = 0, mass = 0, radius = 0) {
        this.Physic = new Physic(PositionX, PositionY, VelocityX, VelocityY, mass, radius);
        this.Forces = [];
        this.ID = 0;
        this.Delete = false;
    }
}

class CircularSpaceObject extends SpaceObject {
    constructor(PositionX, PositionY, VelocityX = 0, VelocityY = 0, mass = 0, colour = "#ffffff") {
        var radius = CircularSpaceObject.Radii(mass);
        super(PositionX, PositionY, VelocityX, VelocityY, mass, radius)
        this.Colour = colour;
        this.Radius = radius;
    }
    Update(Rate, GlobalForce) {
        this.Forces.forEach(Force => {
            this.Physic.Velocity.Add(Force.Get(), Rate);
        });
        var global = GlobalForce.GetFC(this.Physic, this.ID)
        if (global.Collide) {
            if (global.Collide == true) this.Delete = true;
            else {
                this.Physic.Velocity.X = ((this.Physic.Mass * this.Physic.Velocity.X) + (global.Collide.Mass * global.Collide.Velocity.X)) / (this.Physic.Mass + global.Collide.Mass);
                this.Physic.Velocity.Y = ((this.Physic.Mass * this.Physic.Velocity.Y) + (global.Collide.Mass * global.Collide.Velocity.Y)) / (this.Physic.Mass + global.Collide.Mass);
                this.Physic.Position.X = ((this.Physic.Mass * this.Physic.Position.X) + (global.Collide.Mass * global.Collide.Position.X)) / (this.Physic.Mass + global.Collide.Mass);
                this.Physic.Position.Y = ((this.Physic.Mass * this.Physic.Position.Y) + (global.Collide.Mass * global.Collide.Position.Y)) / (this.Physic.Mass + global.Collide.Mass);
                this.Physic.Mass += global.Collide.Mass;
                this.Radius = CircularSpaceObject.Radii(this.Physic.Mass);
                this.Physic.Radius2 = this.Radius * this.Radius;
            }
        }
        this.Physic.Velocity.Add(global.Force, Rate);
        this.Physic.Position.Add(this.Physic.Velocity, Rate);
        if (this.Trail)
            this.Trail.Update(this.Position.X, this.Position.Y);
    }
    Draw(Context) {
        if (this.Trail)
            this.Trail.Draw(Context);
        Circle(Context, this.Physic.Position.X, this.Physic.Position.Y, this.Radius, this.Colour);
    }
    static Radii(mass) {
        return Math.cbrt(mass) / 2;
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
        Circle(Context, this.Physic.Position.X, this.Physic.Position.Y, this.Radius, this.Colour);
    }
}
