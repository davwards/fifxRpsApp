const ReactDOM = require("react-dom")
const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    handleSubmit(){
        this.props.requests.play("p1 placeholder", "p2 throw placeholder", this)
    }

    invalid(){
        this.setState({status: "INVALID"})
    }

    tie(){
        this.setState({status: "TIE"})
    }

    render(){
        return <button onClick={this.handleSubmit.bind(this)}>{this.state.status}</button>
    }
}

describe("play round form", function () {
    describe("playRound requests processes as invalid", function () {
        beforeEach(function () {
            requests = { play(p1, p2, observer){ observer.invalid() }}
        })

        it("display INVALID to the user", function () {
            renderForm()

            expect(page()).not.toContain("INVALID")
            submitForm()
            expect(page()).toContain("INVALID")
        })

    })

    describe("playRound requests processes as tie", function () {
        beforeEach(function () {
            requests = { play(p1, p2, observer){ observer.tie() }}
        })

        it("display TIE to the user", function () {
            renderForm()

            expect(page()).not.toContain("TIE")
            submitForm()
            expect(page()).toContain("TIE")
        })

    })
    let domFixture, requests

    function setupDom() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    }

    beforeEach(function () {
        setupDom()
    })

    function renderForm() {
        ReactDOM.render(
            <PlayForm requests={requests}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText;
    }

    function submitForm() {
        document.querySelector("button").click()
    }

    afterEach(function () {
        domFixture.remove()
    })
})