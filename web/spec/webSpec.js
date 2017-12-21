const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")

describe("play round form", function () {
    describe("playRound requests processes as invalid", function () {
        beforeEach(function () {
            renderForm({ playRound(p1, p2, observer){ observer.invalid() }})
        })

        it("display INVALID to the user", function () {
            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })

    })

    describe("playRound requests processes as tie", function () {
        beforeEach(function () {
            renderForm({ playRound(p1, p2, observer){ observer.tie() }})
        })

        it("display TIE to the user", function () {
            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })

    })
    
    describe("playRound requests processes as p1 wins", function () {
        beforeEach(function () {
            renderForm({ playRound(p1, p2, observer){ observer.p1Wins() }})
        })

        it("display P1 Wins!!! to the user", function () {
            expect(page()).not.toContain("P1 WINS!!!")
            submitForm()
            expect(page()).toContain("P1 WINS!!!")
        })

    })
    describe("playRound requests processes as p2 wins", function () {
        beforeEach(function () {
            renderForm({ playRound(p1, p2, observer){ observer.p2Wins() }})
        })

        it("display P2 Wins!!! to the user", function () {
            expect(page()).not.toContain("P2 WINS!!!")
            submitForm()
            expect(page()).toContain("P2 WINS!!!")
        })

    })

    it("sends the user's input to the high level policy", function () {
        let playSpy = jasmine.createSpy()

        renderForm({ playRound: playSpy})

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
    })

    function fillIn(name, value) {
        let input = document.querySelector(`[name='${name}']`)
        input.value = value
        ReactTestUtils.Simulate.change(input)
    }

    function submitForm() {
        document.querySelector("button").click()
    }

    function renderForm(requests) {
        renderComponent(<PlayForm requests={requests}/>)
    }
})