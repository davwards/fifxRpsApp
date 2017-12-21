const {Requests, Round} = require("../src/rps")

describe("history", function () {

    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    fdescribe("rounds have been played", function () {
        it("sends the rounds to the observer", function () {
            let playObserver = {tie(){}}
            let roundRepo = {
                isEmpty(){},
                all(){}
            }
            let observer = jasmine.createSpyObj("observer", ["rounds"])

            new Requests().playRound("rock", "rock", playObserver, roundRepo)

            new Requests().getHistory(observer, roundRepo)

            expect(observer.rounds).toHaveBeenCalledWith(
                [
                    new Round("rock", "rock", "tie")
                ]
            )
        })

    })

})