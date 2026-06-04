ui = function(x,y,width, height,color, test) {
    let self = obj(x,y,width,height);
    self.draw = function() {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(self.x,self.y,self.width,self.height);
        ctx.restore();
    }
    self.clicked = function() { 
        return self.testCollisionEntity(mouse) && click === 1;
    }
    self.update = function() {
        self.draw();
        if (self.clicked() && click === 1) {
            click++;
            console.log(test);
        }
    }
    self.toString = function() {
        return test;
    }
    return self;
}
drawBattleUI = function(l) {
    if (l.length === 2) {
        //Enemy Pokemon
        drawBeneath(WIDTH/4, HEIGHT*13/16);
        drawHPBar(0,HEIGHT/16,l[1]);
        //Ally Pokemon
        drawBeneath(WIDTH*3/4, HEIGHT*3/16);
        drawHPBar(WIDTH*5/8,HEIGHT*9/16,l[0]);
        drawFightUI(WIDTH*5/8,HEIGHT*10/16,l[0])
        drawPokemon(WIDTH*6/32, HEIGHT*24/32, l[0]);
        drawPokemon(WIDTH*22/32, HEIGHT*4/32, l[1]);
    }
}
drawFightUI = function(x,y,pokemon) {
    ctx.save();
    ctx.fillStyle = "rgba(60,60,60,0.25)";
    ctx.fillRect(x, y, WIDTH*3/8,HEIGHT*11/32);
    ctx.restore();
}
drawMoveUI = function(x, y, pokemon, target, num) {
    let self = ui(x,y, WIDTH*11/64, HEIGHT*9/64, 'red', num);
    if (pokemon.moves.length <= num) {
        self.update = function() {

        }
        return self;
    }
    let super_draw = self.draw;
    self.draw = function() {
        super_draw();
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillText(pokemon.moves[num].name, self.x+self.width/2, self.y+self.height/2);
        ctx.restore();
    }
    let super_update = self.update();
    self.update = function() {
        self.draw();
        if (self.clicked() && userTurn) {
            click++;
            pokemon.attack(target, num);
        }
    }
    return self;
}
drawHPBar = function(x,y, pokemon) {
    ctx.save();
    ctx.fillStyle = "rgba(196, 196, 196, 0.5)";
    ctx.fillRect(x,y, WIDTH*3/8,HEIGHT/16);
    ctx.fillStyle = "Green";
    ctx.fillRect(x+WIDTH/64,y+HEIGHT/64,WIDTH*22/64*pokemon.hp/pokemon.maxHP, HEIGHT/32);
    ctx.restore();
    ctx.fillText(pokemon.name, x, y);
}
drawPokemon = function(x, y, pokemon) {
    if (pokemon.hp <= 0) {
        console.log(pokemon.name + " fainted");
        return;
    }
    ctx.save();
    switch (pokemon.type[0]) {
        case "fire":
            ctx.fillStyle = "orange";
            break
        case "water":
            ctx.fillStyle = "blue";
            break;
        case "grass":
            ctx.fillStyle = "green";
            break;
        case "normal":
            ctx.fillStyle = "gray";
            break;
        case "electric":
            ctx.fillStyle = "yellow";
            break;
        case "ground":
            ctx.fillStyle = "gold";
            break;
        case "rock":
            ctx.fillStyle = "brown";
            break;
        case "flying":
            ctx.fillStyle = "DodgerBlue";
            break;
        case "fighting":
            ctx.fillStyle = "red";
            break;
        case "psychic":
            ctx.fillStyle = "fuchsia";
            break;
        case "dark":
            ctx.fillStyle = "black";
            break;
        case "bug":
            ctx.fillStyle = "lime";
            break;
        case "dragon":
            ctx.fillStyle = "navy";
            break;
        case "fairy":
            ctx.fillStyle = "pink";
            break;
        case "ice":
            ctx.fillStyle = "lightblue";
            break;
        case "steel":
            ctx.fillStyle = "darkgray";
            break;
        case "poison":
            ctx.fillStyle = "darkpurple";
            break;
        case "ghost":
            ctx.fillStyle = "purple";
            break;
    }
    ctx.fillRect(x,y, WIDTH/8, HEIGHT/8);
    ctx.restore();
}
drawBeneath = function(x,y) {
    ctx.save();
    ctx.fillStyle = "rgba(160,160,160,0.3)";
    ctx.beginPath();
    //x position, y position, width, height, rotation, start angle, end angle);
    ctx.ellipse(x,y, WIDTH*5/32, HEIGHT*5/32,0,0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}