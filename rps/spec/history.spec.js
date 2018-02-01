const Requests = require('../src/rps').Requests;

xdescribe('getting history', function () {
    describe('when no rounds have been played', function () {
        it('reports that there are no rounds', function() {
            const ui = {
                invalid: fail,
                p1Wins: fail,
                p2Wins: fail,
                tie: fail,
                noRounds: jasmine.createSpy('noRounds')
            };

            new Requests().history(ui)

            expect(ui.noRounds).toHaveBeenCalled();
        });
    });

    describe('when some rounds have been played', function () {
        it('reports a list of the rounds', function() {
            const playRoundUI = {
                invalid: () => {},
                p1Wins: () => {},
                p2Wins: () => {},
                tie: () => {}
            };

            const historyUI = {
                noRounds: fail,
                rounds: jasmine.createSpy("rounds")
            };

            const useCases = new Requests();

            const roundRepo = new FakeRoundRepo();

            useCases.playRound('Rock', 'Scissors', playRoundUI, roundRepo);

            useCases.history(historyUI, roundRepo);

            expect(historyUI.rounds).toHaveBeenCalled();
        });
    });
});