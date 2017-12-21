const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")
const History = require("../src/components/History")
const {Round} = require("rps")

describe("History component", function () {
    describe("getHistory says there are no rounds", function () {
        beforeEach(function () {
            renderHistory({ getHistory(observer){ observer.noRounds() }})
        })

        it("display NO ROUNDS to the user", function () {
            expect(page()).toContain("NO ROUNDS")
        })

    })

    describe("getHistory says there are rounds", function () {
        beforeEach(function () {
            renderHistory({ getHistory(observer){ observer.rounds([
                new Round("foo", "bar", "baz"),
                new Round("qux", "quux", "quuz"),
            ]) }})
        })

        it("display the rounds to the user", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
            expect(page()).toContain("qux")
            expect(page()).toContain("quux")
            expect(page()).toContain("quuz")
        })

    })

    function renderHistory(requests) {
        renderComponent(<History requests={requests}/>)
    }
})