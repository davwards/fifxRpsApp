module.exports = function roundRepoContract(buildRepo) {

    describe('RoundRepo', function () {
        describe('no rounds have ever been saved', function () {
            it('returns an empty list from findAll', function() {
                const roundRepo = buildRepo();
                expect(roundRepo.findAll().length).toEqual(0);
            })
        });

        describe('some rounds have been saved', function () {
            it('returns a non-empty list', function() {
                const roundRepo = buildRepo();
                roundRepo.save({});
                expect(roundRepo.findAll().length).toBeGreaterThan(0)
            })
        });
    });

}