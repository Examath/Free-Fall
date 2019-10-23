class Coordinate {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
    Add(V, Rate) {
        this.X += V.X / Rate;
        this.Y += V.Y / Rate;
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
    Add(V, Rate = 100) {
        if (!V) return;
        this.X += V.X * 100 / Rate;
        this.Y += V.Y * 100 / Rate;
    };
}