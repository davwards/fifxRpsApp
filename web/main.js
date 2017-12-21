const ReactDOM = require("react-dom")
const React = require("react")
const History = require("./src/components/History")
const PlayForm = require("./src/components/PlayForm")
const {Requests} = require("rps")


class App extends React.Component {
    render(){
        return <div>
            <PlayForm requests={this.props.requests}/>
            <History requests={this.props.requests}/>
        </div>
    }
}

function FakeRoundRepo(){
    let rounds = []

    this.isEmpty = function(){
        return rounds.length === 0
    }

    this.save = function(r){
        rounds.push(r)
    }

    this.all = function(){
        return rounds
    }
}

let repo = new FakeRoundRepo()

ReactDOM.render(
    <App requests={new Requests(repo)}/>,
    document.querySelector("#app")
)