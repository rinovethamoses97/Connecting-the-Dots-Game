let rows;
let cols;
let size=100;
let cells=[];
let colors=[[255,0,0],[0,255,0],[0,0,255],[255,187,0],[0,255,237],[255,255,0],[255,0,255]];
let players=[];
let turn=0;
let clicked=false;
let noOfplayers;
let computer;
let computerScore=0;
let computerTurn=false;
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
        noOfplayers=parseInt(prompt("Enter the Number of player (1-7)",1));
    }while(noOfplayers<1 || noOfplayers>7);
    if(noOfplayers==1)
        computer=true;
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
        if(computer){
            text("Human",x+20,y+28);
            textSize(30);
            text("- "+players[i].score,x+90,y+30);
        }
        else{
            rect(x,y,40,40);
            textSize(30);
            text("- "+players[i].score,x+70,y+30);
        }
        x+=110;
    }
    if(computer){
        stroke(colors[1][0],colors[1][1],colors[1][2]);
        fill(colors[1][0],colors[1][1],colors[1][2]);
        text("Computer",x+90,y+28);
        // rect(x,y,40,40);
        textSize(30);
        text("- "+computerScore,x+180,y+30);
    }
}
function setBorderCounts(){
    for(let i in cells){
        let count=0;
        for(let j in cells[i].borders){
            if(cells[i].borders[j].status)
                count++;
        }
        cells[i].count=count;
    }
}
function computerPlay(){
    setBorderCounts();
    let found=false;
    for(let i in cells){
        if(cells[i].count==3){
            for(let j in cells[i].borders){
                if(!cells[i].borders[j].status){
                    cells[i].borders[j].status=true;
                    cells[i].borders[j].color=colors[1];
                    cells[i].rounded=true;
                    found=true;
                    computerScore++;
                    cells[i].color=colors[1];
                    for(let k in cells){
                        if(cells[k]!=cells[i]){
                            for(let l in cells[k].borders){
                                if(cells[k].borders[l].x1==cells[i].borders[j].x1 && cells[k].borders[l].y1==cells[i].borders[j].y1 && cells[k].borders[l].x2==cells[i].borders[j].x2 && cells[k].borders[l].y2==cells[i].borders[j].y2){
                                    // console.log(cells[i],cells[k]);
                                    cells[k].borders[l].status=true;
                                    cells[k].borders[l].color=colors[1];
                                    if(cells[k].count==3){
                                        cells[k].rounded=true;
                                        computerScore++;
                                        cells[k].color=colors[1];          
                                    }
                                    computerPlay();
                                    return;
                                }
                            }
                        }
                    }
                    computerPlay();
                    return;
                }
            }
        }
    }
    for(let i in cells){
        if(cells[i].count==0){
            for(let j in cells[i].borders){
                let good=true;
                for(let k in cells){
                    if(cells[k].count==2){
                        for(let l in cells[k].borders){
                            if(cells[i].borders[j].x1==cells[k].borders[l].x1 && cells[i].borders[j].y1==cells[k].borders[l].y1 && cells[i].borders[j].x2==cells[k].borders[l].x2 && cells[i].borders[j].y2==cells[k].borders[l].y2){
                                good=false;
                            }
                        }
                    }
                }
                if(good){
                    cells[i].borders[j].status=true;
                    cells[i].borders[j].color=colors[1];
                    for(let k in cells){
                        for(let l in cells[k].borders){
                            if(cells[i].borders[j].x1==cells[k].borders[l].x1 && cells[i].borders[j].y1==cells[k].borders[l].y1 && cells[i].borders[j].x2==cells[k].borders[l].x2 && cells[i].borders[j].y2==cells[k].borders[l].y2){
                                cells[k].borders[l].status=true;
                                cells[k].borders[l].color=colors[1];
                            }
                        }
                    }   
                    return;
                }
            }
        }
    }
    for(let i in cells){
        if(cells[i].count==1){
            for(let j in cells[i].borders){
                if(cells[i].borders[j].status){
                    continue;
                }
                let good=true;
                for(let k in cells){
                    if(cells[k].count==2){
                        for(let l in cells[k].borders){
                            if(cells[i].borders[j].x1==cells[k].borders[l].x1 && cells[i].borders[j].y1==cells[k].borders[l].y1 && cells[i].borders[j].x2==cells[k].borders[l].x2 && cells[i].borders[j].y2==cells[k].borders[l].y2){
                                good=false;
                            }
                        }
                    }
                }
                if(good){
                    cells[i].borders[j].status=true;
                    cells[i].borders[j].color=colors[1];
                    for(let k in cells){
                        for(let l in cells[k].borders){
                            if(cells[i].borders[j].x1==cells[k].borders[l].x1 && cells[i].borders[j].y1==cells[k].borders[l].y1 && cells[i].borders[j].x2==cells[k].borders[l].x2 && cells[i].borders[j].y2==cells[k].borders[l].y2){
                                cells[k].borders[l].status=true;
                                cells[k].borders[l].color=colors[1];
                            }
                        }
                    }   
                    return;
                }
            }
        }
    }
    let cellNo;
    let borderNo;
    let maxScore=999;
    let haveCountTwo=false;
    for(let i in cells){
        if(cells[i].count==2){
            haveCountTwo=true;
            for(let j in cells[i].borders){
                if(!cells[i].borders[j].status){
                    let cellCopy=JSON.parse(JSON.stringify(cells));
                    cellCopy[i].borders[j].status=true;
                    for(let m in cellCopy){
                        for(let n in cellCopy[m].borders){
                            if(cellCopy[i].borders[j].x1==cellCopy[m].borders[n].x1 && cellCopy[i].borders[j].y1==cellCopy[m].borders[n].y1 && cellCopy[i].borders[j].x2==cellCopy[m].borders[n].x2 && cellCopy[i].borders[j].y2==cellCopy[m].borders[n].y2){
                                cellCopy[m].borders[n].status=true;
                                break;
                            }

                        }
                    }
                    let score=getOpponentScore(cellCopy);
                    // console.log(i,score);
                    if(score<maxScore){
                        maxScore=score;
                        cellNo=i;
                        borderNo=j;
                    }
                }
            }
        }
    }
    if(haveCountTwo){
        cells[cellNo].borders[borderNo].status=true;
        cells[cellNo].borders[borderNo].color=colors[1];
        // console.log(cellNo);
        for(let k in cells){
            for(let l in cells[k].borders){
                if(cells[cellNo].borders[borderNo].x1==cells[k].borders[l].x1 && cells[cellNo].borders[borderNo].y1==cells[k].borders[l].y1 && cells[cellNo].borders[borderNo].x2==cells[k].borders[l].x2 && cells[cellNo].borders[borderNo].y2==cells[k].borders[l].y2){
                    cells[k].borders[l].status=true;
                    cells[k].borders[l].color=colors[1];
                }
            }
        }
    }
    if(isGameFinished()){
        if(players[0].score>computerScore){
            alert("Human won!!!");
        }
        else{
            alert("Computer Won!!");
        }
        noLoop();
        return;
    }
    return; 
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
                    if(computer){
                        if(players[0].score>computerScore){
                            alert("Human won!!!");
                        }
                        else{
                            alert("Computer Won!!");
                        }
                    }
                    else{
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
                    }
                    noLoop();
                    return;
                }
            }
        }
        if(computer){
            if(!found)   
                computerPlay();
        }
        else{
            if(!found)   
                turn=(turn+1)%players.length;
        }
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
function getOpponentScore(cellCopy){
    let score=0;
    for(let i in cellCopy){
        let count=0;
        for(let j in cellCopy[i].borders){
            if(cellCopy[i].borders[j].status)
                count++;
        }
        cellCopy[i].count=count;
    }
    let found=true;
    while(found){
        let flag=false;
        for(let i in cellCopy){
            if(cellCopy[i].count==3){
                score++;
                flag=true;
                for(let j in cellCopy[i].borders){
                    if(!cellCopy[i].borders[j].status){
                        cellCopy[i].borders[j].status=true;
                        cellCopy[i].count++;
                        for(let m in cellCopy){
                            for(let n in cellCopy[m].borders){
                                if(cellCopy[i].borders[j].x1==cellCopy[m].borders[n].x1 && cellCopy[i].borders[j].y1==cellCopy[m].borders[n].y1 && cellCopy[i].borders[j].x2==cellCopy[m].borders[n].x2 && cellCopy[i].borders[j].y2==cellCopy[m].borders[n].y2){
                                    cellCopy[m].borders[n].status=true;
                                    cellCopy[m].count++;
                                    break;
                                }
    
                            }
                        }
                        break;
                    }
                }
            }
            if(flag)
                break;
        }
        if(!flag)
            found=false;
    }
    return score;
}