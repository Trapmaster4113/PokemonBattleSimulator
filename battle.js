singleBattle = function(ally,enemy) {
    fighting = true;
    var self = {};
    let justStarted = true;
    let newTurn = false;
    function battleOver() {
        return checkTeamWipe(ally) || checkTeamWipe(enemy);
    }
    function checkTeamWipe(team) {
        for (let p of team) {
            if (p.hp != 0) {
                return false;
            }
        }
        return true;
    }
    function checkWinner() {
        let allyWin = checkTeamWipe(enemy)? true : false;
        if (allyWin) {
            console.log("Player win");
        }
        else {
            console.log("Enemy win");
        }
    }
    function battleReset() {
        for (let p of ally) {
            p.maxStats();
        }
        for (let p of enemy) {
            p.maxStats();
        }
    }
    function getOrder() {
        let order = priorityQueue();
        order.append(ally[0]);
        order.append(enemy[0]);
        return order;
    }
    function battleStart() {
        let order = getOrder();
    }
    function swap() {

    }
    function item() {

    }
    function fight() {
        let order = getOrder();
        if (!userTurn) {
            enemy[0].attack(ally[0], Math.floor(Math.random()*enemy[0].moves.length));
            userTurn = true;
        }
    }
    self.update = function() {
        let order = getOrder();
        drawBattleUI(ally, enemy, !battleOver());
        if (justStarted) {
            battleReset();
            justStarted = false;
            battleText += "Go " + order.l[0].name + "\n";
            battleText += "Go " + order.l[1].name + "\n";
            userTurn = order.l[0] === ally[0] ? true : false;
        }
        if (battleOver()) {
            checkWinner();
            fighting = false;
            return;
        }
        fight();
        
    }
    return self;
}