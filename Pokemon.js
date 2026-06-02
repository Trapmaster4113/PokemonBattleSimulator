pokemon = function(name, type, moves, hp, atk, def, spd) {
    var self = {
        name:name,
        type:type,
        moves:moves,
        hp:hp,
        atk:atk,
        def:def,
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
    self.attack = function(target) {
        let move = Math.floor(Math.random()*self.moveNum);
        console.log(self.name + " used " + self.moves[move].name);
        self.moves[move].effect(self,target);
    }
    self.toString = function() {
        return self.name;
    }
    return self;
}
move = function(name, type, pp) {
    let self = {
        name:name,
        type:type,
        type2:type2,
        pp:pp,
    }
    self.maxPP = pp;
    return self;
}
damageMove = function(name, type, pp, basePower,hit) {
    let self = move(name,type,pp);
    self.basePower = basePower;
    self.hit = hit;
    self.effect = function(user, target) {
        if (Math.floor(Math.random()*100) <= self.hit) {
            let damage = self.basePower + user.atk - target.def;
            if (damage <= 0) {
                damage = 1;
            }
            target.hp -= damage;
            console.log(user.name + " dealt " + (damage));
            //filler damage calc
        }
        else {
            console.log(self.name + " missed");
        }
    }
    return self;
}
statMove = function(name,type,pp,hit,stat,amount,receiver) {
    let self = move(name,type,pp);
    self.hit = hit;
    self.stat = stat;
    self.amount = amount;
    self.receiver = "";
    self.effect = function(user, target) {
        self.receiver = receiver === "self" ? user : target;
        let word = amount > 1 ? "rose" : "shrunk";
        switch (stat) {
            case 'atk':
                self.receiver.atk*=self.amount;
            case 'def':
                self.receiver.def*=self.amount;
            case 'spd':
                self.receiver.spd*=self.amount;
        }
        console.log(self.receiver.name + "'s " + self.stat + " " + word + " by " + self.amount);
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
let test = priorityQueue();
//console.log(test.toString());
let one = pokemon("Turtwig", ["Grass"], [damageMove('Tackle', 'Normal',35, 10, 100, null),statMove('Withdraw','Water',40,100,'def',1.5,'self')], 20, 3, 5, 50);
let two = pokemon("Chimchar", ["Fire"], [damageMove('Scratch', 'Normal',35, 10, 100,null),statMove('Leer', 'Normal', 40, 100,'def',0.67,'target')], 20, 3, 5, 48);
test.append(one);
//console.log(test.toString());
test.append(two);
/*//console.log(test.toString());
let three = pokemon("Piplup", ["Water"], [move('Tackle', 'Normal',35, 50, 60,null)], 100, 50, 50, 51);
test.append(three);
//console.log(test.toString());
let four = pokemon ("Shinx", ["Electric"], [move('Tackle', 'Normal',35, 50, 60,null)], 100, 50, 50, 49);
test.append(four);
//console.log(test.toString());
//*/
singleBattle = function(one,two) {
    var self = {};
    function battleOver() {
        return one.hp <= 0 || two.hp <= 0;
    }
    function battleReset() {
        one.maxStats();
        two.maxStats();
    }
    self.battle = function() {
        battleReset();
        ///*
        while (!battleOver()) {
            let order = priorityQueue();
            order.append(one);
            order.append(two);
            
            order.l[0].attack(order.l[1]);
            if (battleOver()) {
                console.log(order.l[0] + " wins");
                break;
            }
            order.l[1].attack(order.l[0]);
            if (battleOver()) {
                console.log(order.l[1] + " wins");
            }
            console.log(order.l[0] + ": " + order.l[0].hp)
            console.log(order.l[1] + ": " + order.l[1].hp)
        }//*/
    }
    return self;
}
let bat = singleBattle(one, two);
bat.battle();
