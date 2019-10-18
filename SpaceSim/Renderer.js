function Circle(Context, x, y, r, colour = "#ffffff") {
    Context.fillStyle = colour;
    Context.beginPath();
    Context.arc(x, -y, r, 0, 2 * Math.PI);
    Context.fill();
}