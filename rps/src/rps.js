function Requests(roundRepo){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo).process()
    }

    this.getHistory = function(observer){
        if (roundRepo.isEmpty())
            observer.noRounds()
        else
            observer.rounds(roundRepo.all())
    }
}

function Round(p1Throw, p2Throw, result){
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

function PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo){
    this.process = function(){
        if (invalidThrow(p1Throw) || invalidThrow(p2Throw))
            processAs("invalid")
        else if (tie())
            processAs("tie")
        else if (p1Wins())
            processAs("p1Wins")
        else
            processAs("p2Wins")
    }

    function processAs(result) {
        roundRepo.save(new Round(p1Throw, p2Throw, result))
        observer[result]()
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
    Requests,
    Round,
}