const React = require("react")

class History extends React.Component {
    constructor(){
        super()
        this.state = {}
    }
    componentDidMount(){
        this.props.requests.getHistory(this)
    }

    noRounds(){
        this.setState({status: <NoRounds/>})
    }

    rounds(rs){
        this.setState({status: <Rounds rounds={rs}/>})
    }

    render(){
        return <div>
            {this.state.status}
        </div>
    }
}

class Rounds extends React.Component {
    render(){
        return <table>
            <thead>
                <tr>
                    <td>P1 Throw</td>
                    <td>P2 Throw</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
                {this.props.rounds.map((r, i) => {
                    return <tr key={i}>
                        <td>{r.p1Throw}</td>
                        <td>{r.p2Throw}</td>
                        <td>{r.result}</td>
                    </tr>
                })}
            </tbody>
        </table>
    }
}


class NoRounds extends React.Component {
    render(){
        return <p>
            NO ROUNDS
        </p>
    }
}

module.exports = History