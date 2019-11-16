class Border{
    constructor(x1_,y1_,x2_,y2_,al,cx,cy){
        this.x1=x1_;
        this.y1=y1_;
        this.x2=x2_;
        this.y2=y2_;
        this.diameter=20;
        this.status=false;
        this.align=al;
        this.cx=cx;
        this.cy=cy;
        this.color=null;
    }
    show(){
        stroke(255)
        strokeWeight(2);   
        if(this.status){
            fill(this.color[0],this.color[1],this.color[2]);
            if(this.align==0)
                rect(this.x1+(this.diameter),this.y1,size-this.diameter,this.diameter);
            else
                rect(this.x1,this.y1+(this.diameter),this.diameter,size-this.diameter);
        }
        stroke(255);
        strokeWeight(0);   
        fill(255,255,0);
        ellipseMode(CORNER)
        ellipse(this.cx,this.cy,this.diameter);
    }
    isClicked(x,y){
        if(this.align==0){
            return collidePointRect(x,y,this.x1+(this.diameter),this.y1,size-this.diameter,this.diameter);
        }
        else{
            return collidePointRect(x,y,this.x1,this.y1+(this.diameter),this.diameter,size-this.diameter);
        }
    }
}