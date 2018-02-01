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