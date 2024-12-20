import defaultTo from '../src/defaultTo.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;


describe('defaultTo', () => {
  // 1. Value is neither null nor undefined
  it('should return the original value if it is neither null nor undefined', () => {
    expect(defaultTo(1, 10)).to.equal(1);
  });

  // 2. Value is null
  it('should return the default value if the value is null', () => {
    expect(defaultTo(null, 10)).to.equal(10);
  });

  // 3. Value is undefined
  it('should return the default value if the value is undefined', () => {
    expect(defaultTo(undefined, 10)).to.equal(10);
  });

  // 4. Value is NaN
  it('should return the original value if the value is NaN', () => {
    expect(defaultTo(NaN, 10)).to.be.NaN;
  });

  // 5. Value is 0
  it('should return the original value if the value is 0', () => {
    expect(defaultTo(0, 10)).to.equal(0);
  });

  // 6. Value is an empty string
  it('should return the original value if the value is an empty string', () => {
    expect(defaultTo('', 'default')).to.equal('');
  });

  // 7. Value is a boolean (true)
  it('should return the original value if the value is true', () => {
    expect(defaultTo(true, false)).to.equal(true);
  });

  // 8. Value is a boolean (false)
  it('should return the original value if the value is false', () => {
    expect(defaultTo(false, true)).to.equal(false);
  });

  // 9. Value is an object
  it('should return the original value if the value is an object', () => {
    const obj = { key: 'value' };
    expect(defaultTo(obj, { key: 'default' })).to.deep.equal(obj);
  });

  // 10. Value is an array
  it('should return the original value if the value is an array', () => {
    const arr = [1, 2, 3];
    expect(defaultTo(arr, [4, 5, 6])).to.deep.equal(arr);
  });

  // 11. Value is a function
  it('should return the original value if the value is a function', () => {
    const func = () => 'value';
    expect(defaultTo(func, () => 'default')).to.equal(func);
  });

  // 12. Default value is null
  it('should return null as the default value when the value is null', () => {
    expect(defaultTo(null, null)).to.equal(null);
  });

  // 13. Default value is undefined
  it('should return undefined as the default value when the value is null', () => {
    expect(defaultTo(null, undefined)).to.be.undefined;
  });

  // 14. Value is a symbol
  it('should return the original value if the value is a symbol', () => {
    const symbol = Symbol('value');
    expect(defaultTo(symbol, Symbol('default'))).to.equal(symbol);
  });

  // 15. Value is a bigint
  it('should return the original value if the value is a bigint', () => {
    const bigInt = BigInt(123);
    expect(defaultTo(bigInt, BigInt(456))).to.equal(bigInt);
  });
});