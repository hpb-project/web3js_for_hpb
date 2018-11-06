var chai = require('chai');
var web3_hpb = require('../index');
var testMhpbod = require('./helpers/test.method.js');

var method = 'newAccount';

var tests = [{
    args: ['P@ssw0rd!'],
    formattedArgs: ['P@ssw0rd!'],
    result: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855'],
    formattedResult: ['0x47d33b27bb249a2dbab4c0612bf9caf4c1950855'],
    call: 'personal_'+ method
}];

testMhpbod.runTests('personal', method, tests);
