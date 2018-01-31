const Requests = require('./rps').Requests;

describe('Playing a round of RPS', function () {
    let ui;
    let requests;

    beforeEach(function() {
        requests = new Requests();
    });

    describe('Invalid Input', function () {
        beforeEach(function () {
            ui = {
                invalid: jasmine.createSpy('invalid'),
                p1Wins: fail,
                p2Wins: fail,
                tie: fail
            };
        });

        describe('Rock vs Sailboat', function () {
            it('reports that input is invalid', function () {
                requests.playRound('Rock', 'Sailboat', ui);
                expect(ui.invalid).toHaveBeenCalled();
            });
        });

        describe('when p1 throws Sailboat and p2 throws Scissors', function () {
            it('tells the ui that the input is invalid', function() {
                requests.playRound('Sailboat', 'Scissors', ui);
                expect(ui.invalid).toHaveBeenCalled();
            });
        });

        describe('Sailboat vs Sailboat', function () {
            it('tells the ui that the input is invalid', function() {
                requests.playRound('Sailboat', 'Sailboat', ui);
                expect(ui.invalid).toHaveBeenCalled();
            })
        });

        describe('Rock vs Motorboat', function () {
            it('tells the ui that the input is invalid', function() {
                requests.playRound('Rock', 'Motorboat', ui);
                expect(ui.invalid).toHaveBeenCalled();
            })
        });

        describe('any invalid input', function () {
            it('tells the ui that the input is invalid', function() {
                const invalidValue = Math.round(Math.random() * 100).toString();
                requests.playRound(invalidValue, invalidValue, ui);
                expect(ui.invalid).toHaveBeenCalled();
            });
        });
    });

    describe('p1 win conditions', function() {
        beforeEach(function() {
            ui = {
                invalid: fail,
                p1Wins: jasmine.createSpy('p1Wins'),
                p2Wins: fail,
                tie: fail
            };
        });

        describe('Rock vs Scissors', function () {
            it('tells the ui that p1 wins', function () {
                requests.playRound('Rock', 'Scissors', ui);
                expect(ui.p1Wins).toHaveBeenCalled();
            });
        });

        describe('Scissors vs Paper', function () {
            it('tells the ui that p1 wins', function () {
                requests.playRound('Scissors', 'Paper', ui);
                expect(ui.p1Wins).toHaveBeenCalled();
            });
        });

        describe('Paper vs Rock', function () {
            it('tells the ui that p1 wins', function() {
                requests.playRound('Paper', 'Rock', ui);
                expect(ui.p1Wins).toHaveBeenCalled();
            });
        });
    });

    describe('p2 win conditions', function () {
        beforeEach(function() {
            ui = {
                p2Wins: jasmine.createSpy('p2Wins'),
                p1Wins: fail,
                tie: fail,
                invalid: fail
            }
        });

        describe('Scissors vs Rock', function () {
            it('reports that p2 wins', function () {
                requests.playRound('Scissors', 'Rock', ui);
                expect(ui.p2Wins).toHaveBeenCalled();
            });
        });

        describe('Rock vs Paper', function() {
            it('reports that p2 wins', function () {
                requests.playRound('Rock', 'Paper', ui);
                expect(ui.p2Wins).toHaveBeenCalled();
            });
        });

        describe('Paper vs Scissors', function () {
            it('reports that p2 wins', function () {
                requests.playRound('Paper', 'Scissors', ui);
                expect(ui.p2Wins).toHaveBeenCalled();
            });
        });
    });

    describe('tie conditions', function () {
        beforeEach(function() {
            ui = {
                tie: jasmine.createSpy('tie'),
                invalid: fail,
                p1Wins: fail,
                p2Wins: fail
            }
        });

        describe('Rock vs Rock', function () {
            it('reports a tie', function () {
                requests.playRound('Rock', 'Rock', ui);
                expect(ui.tie).toHaveBeenCalled();
            });
        });

        describe('Paper vs Paper', function () {
            it('reports a tie', function() {
                requests.playRound('Paper', 'Paper', ui);
                expect(ui.tie).toHaveBeenCalled();
            })
        });

        describe('Scissors vs Scissors', function () {
            it('reports a tie', function() {
                requests.playRound('Scissors', 'Scissors', ui);
                expect(ui.tie).toHaveBeenCalled();
            })
        });
    });
});