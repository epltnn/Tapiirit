import get from '../src/get.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

// Import lodash
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var _ = require('lodash');



const object = { 'a': [{ 'b': { 'c': 3 } }] };

const abmiguousObject0 = { 'a': { '0': 3 } };
const abmiguousObject1 = { 'a': { '1': 3 } };

const undefinedObject = { 'a': undefined };

/* In these tests, result is compared both to a hard coded object and the result from 
   lodash get function to ensure the result matches both. */
describe('Get Functions Tests', () => {
    // Basic cases:
    it('Should return the right element (string syntax)', () => {
        const result = get(object, 'a[0].b.c');
        expect(result).to.deep.equal(3);
        expect(result).to.deep.equal(_.get(object, 'a[0].b.c'));
    })

    it('Should return the right element (list syntax)', () => {
        const result = get(object, ['a', '0', 'b', 'c']);
        expect(result).to.deep.equal(3);
        expect(result).to.deep.equal(_.get(object, ['a', '0', 'b', 'c']));
    })

    // Path doesn't exist
    it("Should return default value if path isn't found (string syntax)", () => {
        const result = get(object, 'a.b.c', 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get(object, 'a.b.c', 'DEFAULT'));
    })

    it("Should return default value if path isn't found (list syntax)", () => {
        const result = get(object, ['a', 'b', 'c'], 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get(object, 'a.b.c', 'DEFAULT'));
    })

    // Index doesn't exist
    it("Should return default value if index isn't found (string syntax)", () => {
        const result = get(object, 'a[1].b.c', 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get(object, 'a[1].b.c','DEFAULT'));
    })

    it("Should return default value if index isn't found (list syntax)", () => {
        const result = get(object, ['a', '1', 'b', 'c'], 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get(object, ['a', '1', 'b', 'c'], 'DEFAULT'));
    })

    // Starting with a list
    it("Should return default value if index isn't found (string syntax)", () => {
        const result = get([object], 'a[1].b.c', 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get([object], 'a[1].b.c', 'DEFAULT'));
    })

    it("Should return default value if index isn't found (list syntax)", () => {
        const result = get(object, ['a', '1', 'b', 'c'], 'DEFAULT');
        expect(result).to.deep.equal('DEFAULT');
        expect(result).to.deep.equal(_.get(object, ['a', '1', 'b', 'c'], 'DEFAULT'));
    })

    // No default value
    it("Should return undefined if no default value is given and path isn't found (string syntax)", () => {
        const result = get(object, 'a[0].b.c.d');
        expect(result).to.deep.equal(undefined);
        expect(result).to.deep.equal(_.get(object, 'a[0].b.c.d'));
    })

    it("Should return undefined if no default value is given and path isn't found (list syntax)", () => {
        const result = get(object, ['a', '0', 'b', 'c', 'd']);
        expect(result).to.deep.equal(undefined);
        expect(result).to.deep.equal(_.get(object, ['a', '0', 'b', 'c', 'd']));
    })

    // Object attribute name is a number str
    it("Should return the right value when accessing an attribute with a number as a name (string syntax)", () => {
        const result = get(abmiguousObject0, 'a[0]');
        expect(result).to.deep.equal(_.get(abmiguousObject0, 'a[0]'));
        expect(result).to.deep.equal(3);
    })

    it("Should return the right value when accessing an attribute with a number as a name (list syntax)", () => {
        const result = get(abmiguousObject0, ['a', '0']);
        expect(result).to.deep.equal(_.get(abmiguousObject0, ['a', '0']));
        expect(result).to.deep.equal(3);
    })

    it("Should return the right value when accessing an attribute with a number as a name (string syntax)", () => {
        const result = get(abmiguousObject1, 'a[1]');
        expect(result).to.deep.equal(_.get(abmiguousObject1, 'a[1]'));
        expect(result).to.deep.equal(3);
    })

    it("Should return the right value when accessing an attribute with a number as a name (list syntax)", () => {
        const result = get(abmiguousObject1, ['a', '1']);
        expect(result).to.deep.equal(_.get(abmiguousObject1, ['a', '1']));
        expect(result).to.deep.equal(3);
    })

    // Object is null
    it("Should return undefined if object is null", () => {
        const result1 = get(null, 'a[0]');
        expect(result1).to.deep.equal(_.get(null, 'a[0]'));
        expect(result1).to.deep.equal(undefined);

        const result2 = get(null, ['a', '0']);
        expect(result2).to.deep.equal(_.get(null, ['a', '0']));
        expect(result2).to.deep.equal(undefined);
    })

    // Attribute value is undefined (as the actual value)
    it("Should return default value if the specified attribute's actual value is undefined", () => {
        const result1 = get(undefinedObject, 'a', 'DEFAULT');
        expect(result1).to.deep.equal(_.get(undefinedObject, 'a', 'DEFAULT'));
        expect(result1).to.deep.equal('DEFAULT');

        const result2 = get(undefinedObject, ['a'], 'DEFAULT');
        expect(result2).to.deep.equal(_.get(undefinedObject, ['a'], 'DEFAULT'));
        expect(result2).to.deep.equal('DEFAULT');
    })

    // Invalid syntax
    it("Should return undefined or when the array parameters aren't strings", () => {
        const result = get(object, ['a', '0', [1, 2], 'b', 'c']);
        expect(result).to.deep.equal(_.get(object, ['a', '0', [1, 2], 'b', 'c']));
        expect(result).to.deep.equal(undefined);
    })
    
    it("Should return undefined if path parameter is not a string or array", () => {
        const lodashResult = _.get(object, {a: '0'});
        const result = get(object, {a: '0'});
        expect (result).to.deep.equal(lodashResult);
        expect (result).to.deep.equal(undefined);
    })

    //
    it('Should return undefined if path parameter is null', () => {
        const result = get(object, null);
        expect(result).to.deep.equal(undefined);
        expect(result).to.deep.equal(_.get(object, null));
    })
})