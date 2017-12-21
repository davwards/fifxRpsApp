const React = require("react")

class PlayForm extends React.Component {
    constructor(){
        super()

        this.state = {}
    }

    handleSubmit(){
        this.props.requests.playRound(this.state.p1Throw, this.state.p2Throw, this)
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

module.exports = PlayForm