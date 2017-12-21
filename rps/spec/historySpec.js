const {Requests, Round} = require("../src/rps")
const FakeRoundRepo = require("./FakeRoundRepo")

describe("history", function () {
    let requests

    beforeEach(function () {
        requests = new Requests(new FakeRoundRepo())
    })

    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            requests.getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("rounds have been played", function () {
        it("sends the rounds to the observer", function () {
            let playObserver = {tie(){}, p2Wins(){}, p1Wins(){}, invalid(){}}
            let observer = jasmine.createSpyObj("observer", ["rounds"])

            requests.playRound("rock", "rock", playObserver)
            requests.playRound("rock", "paper", playObserver)
            requests.playRound("paper", "rock", playObserver)
            requests.playRound("rock", "sailboat", playObserver)

            requests.getHistory(observer)

            expect(observer.rounds).toHaveBeenCalledWith(
                [
                    new Round("rock", "rock", "tie"),
                    new Round("rock", "paper", "p2"),
                    new Round("paper", "rock", "p1"),
                    new Round("rock", "sailboat", "invalid"),
                ]
            )
        })

    })

})




