const {Round} = require("../src/rps")

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

module.exports = roundRepoContract