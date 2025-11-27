let video;
let pg;
let colors = [];

function preload() {
  // shader와 100% 동일한 팔레트!!
  colors = [
    color(26, 0, 76),
    color(122, 41, 165),
    color(255, 110, 0),
    color(255, 232, 0),
    color(255, 255, 255)
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();

  pg = createGraphics(160, 120);
}

function draw() {
  background(0);

  pg.image(video, 0, 0, pg.width, pg.height);
  pg.loadPixels();

  for (let i = 0; i < pg.pixels.length; i += 4) {
    let r = pg.pixels[i];
    let g = pg.pixels[i + 1];
    let b = pg.pixels[i + 2];

    // shader brightness와 동일한 계산 방식
    let bright = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
    let t = bright * (colors.length - 1);

    let idx1 = floor(t);
    let idx2 = min(idx1 + 1, colors.length - 1);
    let amt = t - idx1;

    let c = lerpColor(colors[idx1], colors[idx2], amt);

    pg.pixels[i] = red(c);
    pg.pixels[i + 1] = green(c);
    pg.pixels[i + 2] = blue(c);
  }

  pg.updatePixels();

  // Mirror
  push();
  translate(width, 0);
  scale(-1, 1);
  image(pg, 0, 0, width, height);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
