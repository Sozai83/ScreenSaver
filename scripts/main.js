console.log('It is loading. Yello')

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let windowWidth,
    windowHeight,
    isMobile,
    isSmallWindow,
    adjSize,
    adjSpeed,
    fillColorWidth,
    fillColorHeight

let cat = {
    img: new Image(),
    // position on screen
    // top left of image
    xPos: 0,
    yPos: 0,
    // speed
    xSpeed: 8,
    ySpeed: 8,

    //imgsize
    catWidth: 200,
    catHeight: 240,

    catColor: '#000000'
};

cat.img.src = "./dumbcat.png";

const setCanvasSize = ()=>{
    windowWidth = window.innerWidth;
    windowHeight = window.window.innerHeight;
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    fillColorWidth = ctx.canvas.width;
    fillColorHeight = ctx.canvas.height
}

const adjScale = ()=>{
    isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    isSmallWindow = window.innerWidth <= 1200 || window.innerHeight <= 800 ? true : false;
    [adjSize, adjSpeed] = isMobile ? [0.4, 0.6] : isSmallWindow ? [0.7, 0.7] : [1,1];
}


const drawCat = () =>{
    setCanvasSize();
    adjScale();

    //add color
    ctx.fillStyle = cat.catColor;
    ctx.fillRect(0 ,0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-in';
   
    //draw a dumb cat
    ctx.drawImage(
        cat.img,
        cat.xPos, 
        cat.yPos, 
        cat.catWidth * adjSize, 
        cat.catHeight * adjSize, 
    );    
    
};

const moveCat = ()=>{
    //clear previous cat
    ctx.clearRect(0, 0, windowWidth, windowHeight);

    //move Cat position
    checkBounce();

    //add Cat at the next position
    drawCat();

    cat.xPos += cat.xSpeed * adjSpeed;
    cat.yPos += cat.ySpeed * adjSpeed;
}

const setCatColor = ()=>{
    let randomColor = '#'
    const rangeSize = 50; // adapt as needed
    const parts = [
        Math.floor(Math.random()*255),
        Math.floor(Math.random()*255),
        Math.floor(Math.random()*rangeSize)
    ].sort( (a, b) => Math.random() - 0.5 );

    cat.catColor = randomColor + parts.map(p => p.toString(16).padStart(2, "0")).join('');
}

const checkBounce = ()=>{    
    //detect bounce for x
    if(cat.xPos >= windowWidth - cat.catWidth * adjSize  || cat.xPos < 0){
        cat.xSpeed *= -1;
        setCatColor();
    }
    //detect bounce for y
    if(cat.yPos >= windowHeight - cat.catHeight * adjSize || cat.yPos < 0){
        cat.ySpeed *= -1;
        setCatColor();
    }
}


const updateCat = ()=>{
    requestAnimationFrame(updateCat);
    moveCat();
}

//main functionality
const main = ()=>{
    cat.img.onload = ()=> drawCat();
    updateCat();
}


//detect window resize
window.addEventListener("resize", function(event) {
    setCanvasSize();
    adjScale();
    
    //if the cat is outside of the current window, start from 0
    if(cat.xPos >= windowWidth - cat.catWidth || cat.yPos >= windowHeight - cat.catHeight){
        cat.xPos = 0;
        cat.yPos = 0;
    } 
})

main();