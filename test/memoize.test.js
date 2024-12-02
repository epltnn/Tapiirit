import memoize from '../src/memoize.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;
const assert = chai.assert;

// Import lodash
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var _ = require('lodash');


function add(a, b, c) {
    return a + b + c;
}

/* In these tests, result is compared both to a hard coded object and the result from 
   lodash memoize function to ensure the result matches both. */
describe('Memoize Functions Tests 1', () => {
    // Basic cases:
    it("Should run function only once unless value is changed", () => {
        const object = { 'a': 1, 'b': 2 };
        const other = { 'c': 3, 'd': 4 };
        const values = memoize(_.values);
        const _values = _.memoize(_.values);

        expect(values(object)).to.deep.equal(_values(object));
        expect(values(object)).to.deep.equal([1, 2]);
        expect(values(other)).to.deep.equal(_values(other));
        expect(values(other)).to.deep.equal([3, 4]);

        object.a = 2;
        expect(values(object)).to.deep.equal(_values(object));
        expect(values(object)).to.deep.equal([1, 2]);

        values.cache.set(object, ['a', 'b']);
        _values.cache.set(object, ['a', 'b']);
        expect(values(object)).to.deep.equal(_values(object));
        expect(values(object)).to.deep.equal(['a', 'b']);
    })

    it("Should throw TypeError if the parameter isn't a function", () => {
        chai.expect(() => memoize(true)).to.throw(TypeError);
        chai.expect(() => _.memoize(true)).to.throw(TypeError);
    })

    it("Should use resolver to construct keys (and work with multiple arguments) if resolver is given", () => {
        const adder = memoize(add, (...args) => _.values(args).join("_"));
        const _adder = memoize(add, (...args) => _.values(args).join("_"));

        const resultA = adder(1, 2, 3);
        const _resultA = _adder(1, 2, 3);

        expect(resultA).to.deep.equal(_resultA);
        expect(resultA).to.deep.equal(6);

        const resultA2 = adder(1, 2, 3);
        expect(resultA).to.equal(resultA2);

        _adder.cache.set('1_2_3', 123);
        adder.cache.set('1_2_3', 123);

        expect(resultA).to.deep.equal(_resultA);
        expect(resultA).to.deep.equal(6);

        const resultB = adder(1, 2, 3);
        const _resultB = _adder(1, 2, 3);
        expect(resultB).to.deep.equal(_resultB);
        expect(resultB).to.deep.equal(123);
    })

    it("Should accept resolver that can return null as the key", () => {
        const object = { 'a': 1, 'b': 2 };
        const other = { 'c': 3, 'd': 4 };

        const _nullKeys = _.memoize((_.values), (...args) => args.length > 0 ? args : null);
        const nullKeys = memoize((_.values), (...args) => args.length > 0 ? args : null);

        expect(_nullKeys(object)).to.deep.equal([1, 2]);
        expect(nullKeys(object)).to.deep.equal([1, 2]);

        expect(_nullKeys()).to.deep.equal([]);
        expect(nullKeys()).to.deep.equal([]);

        expect(_nullKeys(other)).to.deep.equal([3, 4]);
        expect(nullKeys(other)).to.deep.equal([3, 4]);
        
        _nullKeys.cache.set(null, 'empty');
        nullKeys.cache.set(null, 'empty');

        expect(_nullKeys()).to.deep.equal(nullKeys());
        expect(nullKeys()).to.deep.equal('empty');
    })
})

//* This is run in a separate suite because otherwise it breaks other tests */
describe('Memoize Functions Tests 2', () => {
    it("Should change cache type when memoize.Cache is modified", () => {
        
        const object = { 'a': 1, 'b': 2 };
        const values = memoize(_.values);

        values(object);

        assert.instanceOf(values.cache, Map);

        memoize.Cache = WeakMap;
        const keys = memoize(_.keys);
        assert.instanceOf(keys.cache, WeakMap);
        assert.instanceOf(values.cache, WeakMap);

        memoize.Cache = null;
        assert.instanceOf(values.cache, Map);

        object.a = 2;
        expect(values(object)).to.deep.equal([1, 2]);
    })
})

//* This is run in a separate suite because otherwise it breaks other tests */
describe('Memoize Functions Tests 3', () => {
    it("Should use Map as cache type when memoize.Cache is null", () => {
        memoize.Cache = null;
        const values = memoize(_.values);
        assert.instanceOf(values.cache, Map);
    })
})