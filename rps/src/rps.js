function Requests(){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.process = function(){
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            observer.invalid()
        else if (tie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    function tie() {
        return p1Throw === p2Throw
    }

    function p1Wins() {
        return (
            p1Throw === ROCK     && p2Throw === SCISSORS  ||
            p1Throw === SCISSORS && p2Throw === PAPER     ||
            p1Throw === PAPER    && p2Throw === ROCK
        )
    }

    function invalidThrow(theThrow) {
        return !VALID_THROWS.includes(theThrow)
    }


    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    const VALID_THROWS = [ROCK, PAPER, SCISSORS]
}

module.exports = {
    Requests
}