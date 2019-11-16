let rows;
let cols;
let size=100;
let cells=[];
let colors=[[255,0,0],[0,255,0],[0,0,255],[255,187,0],[0,255,237],[255,255,0],[255,0,255]];
let players=[];
let turn=0;
let clicked=false;
let noOfplayers;
function setup(){
    createCanvas(800,850);
    rows=600/size;
    cols=600/size;
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            cells.push(new Cell(i,j));
        }
    }
    do{    
        noOfplayers=parseInt(prompt("Enter the Number of player (2-7)",2));
    }while(noOfplayers<2 || noOfplayers>7);
    for(let i=0;i<noOfplayers;i++){
        players.push(new Player(colors[i]));
    }
}
function displayScores(){
    textSize(30);
    textAlign(CENTER);
    text("SCORE",width/2,30);
    let x=40;
    let y=50;
    for(let i in players){
        stroke(players[i].color[0],players[i].color[1],players[i].color[2]);
        fill(players[i].color[0],players[i].color[1],players[i].color[2]);
        rect(x,y,40,40);
        textSize(30);
        text("- "+players[i].score,x+70,y+30);
        x+=110;
    }
}
function draw(){
    background(0);
    for(let i in cells){
        cells[i].show();
    }
    displayScores();
}
function mousePressed(){
    for(let j in cells){        
        for(let i in cells[j].borders){
            if(cells[j].borders[i].isClicked(mouseX,mouseY) && cells[j].borders[i].status==false){
                clicked=true;
                cells[j].borders[i].status=true;
                cells[j].borders[i].color=players[turn].color;
            }
        }
    }
    if(clicked){
        let found=false;
        for(let j in cells){
            let rounded=true;
            if(cells[j].rounded)
                continue;        
            for(let i in cells[j].borders){
                // if(!(cells[j].borders[i].color==players[turn] && cells[j].borders[i].status==true)){
                //     rounded=false;
                // }
                if(!(cells[j].borders[i].status==true)){
                    rounded=false;
                }
            }
            if(rounded){
                found=true;
                cells[j].rounded=true;
                cells[j].color=players[turn].color;
                players[turn].addScore();
                if(isGameFinished()){
                    let maxScore=0;
                    let winner;
                    let winnerNo;
                    for(let i in players){
                        if(players[i].score>maxScore){
                            maxScore=players[i].score;
                            winner=players[i];
                            winnerNo=parseInt(i)+1;
                        }
                    }
                    alert("Player "+(winnerNo)+" Won the Game");
                    noLoop();
                    return;
                }
            }
        }
        if(!found)   
            turn=(turn+1)%players.length;
    }
    clicked=false;
}
function isGameFinished(){
    for(let i in cells){
        if(!cells[i].rounded)
            return false;
    }
    return true;
}