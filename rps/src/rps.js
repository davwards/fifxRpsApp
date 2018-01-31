function Requests() {
    this.playRound = function(p1, p2, ui) {
        new PlayRoundRequest(p1, p2, ui).execute();
    }
}

function PlayRoundRequest(p1, p2, ui) {
    function invalidThrow() {
        const validThrows = ['Rock', 'Paper', 'Scissors'];
        return !validThrows.includes(p1) || !validThrows.includes(p2);
    }

    function p2Wins() {
        return (p1 === 'Scissors' && p2 === 'Rock') ||
            (p1 === 'Rock' && p2 === 'Paper') ||
            (p1 === 'Paper' && p2 === 'Scissors');
    }

    function tie() {
        return p1 === p2;
    }

    this.execute = function() {
        if(invalidThrow()) {
            ui.invalid();
        } else if(tie()) {
            ui.tie();
        } else if(p2Wins()) {
            ui.p2Wins();
        } else {
            ui.p1Wins();
        }
    }
}

module.exports = { Requests };