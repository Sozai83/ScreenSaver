console.log('It is loading. Yello')

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let windowWidth = window.innerWidth;
let windowHeight = window.window.innerHeight;
canvas.width = windowWidth;
canvas.height = windowHeight;

let cat = {
    img: new Image(),
    // position on screen
    // top left of image
    xPos: 0,
    yPos: 0,
    // speed
    xSpeed: 3,
    ySpeed: 3,

    //imgsize
    catWidth: 120,
    catHeight: 150,
};

cat.img.src = "./dumbcat.png";


const drawCat = () =>{
    ctx.drawImage(
        cat.img,
        cat.xPos, 
        cat.yPos, 
        cat.catWidth, 
        cat.catHeight
    )
};

let xBounce = false;
let yBounce = false;


const moveCatPos = ()=>{
    //clear previous cat
    ctx.clearRect(0, 0, windowWidth, windowHeight);
    checkBounce();
    cat.xPos += cat.xSpeed;
    cat.yPos += cat.ySpeed;
    drawCat();

   
}

const checkBounce = ()=>{    
    //detect bounce for x
    if(cat.xPos >= windowWidth - cat.catWidth || cat.xPos < 0){
        cat.xSpeed *= -1;
    }
    //detect bounce for y
    if(cat.yPos >= windowHeight - cat.catHeight || cat.yPos < 0){
        cat.ySpeed *= -1
    }
}


const updateCat = ()=>{
    requestAnimationFrame(updateCat);
    moveCatPos();
}

//main functionality
cat.img.onload = ()=> drawCat();
updateCat();
