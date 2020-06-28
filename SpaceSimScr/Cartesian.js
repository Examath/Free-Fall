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
    constructor(data, type = 1, gravity = 9.8, centralMass = 500000) {
        this.Type = type;
        this.Gravity = gravity;
        this.CentralMass = centralMass;
        this.Data = data;
    }
    GetFC(object) {
        switch (this.Type) {
            case 0:
                return { Collide: false, Force: new Vector(0, -this.Gravity)};
            case 1:
                var a = this.Gravity * this.CentralMass / object.Position.X ** 2 + object.Position.Y ** 2;
                var x = a * object.RX * -1;
                var y = a * object.RY * -1;
                var force = new Vector(x, y);
                return { Collide: false, Force: force};
            case 2:
                var x = 0;
                var y = 0;
                var c = false;
                var l = this.Data.length;
                var id = object.ID;
                for (var i = 0; i < l; i++) {
                    if (this.Data[i].Mass <= 0 || i == id) continue;
                    var lX = this.Data[i].Position.X - object.Position.X;
                    var lY = this.Data[i].Position.Y - object.Position.Y;
                    var r2 = lX * lX + lY * lY;
                    if (object.Radius2 + this.Data[i].Radius2 > r2) {
                        if (object.Mass > this.Data[i].Mass) c = this.Data[i];
                        else if (object.Mass < this.Data[i].Mass) c = true;
                        else {
                            if (id > i) c = this.Data[i];
                            else c = true;
                        }
                    }
                    var r = Math.sqrt(r2);
                    var a = this.Data[i].Mass / r2;
                    x += a * lX / r;
                    y += a * lY / r;
                };
                return { Collide: c, Force: new Vector(x, y) };
                break;
        }
    }
}

