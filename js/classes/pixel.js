class pixel {
  constructor(l, x, y, color) {
    this.l=l;
    this.x=x;
    this.y=y;
    this.color=color;
  }
  
  draw(ctx) {
    ctx.fillStyle=this.color;
    ctx.fillRect(
      this.x*this.l,
      this.y*this.l,
      this.l,
      this.l
    );
  }
}