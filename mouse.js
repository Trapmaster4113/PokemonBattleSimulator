createMouse = function() {
    var self = obj(mouseX,mouseY,1,1);
    var super_update = self.update;
    self.clicked = false;
    self.update = function() {
        self.updatePosition();
        self.draw();
    }
    var super_updatePosition = self.updatePosition;
    self.updatePosition = function() {
        self.x = mouseX;
        self.y = mouseY;
    }
    var super_draw = self.draw;
    self.draw = function() {
        ctx.save();
        ctx.fillStyle='black';
        ctx.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);
        ctx.restore();
    }
    self.justClicked = function() {
        return self.clicked && click == 1;
    }
    return self;
}
inputSetUp = function() {
    canvas.addEventListener('mousedown', (e) => {  
        mouse.clicked = true;
        click+=1;
    });
    canvas.addEventListener('mouseup', (e) => {
        if (click !=0 && mouse.clicked) {
            click = 0;
            mouse.clicked = false;
        }

    });
    document.onmousemove = function(mouse) {
        mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left; //8
        mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top; //8
    }
}