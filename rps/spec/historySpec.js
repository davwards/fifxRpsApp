const {Requests, Round} = require("../src/rps")

describe("history", function () {

    describe("no one has played", function () {
        it("tells the observer there are no rounds", function () {
            let observer = jasmine.createSpyObj("observer", ["noRounds"])

            new Requests().getHistory(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe("rounds have been played", function () {
        it("sends the rounds to the observer", function () {
            let playObserver = {tie(){}}
            let roundRepo = {
                isEmpty(){},
                all(){},
                save(){}
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

function FakeRoundRepo(){
    let empty = true

    this.isEmpty = function(){
        return empty
    }

    this.save = function(){
        empty = false
    }
}

fdescribe("round repo", function () {
    describe("no rounds have been saved", function () {
        it("is empty", function () {
            expect(new FakeRoundRepo().isEmpty()).toBe(true)
        })
    })

    describe("when rounds have been saved", function () {
        it("is not empty", function () {
            let roundRepo = new FakeRoundRepo()

            roundRepo.save(new Round())

            expect(roundRepo.isEmpty()).toBe(false)
        })

        it("returns the rounds that have been saved", function () {
            let roundRepo = new FakeRoundRepo()

            const round1 = new Round("round1")
            const round2 = new Round("round2")

            roundRepo.save(round1)
            roundRepo.save(round2)

            expect(roundRepo.all()).toContain(round1)
            expect(roundRepo.all()).toContain(round2)
        })

    })

})





