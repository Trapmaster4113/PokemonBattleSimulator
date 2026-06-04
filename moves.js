move = function(name, type, pp) {
    let self = {
        name:name,
        type:type,
        pp:pp,
    }
    self.maxPP = pp;
    self.toString = function() {
        return self.name;
    }
    return self;
}
damageMove = function(name, type, pp, basePower, hit, damageType) {
    let self = move(name,type,pp);
    self.basePower = basePower;
    self.hit = hit;
    self.damageType = damageType;
    self.effect = function(user, target) {
        if (Math.floor(Math.random()*100) <= self.hit) {
            let userStat = self.damageType === "physical" ? user.atk : user.spa;
            let damage = Math.floor(self.basePower + userStat - target.def);
            if (user.type.includes(self.type)) {
                damage = Math.floor(damage*1.5);
            }
            for (let i of target.type) {
                if (getTypeImmune(i).includes(self.type)) {
                    damage = 0;
                    console.log(self.name + " doesn't affect " + target.name);
                }
                else if (getTypeWeak(i).includes(self.type)) {
                    damage *= 2;
                    console.log(self.name + " is super effect against " + target.name);
                }
                else if (getTypeResist(i).includes(self.type)) {
                    damage = Math.floor(damage/2);
                    console.log(self.name + " is not very effect against " + target.name);
                }
            }
            if (damage < 0) {
                damage = 1;
            }
            target.hp -= damage;
            if (target.hp <= 0) {
                target.hp = 0;
            }
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
                self.receiver.atk = Math.floor(self.receiver.atk*self.amount);
                break;
            case 'def':
                self.receiver.def = Math.floor(self.receiver.def*self.amount);
                break;
            case 'spd':
                self.receiver.spd = Math.floor(self.receiver.spd*self.amount);
                break;
        }
        console.log(self.receiver.name + "'s " + self.stat + " " + word + " by " + self.amount);
    }
    return self;
}