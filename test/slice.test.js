import slice from '../src/slice.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

const testArray = ['a', 'b', 'c', 'd'];


/* The slice function is made to be an alternative to the Array slice method, so
   the Array slicce method is used in these test to ensure they return the same result. */
describe('Slice Functions Tests', () => {

    // Basic cases:
    it('Should return the full array when start and end are given as parameters', () => {
        const result = slice(testArray, 0, testArray.length);
        expect(result).to.deep.equal(testArray.slice(0, testArray.length));
    })

    it('Should return the full array when no indexes are given as parameters', () => {
        const result = slice(testArray);
        expect(result).to.deep.equal(testArray.slice());
    })

    it('Should interpret a single parameter as the start parameter', () => {
        const result = slice(testArray, 2);
        expect(result).to.deep.equal(testArray.slice(2));
    })

    it('Should return ', () => {
        const result = slice(testArray, 1, 3);
        expect(result).to.deep.equal(testArray.slice(1, 3));
    })

    // More unusual cases:
    it('Should return an empty array if start parameter is after end parameter', () => {
        const result = slice(testArray, 2, 1);
        expect(result).to.deep.equal(testArray.slice(2, 1));
    })

    it('Negative start parameter should be treated as an offset from the end', () => {
        const result = slice(testArray, -4, testArray.length);
         expect(result).to.deep.equal(testArray.slice(-4, testArray.length));
    })

    it('Negative end parameter should be treated as an offset from the end', () => {
        const result = slice(testArray, 1, -1);
        expect(result).to.deep.equal(testArray.slice(1, -1));
    })

    it('Should return empty array if start and end parameters indicate the same position', () => {
        const result = slice(testArray, 3, -1);
        expect(result).to.deep.equal(testArray.slice(3, -1));
    })

    it('Should return elements up the the end of the array if the end parameter exceeds the actual end', () => {
        const result = slice(testArray, 0, testArray.length * 2);
        expect(result).to.deep.equal(testArray.slice(0, testArray.length * 2));
    })

    it('Should return elements starting from the beginning of the array if the start parameter position is before the actual beginning', () => {
        const result = slice(testArray, (testArray.length * (-2)), testArray.length);
        expect(result).to.deep.equal(testArray.slice((testArray.length * (-2)), testArray.length));
    })


    // Null/empty/undefined parameters:
    // Array:
    it('Should return an empty array if array parameter is also empty', () => {
        const result = slice([], 0, testArray.length);
        expect(result).to.deep.equal([]);
    })

    it('Should return an empty array if array parameter is null', () => {
        const result = slice(null, 0, testArray.length);
        expect(result).to.deep.equal([]);
    })

    it('Should return an empty array if array parameter is undefined', () => {
        const result = slice(undefined, 0, testArray.length);
        expect(result).to.deep.equal([]);
    })

    // Start:
    it('Should use default parameter value if start parameter is null', () => {
        const result = slice(testArray, null, testArray.length);
        expect(result).to.deep.equal(testArray.slice(null, testArray.length));
    })

    it('Should use default parameter value if start parameter is undefined', () => {
        const result = slice(testArray, undefined, testArray.length);
        expect(result).to.deep.equal(testArray.slice(undefined, testArray.length));
    })

    // End:
    it('Should use default parameter value if end parameter is null', () => {
        const result = slice(testArray, 0, null);
        expect(result).to.deep.equal(testArray.slice(0, null));
    })

    it('Should use default parameter value if end parameter is undefined', () => {
        const result = slice(testArray, 0, undefined);
        expect(result).to.deep.equal(testArray.slice(0, undefined));
    })


    // Wrong parameter type:
    it('Should use default parameter value if end parameter is not null, undefined, or a number', () => {
        const result = slice(testArray, 0, 'a');
        expect(result).to.deep.equal(testArray.slice(0, 'a'));
    })

    it('Should use default parameter value if start parameter is not null, undefined, or a number', () => {
        const result = slice(testArray, 'a', testArray.length);
        expect(result).to.deep.equal(testArray.slice('a', testArray.length));
    })

    it('Should return an empty array if array parameter is not null, undefined, or an array', () => {
        const result = slice(0, 0, testArray.length);
        expect(result).to.deep.equal([]);
    })
})