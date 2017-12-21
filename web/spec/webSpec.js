const ReactDOM = require("react-dom")
const React = require("react")
const ReactTestUtils = require("react-dom/test-utils")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    handleSubmit(){
        this.props.requests.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    invalid(){
        this.setState({status: "INVALID"})
    }

    tie(){
        this.setState({status: "TIE"})
    }

    p1Wins(){
        this.setState({status: "P1 WINS!!!"})
    }
    
    p2Wins(){
        this.setState({status: "P2 WINS!!!"})
    }

    inputChanged(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return <div>
            <input type="text" name="p1Throw" onChange={this.inputChanged.bind(this)}/>
            <input type="text" name="p2Throw" onChange={this.inputChanged.bind(this)}/>

            <button onClick={this.handleSubmit.bind(this)}>{this.state.status}</button>
            </div>
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
    
    describe("playRound requests processes as p1 wins", function () {
        beforeEach(function () {
            requests = { play(p1, p2, observer){ observer.p1Wins() }}
        })

        it("display P1 Wins!!! to the user", function () {
            renderForm()

            expect(page()).not.toContain("P1 WINS!!!")
            submitForm()
            expect(page()).toContain("P1 WINS!!!")
        })

    })
    describe("playRound requests processes as p2 wins", function () {
        beforeEach(function () {
            requests = { play(p1, p2, observer){ observer.p2Wins() }}
        })

        it("display P2 Wins!!! to the user", function () {
            renderForm()

            expect(page()).not.toContain("P2 WINS!!!")
            submitForm()
            expect(page()).toContain("P2 WINS!!!")
        })

    })

    function fillIn(name, value) {
        let input = document.querySelector(`[name='${name}']`)
        input.value = value
        ReactTestUtils.Simulate.change(input)
    }

    it("sends the user's input to the high level policy", function () {
        let playSpy = jasmine.createSpy()
        
        requests = { play: playSpy}
        
        renderForm()

        fillIn("p1Throw", "foo")
        fillIn("p2Throw", "bar")

        submitForm()

        expect(playSpy).toHaveBeenCalledWith("foo", "bar", jasmine.any(Object))
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