import chunk from '../src/chunk.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('Chunk Function Tests', () => {
    it('should chunk an array into subarrays of the specified size, example 1', () => {
        const result = chunk(['a', 'b', 'c', 'd'], 2);
        expect(result).to.deep.equal([['a', 'b'], ['c', 'd']]);
    });

    it('should chunk an array into subarrays of the specified size, example 2', () => {
        const result = chunk(['a', 'b', 'c', 'd'], 3);
        expect(result).to.deep.equal([['a', 'b', 'c'], ['d']]);
    });

    it('should handle sizes larger than the array length', () => {
        const result = chunk(['a', 'b', 'c'], 5);
        expect(result).to.deep.equal([['a', 'b', 'c']]);
    });

    it('should handle sizes equal to 1', () => {
        const result = chunk(['a', 'b', 'c'], 1);
        expect(result).to.deep.equal([['a'], ['b'], ['c']]);
    });

    it('should return an empty array if input array is empty', () => {
        const result = chunk([], 2);
        expect(result).to.deep.equal([]);
    });

    it('should handle size 0 by returning an empty array', () => {
        const result = chunk(['a', 'b', 'c'], 0);
        expect(result).to.deep.equal([]);
    });

    it('should handle negative size by returning an empty array', () => {
        const result = chunk(['a', 'b', 'c'], -1);
        expect(result).to.deep.equal([]);
    });

    it('should handle null as the input array', () => {
        const result = chunk(null, 2);
        expect(result).to.deep.equal([]);
    });

    it('should handle undefined as the input array', () => {
        const result = chunk(undefined, 2);
        expect(result).to.deep.equal([]);
    });


    it('should handle size as a string that cannot be converted to a number', () => {
        const result = chunk(['a', 'b', 'c'], 'foo');
        expect(result).to.deep.equal([]);
    });

    it('should handle undefined size and default it to 1', () => {
        const result = chunk(['a', 'b', 'c']);
        expect(result).to.deep.equal([['a'], ['b'], ['c']]);
    });

    it('should handle arrays with only one element', () => {
        const result = chunk(['a'], );
        expect(result).to.deep.equal([['a']]);
    });

});
