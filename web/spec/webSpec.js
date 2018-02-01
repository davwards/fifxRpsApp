const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")

function PlayForm() { return <div></div>; }

describe("play round form", function () {
    describe("playRound requests processes as invalid", function () {
        it("display INVALID to the user", function () {
            const domFixture = document.createElement("div")
            document.body.appendChild(domFixture)

            ReactDOM.render(
                <PlayForm />,
                domFixture
            )

            expect(domFixture.innerText).not.toContain("INVALID")
            document.querySelector("button").click()
            expect(domFixture.innerText).toContain("INVALID")
        })

    })
})