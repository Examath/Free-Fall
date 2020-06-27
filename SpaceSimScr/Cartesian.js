class Coordinate {
    constructor(x, y, m = 0, r = 0) {
        this.X = x;
        this.Y = y;
        this.Mass = m;
        this.Radius2 = r * r;
    }
    Add(V, Rate) {
        this.X += V.X * Rate;
        this.Y += V.Y * Rate;
    };
    get Angle() {
        return Math.atan(this.Y / this.X);
    }
    get RX() {
        return this.X / this.Distance;
    }
    get RY() {
        return this.Y / this.Distance;
    }
    get Influence() {
        return this.X ** 2 + this.Y ** 2;
    }
    get Distance() {
        return Math.sqrt(this.X ** 2 + this.Y ** 2);
    }
}

class Vector {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    Add(V, Rate) {
        if (!V) return;
        this.X += V.X * Rate;
        this.Y += V.Y * Rate;
    };
}

class Physic {
    constructor(x, y, vx, vy, m = 0, r = 0) {
        this.Position = new Vector(x,y);
        this.Velocity = new Vector(vx,vy);
        this.Mass = m;
        this.Radius2 = r * r;
    }
}

class GlobalForce {
    constructor(type = 1, gravity = 9.8, centralMass = 500000) {
        this.Type = type;
        this.Gravity = gravity;
        this.CentralMass = centralMass;
        this.Census = [];
    }
    Get(position, id) {
        switch (this.Type) {
            case 0:
                return new Vector(0, -this.Gravity);
            case 1:
                var a = this.Gravity * this.CentralMass / position.Influence;
                var x = a * position.RX * -1;
                var y = a * position.RY * -1;
                var force = new Vector(x, y);
                return force;
            case 2:
                var x = 0;
                var y = 0;
                var l = this.Census.length;
                for (var i = 0; i < l; i++) {
                    if (this.Census[i].Mass <= 0 || i == id) continue;
                    var lX = this.Census[i].X - position.X;
                    var lY = this.Census[i].Y - position.Y;
                    var r2 = lX * lX + lY * lY;
                    var r = Math.sqrt(r2);
                    var a = this.Census[i].Mass / r2;
                    x += a * lX / r;
                    y += a * lY / r;
                };
                return new Vector(x, y);
                break;
        }
    }
    GetFC(physic, id) {
        switch (this.Type) {
            case 0:
                return new Vector(0, -this.Gravity);
            case 1:
                var a = this.Gravity * this.CentralMass / physic.Influence;
                var x = a * physic.RX * -1;
                var y = a * physic.RY * -1;
                var force = new Vector(x, y);
                return force;
            case 2:
                var x = 0;
                var y = 0;
                var c = false;
                var l = this.Census.length;
                for (var i = 0; i < l; i++) {
                    if (this.Census[i].Mass <= 0 || i == id) continue;
                    var lX = this.Census[i].Position.X - physic.Position.X;
                    var lY = this.Census[i].Position.Y - physic.Position.Y;
                    var r2 = lX * lX + lY * lY;
                    if (physic.Radius2 + this.Census[i].Radius2 > r2) {
                        if (physic.Mass > this.Census[i].Mass) c = this.Census[i];
                        else if (physic.Mass < this.Census[i].Mass) c = true;
                        else {
                            if (id > i) c = this.Census[i];
                            else c = true;
                        }
                    }
                    var r = Math.sqrt(r2);
                    var a = this.Census[i].Mass / r2;
                    x += a * lX / r;
                    y += a * lY / r;
                };
                return { Collide: c, Force: new Vector(x, y) };
                break;
        }
    }
}

