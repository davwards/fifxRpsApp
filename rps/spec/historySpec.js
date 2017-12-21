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
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.all = function(){
        return rounds
    }
}


function roundRepoContract(roundRepoClass){
    describe("round repo", function () {
        let roundRepo

        beforeEach(function () {
            roundRepo = new roundRepoClass()
        })

        describe("no rounds have been saved", function () {
            it("is empty", function () {
                expect(roundRepo.isEmpty()).toBe(true)
            })
        })

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                roundRepo.save(new Round())

                expect(roundRepo.isEmpty()).toBe(false)
            })

            it("returns the rounds that have been saved", function () {
                const round1 = new Round("round1")
                const round2 = new Round("round2")

                roundRepo.save(round1)
                roundRepo.save(round2)

                expect(roundRepo.all()).toContain(round1)
                expect(roundRepo.all()).toContain(round2)
            })

        })

    })
}

roundRepoContract(FakeRoundRepo)