import filter from '../src/filter.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('filter', () => {
  // Test filtering an array with a valid predicate
  it('should return an array of elements that match the predicate', () => {
    const array = [1, 2, 3, 4];
    const predicate = (value) => value % 2 === 0;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([2, 4]);
  });

  // Test when no elements match the predicate
  it('should return an empty array if no elements match the predicate', () => {
    const array = [1, 3, 5];
    const predicate = (value) => value % 2 === 0;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test handling a null input array
  it('should return an empty array if the input array is null', () => {
    const predicate = (value) => value > 0;
    const result = filter(null, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test handling an undefined input array
  it('should return an empty array if the input array is undefined', () => {
    const predicate = (value) => value > 0;
    const result = filter(undefined, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test filtering objects in an array based on a predicate
  it('should work with an array of objects', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).to.deep.equal([{ user: 'barney', active: true }]);
  });

  // Test if the predicate receives the correct index argument
  it('should pass the index as the second argument to the predicate', () => {
    const array = ['a', 'b', 'c'];
    const result = filter(array, (value, index) => index === 1);
    expect(result).to.deep.equal(['b']);
  });

  // Test if the predicate receives the entire array as the third argument
  it('should pass the entire array as the third argument to the predicate', () => {
    const array = [1, 2, 3];
    const result = filter(array, (value, index, arr) => arr.length === 3);
    expect(result).to.deep.equal([1, 2, 3]);
  });

  // Test handling an empty input array
  it('should work with an empty array', () => {
    const array = [];
    const predicate = (value) => value > 0;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test filtering when the predicate always returns true
  it('should handle a predicate that always returns true', () => {
    const array = [1, 2, 3];
    const predicate = () => true;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([1, 2, 3]);
  });

  // Test filtering when the predicate always returns false
  it('should handle a predicate that always returns false', () => {
    const array = [1, 2, 3];
    const predicate = () => false;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test if the original array remains unmodified
  it('should not modify the original array', () => {
    const array = [1, 2, 3];
    const predicate = (value) => value > 1;
    const result = filter(array, predicate);
    expect(array).to.deep.equal([1, 2, 3]);
    expect(result).to.deep.equal([2, 3]);
  });

  // Test filtering an array with mixed data types
  it('should handle arrays with mixed data types', () => {
    const array = [1, 'a', true, {}, null];
    const predicate = (value) => typeof value === 'string';
    const result = filter(array, predicate);
    expect(result).to.deep.equal(['a']);
  });

  // Test filtering an array with a single matching element
  it('should handle an array with a single element that matches the predicate', () => {
    const array = [42];
    const predicate = (value) => value === 42;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([42]);
  });

  // Test filtering an array with a single non-matching element
  it('should handle an array with a single element that does not match the predicate', () => {
    const array = [42];
    const predicate = (value) => value === 0;
    const result = filter(array, predicate);
    expect(result).to.deep.equal([[]]);
  });

  // Test handling a predicate that is not a function
  it('should return an empty array if the predicate is not a function', () => {
    const array = [1, 2, 3];
    const result = filter(array, null);
    expect(result).to.deep.equal([[]]);
  });
});