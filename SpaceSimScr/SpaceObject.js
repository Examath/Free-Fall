/// <reference path="Cartesian.js" />
/// <reference path="Renderer.js" />
/// <reference path="Input.js" />
/// <reference path="SpaceSim.js" />

class SpaceObject {
    constructor(...properties) {
        //this.Physic = new Physic(PositionX, PositionY, VelocityX, VelocityY, mass, radius);
        //this.Forces = [];
        Object.assign(this, {
            Position: new Vector(0, 0),
            Velocity: new Vector(0, 0),
            Mass: 0,
            Radius2: 1,
            Forces: []
        });
        properties.forEach(property => {
            Object.assign(this, property);
        });
        this.ID = 0;
        this.Delete = false;
    }
    get Radius() {
        return Math.sqrt(this.Radius2);
    }
    set Radius(X) {
        this.Radius2 = X * X;
    }
    deconstructor() {
        return `
            Position: ${this.Position.toString()}, 
            Velocity: ${this.Velocity.toString()}, 
            Mass: ${this.Mass}, 
            Radius2: ${this.Radius2}`; 
        //TODO: Support this.Forces decompose
    }
}

SpaceObject.Default = {
    Position: new Vector(0, 0),
    Velocity: new Vector(0, 0),
    Mass: 0,
    Radius2: 1,
    Forces: [],
}

class CircularSpaceObject extends SpaceObject {
    constructor(PositionX, PositionY, VelocityX = 0, VelocityY = 0, mass = 0, colour = "#ffffff") {
        var radius = CircularSpaceObject.Radii(mass);
        var prop = {
            Position: new Vector(PositionX, PositionY),
            Velocity: new Vector(VelocityX, VelocityY),
            Mass: mass,
            Radius2: radius,
        }
        super(prop)
        this.Colour = colour;
        this.Radius = radius;
    }
    Update(Rate, GlobalForce) {
        this.Forces.forEach(Force => {
            this.Velocity.Add(Force.Get(), Rate);
        });
        var global = GlobalForce.GetFC(this);
        if (global.Collide) {
            if (global.Collide == true) this.Delete = true;
            else {
                this.Velocity.X = ((this.Mass * this.Velocity.X) + (global.Collide.Mass * global.Collide.Velocity.X)) / (this.Mass + global.Collide.Mass);
                this.Velocity.Y = ((this.Mass * this.Velocity.Y) + (global.Collide.Mass * global.Collide.Velocity.Y)) / (this.Mass + global.Collide.Mass);
                this.Position.X = ((this.Mass * this.Position.X) + (global.Collide.Mass * global.Collide.Position.X)) / (this.Mass + global.Collide.Mass);
                this.Position.Y = ((this.Mass * this.Position.Y) + (global.Collide.Mass * global.Collide.Position.Y)) / (this.Mass + global.Collide.Mass);
                this.Mass += global.Collide.Mass;
                this.Radius = CircularSpaceObject.Radii(this.Mass);
            }
        }
        this.Velocity.Add(global.Force, Rate);
        this.Position.Add(this.Velocity, Rate);
        if (this.Trail)
            this.Trail.Update(this.Position.X, this.Position.Y);
    }
    Draw(Context) {
        if (this.Trail)
            this.Trail.Draw(Context);
        Circle(Context, this.Position.X, this.Position.Y, this.Radius, this.Colour);
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
        Circle(Context, this.Position.X, this.Position.Y, this.Radius, this.Colour);
    }
}

class CircularMassObject extends SpaceObject {
    constructor(properties = {}) {
        super(CircularMassObject.Default, properties);
        this.Radius = CircularMassObject.Radii(this.Mass);
    }
    Update(Rate, GlobalForce) {
        this.Forces.forEach(Force => {
            this.Velocity.Add(Force.Get(), Rate);
        });
        var global = GlobalForce.GetFC(this);
        if (global.Collide) {
            if (global.Collide == true) this.Delete = true;
            else {
                this.Velocity.X = ((this.Mass * this.Velocity.X) + (global.Collide.Mass * global.Collide.Velocity.X)) / (this.Mass + global.Collide.Mass);
                this.Velocity.Y = ((this.Mass * this.Velocity.Y) + (global.Collide.Mass * global.Collide.Velocity.Y)) / (this.Mass + global.Collide.Mass);
                this.Position.X = ((this.Mass * this.Position.X) + (global.Collide.Mass * global.Collide.Position.X)) / (this.Mass + global.Collide.Mass);
                this.Position.Y = ((this.Mass * this.Position.Y) + (global.Collide.Mass * global.Collide.Position.Y)) / (this.Mass + global.Collide.Mass);
                this.Mass += global.Collide.Mass;
                this.Radius = CircularMassObject.Radii(this.Mass);
            }
        }
        this.Velocity.Add(global.Force, Rate);
        this.Position.Add(this.Velocity, Rate);
        if (this.Trail)
            this.Trail.Update(this.Position.X, this.Position.Y);
    }
    Draw(Context) {
        if (this.Trail)
            this.Trail.Draw(Context);
        Circle(Context, this.Position.X, this.Position.Y, this.Radius, this.Colour);
    }
    static Radii(mass) {
        return Math.cbrt(mass) / 2;
    }
    toString() {
        return `
        new CircularMassObject({${this.deconstructor()},
            Colour: "${this.Colour}"
        })` 
    }
}

CircularMassObject.Default = {
    Colour: "#ffffff"
}
