import add from '../src/add.js';
import *  as chai from 'chai';

const expect = chai.expect;

describe('Add test1', () => {
    it('1 + 1 should equal 2', () => {
    expect(add(1, 2)).to.equal(2);
    });
});