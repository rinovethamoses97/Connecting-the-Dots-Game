class Cell{
    constructor(i,j){
        this.r=i;
        this.c=j;
        this.x=j*size+100;
        this.y=i*size+150;
        this.borders=[];
        this.borders.push(new Border(this.x,this.y,this.x+size,this.y,0,this.x,this.y));
        this.borders.push(new Border(this.x+size,this.y,this.x+size,this.y+size,1,this.x+size,this.y));
        this.borders.push(new Border(this.x,this.y+size,this.x+size,this.y+size,0,this.x+size,this.y+size));
        this.borders.push(new Border(this.x,this.y,this.x,this.y+size,1,this.x,this.y+size));
        this.rounded=false;
        this.color=null;
    }
    show(){
        for(let i=0;i<this.borders.length;i++){
            this.borders[i].show();
        }
        if(this.rounded){
            stroke(this.color[0],this.color[1],this.color[2]);
            fill(this.color[0],this.color[1],this.color[2]);
            rect(this.borders[0].x1+this.borders[0].diameter+10,this.borders[0].y1+this.borders[0].diameter+10,size-this.borders[0].diameter-20,size-this.borders[0].diameter-20)
        }
    }
}