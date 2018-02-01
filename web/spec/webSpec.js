const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const PlayForm = require("../src/components/PlayForm")

describe("play round form", function () {
    describe("playRound requests processes as invalid", function () {
        it("display ----- to the user", function () {

            domFixture = document.createElement("div")
            document.body.appendChild(domFixture)

            ReactDOM.render(
            <PlayForm requests={{}}/>,
            domFixture
        )

            expect(domFixture.innerText).not.toContain("INVALID")
            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })

    })
})