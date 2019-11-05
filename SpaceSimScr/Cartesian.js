class Coordinate {
    constructor(x, y, m = 0) {
        this.X = x;
        this.Y = y;
        this.Mass = m;
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
        this.X += V.X * 100 * Rate;
        this.Y += V.Y * 100 * Rate;
    };
}

class GlobalForce {
    constructor(type = 1, gravity = 9.8, centralMass = 5000) {
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
                    if(this.Census[i].Mass <= 0 || i == id) continue;
                    var lX = this.Census[i].X - position.X;
                    var lY = this.Census[i].Y - position.Y;
                    var r2 = lX * lX + lY * lY;
                    var r = Math.sqrt(r2);
                    var a = this.Census[i].Mass / r2;
                    // x += (lX > 0) ? a * r2 / lX * lX : a * r2 / lX * lX * -1;
                    // y += (lY > 0) ? a * r2 / lY * lY : a * r2 / lY * lY * -1;
                    // x += (lX > 0) ? a * lX * lX / r2 : a * lX * lX / r2 * -1;
                    // y += (lY > 0) ? a * lY * lY / r2 : a * lY * lY / r2 * -1;
                    // x += (lX < 0) ? a * r / lX : a * r / lX * -1;
                    // y += (lY < 0) ? a * r / lY : a * r / lY * -1;
                    x += a * lX / r;
                    y += a * lY / r;
                };
                return new Vector(x, y);
                break;
        }
    }
}

