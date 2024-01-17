console.log('It is loading. Yello')

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 400;

let cat = {
    img: new Image(),
    // position on screen
    // top left of image
    xPos: 0,
    yPos: 0,
    // speed
    xSpeed: 10,
    ySpeed: 10,

    //imgsize
    catWidth: 100,
    catHeight: 150,
};

cat.img.src = "./dumbcat.png";

cat.img.onload = () => {
    ctx.drawImage(
    cat.img,
    cat.xPos, 
    cat.yPos, 
    cat.catWidth, 
    cat.catHeight
    );

    ctx.globalCompositeOperation = "saturation";
ctx.fillStyle = "hsl(0," + 0 + "%, 50%)";  // hue doesn't matter here
ctx.fillRect(0, 0);

// step 3: adjust hue, preserve luma and chroma
ctx.globalCompositeOperation = "hue";
ctx.fillStyle = "hsl(" + 10 + ",1%, 50%)";  // sat must be > 0, otherwise won't matter
    ctx.fillRect(0, 0, cat.catWidth, cat.catHeight);
    ctx.globalCompositeOperation('source-in');

    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(
        cat.img,
        cat.xPos, 
        cat.yPos, 
        cat.catWidth, 
        cat.catHeight
        );


        ctx.globalCompositeOperation = "source-over";
    
    
}







function moveCat(){

}