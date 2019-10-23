function Circle(Context, x, y, r, colour = "#ffffff") {
    Context.fillStyle = colour;
    Context.beginPath();
    Context.arc(x, -y, r, 0, 2 * Math.PI);
    Context.fill();
}

class Trail {
    constructor(colour = "#ffffff") {
        this.Track0X = Array(Trail.Quality.Samples);
        this.Track0Y = Array(Trail.Quality.Samples);
        this.Track1X = Array(Trail.Quality.Samples);
        this.Track1Y = Array(Trail.Quality.Samples);
        this.Colour = colour;
        this.LOD0Index = 0;
        this.LOD1Index = 0;
    }
    Update(x,y) {
        this.Track0X[this.LOD0Index] = x;
        this.Track0Y[this.LOD0Index] = y;
        var b = (this.LOD0Index + Trail.Quality.Reduction) % Trail.Quality.Samples;
        this.LOD0Index = (this.LOD0Index + 1) % Trail.Quality.Samples;
        if(this.LOD0Index % 16 == 15) {
            this.Track1X[this.LOD1Index] = this.Track0X[b];
            this.Track1Y[this.LOD1Index] = this.Track0Y[b];
            this.LOD1Index = (this.LOD1Index + 1) % Trail.Quality.Samples;
        }
    }
    Draw(Context) {
        Context.strokeStyle = this.Colour;
        Context.lineWidth = 2;
        var TQS = Trail.Quality.Samples;
        var hTQS = TQS * 2;
        // for (let j = 0; j < TQS - 1; j++) {
        //     Context.globalAlpha = j / hTQS + 0.5;
        //     var a = (this.LOD0Index + j) % TQS;
        //     var b = (a + 1) % TQS;
        //     Context.beginPath();
        //     Context.moveTo(this.Track0X[a], -this.Track0Y[a]);
        //     Context.lineTo(this.Track0X[b], -this.Track0Y[b]);
        //     Context.stroke();
        // }
        // for (let j = 0; j < TQS - 1; j++) {
        //     Context.globalAlpha = j / hTQS;
        //     var a = (this.LOD1Index + j) % TQS;
        //     var b = (a + 1) % TQS;
        //     Context.beginPath();
        //     Context.moveTo(this.Track1X[a], -this.Track1Y[a]);
        //     Context.lineTo(this.Track1X[b], -this.Track1Y[b]);
        //     Context.stroke();
        // }       
        Context.beginPath();
        for (let j = 0; j < TQS - 1; j++) {
            //Context.globalAlpha = j / hTQS + 0.5;
            var a = (this.LOD0Index + j) % TQS;
            var b = (a + 1) % TQS;
            Context.moveTo(this.Track0X[a], -this.Track0Y[a]);
            Context.lineTo(this.Track0X[b], -this.Track0Y[b]);
        }
            Context.stroke();
            Context.beginPath();
        for (let j = 0; j < TQS - 1; j++) {
            //Context.globalAlpha = j / hTQS;
            var a = (this.LOD1Index + j) % TQS;
            var b = (a + 1) % TQS;
            Context.moveTo(this.Track1X[a], -this.Track1Y[a]);
            Context.lineTo(this.Track1X[b], -this.Track1Y[b]);
        }
        Context.stroke();
        Context.globalAlpha = 1;
    }
}

Trail.Quality = {
    Samples: 128,
    Reduction: 16,
}