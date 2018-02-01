const contract = require('./roundRepo.contract');

function FakeRoundRepo() {
    const contents = [];

    this.findAll = function() {
        return contents;
    };

    this.save = function() {
        contents.push('bananas');
    };
}

contract(function() {
    return new FakeRoundRepo();
});