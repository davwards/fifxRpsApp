const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")

class PlayForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            p1: '',
            p2: ''
        }
    }

    invalid() {
        this.setState({ message: 'INVALID' });
    }

    p1Wins() {
        this.setState({ message: 'P1 Wins!' });
    }

    p2Wins() {
        this.setState({ message: 'P2 Wins!' });
    }

    tie() {
        this.setState({ message: 'Tie!' });
    }

    noRounds() {}

    rounds() {}

    buttonClicked() {
        this.props.useCases.playRound(this.state.p1, this.state.p2, this)
    }

    p1Changed(event) {
        this.setState({ p1: event.target.value });
    }

    p2Changed(event) {
        this.setState({ p2: event.target.value });
    }

    render() {
        return <div>
            <h1>{this.state.message}</h1>
            <input name="p1" onChange={this.p1Changed.bind(this)}/>
            <input name="p2" onChange={this.p2Changed.bind(this)}/>
            <button onClick={this.buttonClicked.bind(this)}>Play</button>
        </div>;
    }
}

describe("play round form", function () {
    let domFixture;

    describe("when the use case tells the ui that the input is invalid", function () {
        it("display INVALID to the user", function () {
            renderApp({
                playRound: function(p1, p2, ui) {
                    ui.invalid();
                }
            });

            expect(page()).not.toContain("INVALID");
            play();
            expect(page()).toContain("INVALID");
        });
    });

    describe('when the use case tells the ui that P1 is the winner', function () {
        it("displays P1 Wins! to the user", function() {
            renderApp({
                playRound: function(p1, p2, ui) {
                    ui.p1Wins();
                }
            });

            expect(page()).not.toContain("P1 Wins!");
            play();
            expect(page()).toContain("P1 Wins!");
        })
    });

    describe('when the use case tells the ui that P2 is the winner', function () {
        it("displays P2 Wins! to the user", function() {
            renderApp({
                playRound: function(p1, p2, ui) {
                    ui.p2Wins();
                }
            });

            expect(page()).not.toContain("P2 Wins!");
            play();
            expect(page()).toContain("P2 Wins!");
        })
    });

    describe('when the use case tells the ui that it was a tie', function () {
        it('displays Tie! to the user', function() {
            renderApp({
                playRound: function(p1, p2, ui) {
                    ui.tie();
                }
            });

            expect(page()).not.toContain("Tie!");
            play();
            expect(page()).toContain("Tie!");
        });
    });

    it('passes the values of the p1 and p2 fields to the playRound method', function() {
        const rpsSpy = {
            playRound: jasmine.createSpy('playRound')
        };
        renderApp(rpsSpy);

        document.querySelector('input[name="p1"]').value = "Rock";
        ReactTestUtils.Simulate.change(document.querySelector('input[name="p1"]'));

        document.querySelector('input[name="p2"]').value = "Scissors";
        ReactTestUtils.Simulate.change(document.querySelector('input[name="p2"]'));

        play();
        expect(rpsSpy.playRound).toHaveBeenCalledWith("Rock", "Scissors", jasmine.anything());
    });

    afterEach(function() {
        domFixture.remove();
    });

    function page() {
        return domFixture.innerText;
    }

    function play() {
        document.querySelector("button").click()
    }

    function renderApp(rpsStub) {
        ReactDOM.render(
            <PlayForm useCases={rpsStub}/>,
            domFixture
        )
    }

    beforeEach(function() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    })
})