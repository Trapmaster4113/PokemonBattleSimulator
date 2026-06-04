pokemon = function(name, type, moves, hp, atk, def, spa, spdf, spd) {
    var self = {
        name:name,
        type:type,
        moves:moves,
        hp:hp,
        atk:atk,
        def:def,
        spa:spa,
        spdf:spdf,
        spd:spd,
    };
    self.maxHP = hp;
    self.baseAtk = atk;
    self.baseDef = def;
    self.baseSpd = spd;
    self.moveNum = moves.length;
    self.maxStats = function() {
        self.hp = self.maxHP;
        self.atk = self.baseAtk; 
        self.def = self.baseDef;
        self.spd = self.baseSpd;
        for (let m in self.moves) {
            m.pp = m.maxPP;
        }
    }
    self.attack = function(target, move) {
        //console.log(self.name + " used " + self.moves[move].name);
        battleText += self.name + " used " + self.moves[move].name +"\n";
        self.moves[move].effect(self,target);
        userTurn = false;
    }
    self.toString = function() {
        return self.name;
    }
    return self;
}
priorityQueue = function() {
    let self = {
        l:[],
    };
    function swap (l, ind1, ind2) {
        let temp = l[ind1];
        l[ind1] = l[ind2];
        l[ind2] = temp;
        return l;
    }
    function sort(l) {
        if (l.length < 2) {
            return l;
        }
        for (let i = 0; i < l.length-1; i++) {
            for (let j = 0; j < l.length-i-1; j++) {
                if (l[j].spd < l[j+1].spd) {
                    swap(l,j,j+1);
                }
            }
        }
        return l;
    }
    self.append = function(val) {
        self.l.push(val);
        self.l = sort(self.l);
    }
    self.remove = function() {
        self.l.shift();
    }
    self.toString = function() {
        let s = "";
        for (let i of self.l) {
            s += i.toString()+", ";
        }
        return s;
    }
    return self;
}
function getTypeWeak(name) {
    let weak = [];
    switch (name) {
        case "normal":
            weak.push(...["fighting"]);
            break;
        case "fire":
            weak.push(...["water","rock","ground"]);
            break;
        case "water":
            weak.push(...["electric","grass"]);
            break;
        case "grass":
            weak.push(...["fire","ice","flying","poison","bug"]);
            break;
        case "electric":
            weak.push(...["ground"]);
            break;
        case "ice":
            weak.push(...["fighting","steel","rock","fire"]);
            break;
        case "fighting":
            weak.push(...["fairy","psychic","flying"]);
            break;
        case "poison":
            weak.push(...["ground","psychic"]);
            break;
        case "ground":
            weak.push(...["water","grass","ice"]);
            break;
        case "flying":
            weak.push(...["rock","electric","ice"]);
            break;
        case "psychic":
            weak.push(...["bug","dark","ghost"]);
            break;
        case "bug":
            weak.push(...["rock","flying","fire"]);
            break;
        case "rock":
            weak.push(...["steel","water","grass","fighting"]);
            break;
        case "ghost":
            weak.push(...["ghost","dark"]);
            break;
        case "dragon":
            weak.push(...["ice","dragon","fairy"]);
            break;
        case "dark":
            weak.push(...["bug","fairy","fighting"]);
            break;
        case "steel":
            weak.push(...["fighting","fire","ground"]);
            break;
        case "fairy":
            weak.push(...["poison", "steel"]);
            break;
    }
    return weak;
}
function getTypeResist(name) {
    let resist = [];
    switch (name) {
        case "fire":
            resist.push(...["fire","grass","ice","steel","fairy"]);
            break;
        case "water":
            resist.push(...["fire","water","ice","steel"]);
            break;
        case "grass":
            resist.push(...["water","electric","grass","ground"]);
            break;
        case "electric":
            resist.push(...["electric","flying","steel"]);
            break;
        case "ice":
            resist.push(...["ice"]);
            break;
        case "fighting":
            resist.push(...["bug","rock","dark"]);
            break;
        case "poison":
            resist.push(...["grass","fighting","poison","bug","fairy"]);
            break;
        case "ground":
            resist.push(...["poison","rock"]);
            break;
        case "flying":
            resist.push(...["grass","fighting"]);
            break;
        case "psychic":
            resist.push(...["psychic","fighting"]);
            break;
        case "bug":
            resist.push(...["grass","fighting","ground"]);
            break;
        case "rock":
            resist.push(...["flying","normal","fire","poison"]);
            break;
        case "ghost":
            resist.push(...["bug"]);
            break;
        case "dragon":
            resist.push(...["grass","fire","water","electric"]);
            break;
        case "dark":
            resist.push(...["ghost","dark"]);
            break;
        case "steel":
            resist.push(...["normal","grass","ice","flying","psychic","bug","rock","dragon","steel","fairy"]);
            break;
        case "fairy":
            resist.push(...["fighting","bug","dark"]);
            break;
    }
    return resist;
}
function getTypeImmune(name) {
    let immune = [];
    switch (name) {
        case "normal":
            immune.push(...["ghost"]);
            break;
        case "ground":
            immune.push(...["electric"]);
            break;
        case "flying":
            immune.push(...["ground"]);
            break;
        case "ghost":
            immune.push(...["fighting","normal"]);
            break;
        case "dark":
            immune.push(...["psychic"]);
            break;
        case "steel":
            immune.push(...["poison"]);
            break;
        case "fairy":
            immune.push(...["dragon"]);
            break;
    }
    return immune;
}
singleBattle = function(one,two) {
    var self = {};
    let justStarted = true;
    let newTurn = false;
    function battleOver() {
        return one.hp <= 0 || two.hp <= 0;
    }
    function battleReset() {
        one.maxStats();
        two.maxStats();
    }
    self.update = function() {
        let order = priorityQueue();
        order.append(one);
        order.append(two);
        drawBattleUI(order.l, !battleOver());
        if (justStarted) {
            battleReset();
            justStarted = false;
            battleText += "Go " + order.l[0].name + "\n";
            battleText += "Go " + order.l[1].name + "\n";
            userTurn = order.l[0] === one ? true : false;
        }
        if (battleOver()) {
            return;
        }
        if (!userTurn) {
            two.attack(one, Math.floor(Math.random()*two.moves.length));
            userTurn = true;
        }
    }
    return self;
}
//let is how you make variables in javascript. Can also use "const" for CONSTANTS or "var", but var is obselete and shouldn't be used as much (meant for global variables)
//Create 2 or more pokemon(Name (string), type (array of strings),moves (list of move variables), hp (number), atk (number), def (number), spa (number), spdf (number) spd (number))
//Moves are split into 2 categories: damageMove and statMove
//damageMove(name (string), type (string), pp (number), basePower (number), hit (number [chance to hit]), damageType (string [physical or special]))
//statMove(name (string), type (string), pp (number), hit (number), stat(string), amount increase (number), target(string [self or target]))
//let one = pokemon("Turtwig", ["grass"], [damageMove('Tackle', 'normal',35, 10, 100, "physical"),statMove('Withdraw','water',40,100,'def',1.5,'self'),damageMove('Absorb','grass',40,5,100, "special")], 20, 2, 5, 2, 5,50);
//let two = pokemon("Chimchar", ["fire"], [damageMove('Scratch', 'normal',35, 10, 100, "physical"),statMove('Leer', 'normal', 40, 100,'def',0.67,'target'),damageMove('Ember','fire',40,5,100, "special")], 20, 3, 3, 3,3,48);
//let thr = pokemon("Piplup", ["Water"], [damageMove('Pound', 'normal',35, 10, 100,"physical"),statMove('Growl','normal',40,100,'atk',0.67,'target'),damageMove('Bubble','water',40,5,100,'special')], 20, 3, 3, 3,3,3,49);
//let four = pokemon ("Shinx", ["Electric"], [damageMove('Tackle', 'normal',35, 10, 100, "physical"),statMove('Leer', 'normal', 40, 100,'def',0.67,'target'),damageMove('Spark','electric',40,5,100,'physical')], 20, 5, 2, 1,2,51);
//Create singleBattle object with 2 pokemon as arguments
//let bat = singleBattle(one, two);
//let bat2 = singleBattle(one,thr);
//This commands prints the battle in the console. Just do node.js Pokemon.js
//bat2.battle();
//bat.battle();
