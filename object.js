obj = function(x,y,width,height) {
    let self = {
        x:x,
        y:y,
        width:width,
        height:height,
    };
    self.update = function() {
        self.updatePosition();
        self.draw();
    }
    self.draw = function() {
        ctx.fillRect(self.x,self.y,self.width,self.height);
    }
    self.updatePosition = function() {
    }
    self.testCollisionEntity = function(entity2) { //return if entities collide (true/false)
        let rect1 = {
            x:self.x,
            y:self.y,
            width:self.width,
            height:self.height,
        }
        let rect2 = {
            x:entity2.x,
            y:entity2.y,
            width:entity2.width,
            height:entity2.height,
        }
        return testCollisionsRect(rect1, rect2);
    }
    return self;
}
testCollisionsRect = function (rect1, rect2) {
    return rect1.x <= rect2.x+rect2.width 
    && rect2.x <= rect1.x+rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height;
}
getDistance = function(x1,y1,x2,y2) { //returns distance between two objects (number)
    /*var vx = x1 - x2;
    var vy = y1 - y2;
    return Math.sqrt(vx**2+vy**2);
    */
   return Math.abs(x1-x2) + Math.abs(y1-y2);
}