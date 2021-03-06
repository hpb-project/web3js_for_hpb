var chai = require('chai');
var web3_hpb = require('../index');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'isSyncing';

var tests = [{
    args: [],
    formattedArgs: [],
    result: [{
        startingBlock: '0xb',
        currentBlock: '0xb',
        highestBlock: '0xb'
    }],
    formattedResult: {
        startingBlock: 11,
        currentBlock: 11,
        highestBlock: 11
    },
    call: 'hpb_syncing'
}, {
    args: [],
    formattedArgs: [],
    result: [{
        startingBlock: '0xb',
        currentBlock: '0xb',
        highestBlock: '0xb',
        knownStates: '0xb',
        pulledStates: '0xb'
    }],
    formattedResult: {
        startingBlock: 11,
        currentBlock: 11,
        highestBlock: 11,
        knownStates: 11,
        pulledStates: 11
    },
    call: 'hpb_syncing'
}];

describe('hpb', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function (done) {
                // given
                var provider = new FakeHttpProvider();
                var web3_hpb = new web3_hpb(provider);
                provider.injectBatchResults(test.result);
                provider.injectValidation(function(payload) {
                    assert.equal(payload[0].jsonrpc, '2.0', 'failed');
                    assert.equal(payload[0].method, test.call);
                    assert.deepEqual(payload[0].params, test.formattedArgs);
                });

                var count = 1;

                // TODO results seem to be overwritten


                // call
                var syncing = web3_hpb.hpb[method](function(e, res){
                    if(count === 1) {
                        assert.isTrue(res);
                        count++;
                    } else {
                        assert.deepEqual(res, test.formattedResult);
                        syncing.stopWatching();
                        done();
                    }
                });

            });
        });
    });
});

