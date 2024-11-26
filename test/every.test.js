import every from '../src/every.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

describe('every', () => {
  // 1. All elements pass the predicate
  it('should return true when all elements pass the predicate', () => {
    const array = [2, 4, 6];
    const isEven = (num) => num % 2 === 0;
    expect(every(array, isEven)).to.be.true;
  });

  // 2. Some elements fail the predicate
  it('should return false when at least one element fails the predicate', () => {
    const array = [2, 4, 5];
    const isEven = (num) => num % 2 === 0;
    expect(every(array, isEven)).to.be.false;
  });

  // 3. Empty array
  it('should return true for an empty array', () => {
    const array = [];
    const alwaysTrue = () => true;
    expect(every(array, alwaysTrue)).to.be.true;
  });

  // 4. Array with mixed data types
  it('should return true when all elements satisfy the predicate for mixed data types', () => {
    const array = [true, 1, 'yes'];
    const isTruthy = (value) => Boolean(value);
    expect(every(array, isTruthy)).to.be.true;
  });

  // 5. Array with falsy values
  it('should return false if any falsy value is present', () => {
    const array = [true, 0, 'yes'];
    const isTruthy = (value) => Boolean(value);
    expect(every(array, isTruthy)).to.be.false;
  });

  // 6. Array with falsy values
  it('should return false if any falsy value is present in the arrays head', () => {
    const array = [null, 1, 'yes'];
    const isTruthy = (value) => Boolean(value);
    expect(every(array, isTruthy)).to.be.false;
  });

  // 7. Array with falsy values
  it('should return false if any falsy value is present in the arrays tail', () => {
    const array = [true, 1, NaN];
    const isTruthy = (value) => Boolean(value);
    expect(every(array, isTruthy)).to.be.false;
  });

  // 8. Null array
  it('should return true for a null array', () => {
    const array = null;
    const alwaysTrue = () => true;
    expect(every(array, alwaysTrue)).to.be.true;
  });

  // 9. Undefined array
  it('should return true for an undefined array', () => {
    const array = undefined;
    const alwaysTrue = () => true;
    expect(every(array, alwaysTrue)).to.be.true;
  });

  // 10. Predicate that depends on index
  it('should pass when the predicate depends on index and all conditions are met', () => {
    const array = [0, 1, 2];
    const matchesIndex = (value, index) => value === index;
    expect(every(array, matchesIndex)).to.be.true;
  });

  // 11. Predicate that depends on array
  it('should pass when the predicate depends on the entire array and all conditions are met', () => {
    const array = [1, 2, 3];
    const lessThanMax = (value, index, arr) => value < Math.max(...arr) + 1;
    expect(every(array, lessThanMax)).to.be.true;
  });

  // 12. Single-element array passing
  it('should return true for a single-element array if it passes the predicate', () => {
    const array = [5];
    const greaterThanZero = (value) => value > 0;
    expect(every(array, greaterThanZero)).to.be.true;
  });

  // 13. Single-element array failing
  it('should return false for a single-element array if it fails the predicate', () => {
    const array = [0];
    const greaterThanZero = (value) => value > 0;
    expect(every(array, greaterThanZero)).to.be.false;
  });

  // 14. Predicate that always returns false
  it('should return false if the predicate always returns false', () => {
    const array = [1, 2, 3];
    const alwaysFalse = () => false;
    expect(every(array, alwaysFalse)).to.be.false;
  });

  // 15. Predicate that always returns true
  it('should return true if the predicate always returns true', () => {
    const array = [1, 2, 3];
    const alwaysTrue = () => true;
    expect(every(array, alwaysTrue)).to.be.true;
  });

  // 16. Array with nested objects
  it('should return true if all nested objects pass the predicate', () => {
    const array = [{ id: 1 }, { id: 2 }];
    const hasId = (obj) => obj.id !== undefined;
    expect(every(array, hasId)).to.be.true;
  });

  // 17. Array with nested arrays
  it('should return true if all nested arrays pass the predicate', () => {
    const array = [[1, 2], [3, 4]];
    const isArray = (value) => Array.isArray(value);
    expect(every(array, isArray)).to.be.true;
  });
});