import add from '../src/add.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('Add Function Tests', () => {
    // Basic functionality
    it('1 + 1 should equal 2', () => {
        expect(add(1, 1)).to.equal(2);
    });

    it('0 + 0 should equal 0', () => {
        expect(add(0, 0)).to.equal(0);
    });

    it('-1 + -1 should equal -2', () => {
        expect(add(-1, -1)).to.equal(-2);
    });

    it('2.5 + 3.5 should equal 6.0', () => {
        expect(add(2.5, 3.5)).to.equal(6.0);
    });

    // Boundary values
    it('Adding Number.MAX_SAFE_INTEGER and -1 should work correctly', () => {
        expect(add(Number.MAX_SAFE_INTEGER, -1)).to.equal(Number.MAX_SAFE_INTEGER - 1);
    });

    it('Adding Number.MIN_SAFE_INTEGER and 1 should work correctly', () => {
        expect(add(Number.MIN_SAFE_INTEGER, 1)).to.equal(Number.MIN_SAFE_INTEGER + 1);
    });

    it('Adding very small floats (1e-10 + 1e-10) should work correctly', () => {
        expect(add(1e-10, 1e-10)).to.be.closeTo(2e-10, 1e-15);
    });

    it('Adding very large numbers should work correctly', () => {
        expect(add(1e+100, 1e+100)).to.equal(2e+100);
    });

    // Edge cases
    it('Adding 0 and a positive number should return the positive number', () => {
        expect(add(0, 5)).to.equal(5);
    });

    it('Adding 0 and a negative number should return the negative number', () => {
        expect(add(0, -5)).to.equal(-5);
    });

    it('Adding NaN and a number should return NaN', () => {
        expect(add(NaN, 5)).to.be.NaN;
    });

    it('Adding undefined and a number should return number', () => {
        expect(add(undefined, 5)).to.equal(5);
    });

    it('Adding null and a number should return number', () => {
        expect(add(null, 5)).to.equal(5);
    });

    it('Adding an empty object and a number should return NaN', () => {
        expect(add({}, 5)).to.be.NaN;
    });

});
