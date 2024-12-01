import reduce from '../src/reduce.js';
import * as chai from 'chai';
import 'mocha';

// Import lodash
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var _ = require('lodash');

const expect = chai.expect;

const testObjectA = { 
    'a': 'A'
}

const testObject = { 
    'a': 1, 
    'b': 2, 
    'c': 3 
}



/* In some test cases, result is compared both to a hard coded object and the result from 
   lodash reduce function to ensure the result matches both. 
   Some of the test results don't seem "intuitive", but since lodash's reduce function 
   returns the same result, the behavior can't really be considered incorrect. */
describe('Reduce Functions Tests', () => {

    it('Function should return the same value as the documentation example', () => {
        const result = reduce({ 'a': 1, 'b': 2, 'c': 1 }, (res, value, key) => {
                (res[value] || (res[value] = [])).push(key)
                return res
            }, {});
        expect(result).to.deep.equal({ '1': ['a', 'c'], '2': ['b'] });
    })

    it('The result should be accumulate on the accumulator if an acumulator is given', () => {
        const result = reduce({ 'a': 1, 'b': 2, 'c': 1 }, (res, value, key) => {
                (res[value] || (res[value] = [])).push(key)
                return res
            }, { '1': ['A'], '2': ['B'] });            
        expect(result).to.deep.equal({ '1': ['A', 'a', 'c'], '2': ['B', 'b'] });
    })

    it('The function should modify the original object if the parameter function is supposed to do that.', () => {
        let original = {'c': 'C', 'd': 'D'};
        const result = reduce([testObjectA, testObject], _.defaultsDeep, original);
        const excpectedResult = {
            'a': 'A', 
            'b': 2, 
            'c': 'C',
            "d": "D"
        };
        expect(result).to.deep.equal(_.reduce([testObjectA, testObject], _.defaults, {'c': 'C', 'd': 'D'}));
        expect(result).to.deep.equal(excpectedResult);
        expect(original).to.deep.equal(excpectedResult);
    })

    it("Accumulator should be used anyway even if the provided accumulator's type doesn't match the iteratee V1", () => {
        let original = 99;
        const result = reduce([testObjectA, testObject], _.defaultsDeep, original);

        expect(result).to.deep.equal(_.reduce([testObjectA, testObject], _.defaults, original));
        expect(result).to.deep.equal(Object(99));
    })

    it("Accumulator should be used anyway even if the provided accumulator's type doesn't match the iteratee V2", () => {
        let collection = [1, 2, 3, 4, 5];
        let iteratee = (res, value) => {return res + value;};
        let accumulator = {};

        const result = reduce(collection, iteratee, accumulator);        
        expect(result).to.deep.equal(_.reduce(collection, iteratee, accumulator));   
        expect(result).to.deep.equal('[object Object]12345');
    })

    it("Should return undefined if the iteratee doensn't have a return value", () => {
        let collection = [1, 2, 3, 4, 5];
        let iteratee = (res, value) => { var a = 'Do nothing'; };
        let accumulator = {'A': 1};

        const result = reduce(collection, iteratee, accumulator);
        expect(result).to.deep.equal(_.reduce(collection, iteratee, accumulator));
        expect(result).to.deep.equal(undefined);
    })

    it("Should return accumulator as is if the collection is empty", () => {
        let collection = [];
        let iteratee = _.defaults;
        let accumulator = {'A': 1};
        const result = reduce(collection, iteratee, accumulator);
        
        expect(result).to.deep.equal(_.reduce(collection, iteratee, accumulator));
        expect(result).to.deep.equal({'A': 1});
    })

    it("Should return undefined if the collection is empty and no accumulator was given", () => {
        let collection = [];
        let iteratee = _.defaults;
        const result = reduce(collection, iteratee);
        
        expect(result).to.deep.equal(_.reduce(collection, iteratee));
        expect(result).to.deep.equal(undefined);
    })

    it("Should attempt to perform the function anyway even if the provided collection is not a collection V!", () => {
        let collection = true;
        let iteratee = _.defaults;;
        let accumulator = {};
        const result = reduce(collection, iteratee, accumulator);

        expect(result).to.deep.equal(_.reduce(collection, iteratee, accumulator));
        expect(result).to.deep.equal({});
    })

    it("Should attempt to perform the function anyway even if the provided collection is not a collection V2", () => {
        let collection = {'c': 'C', 'd': 'D'};
        let iteratee = _.defaults;;
        let accumulator = {};
        const result = reduce(collection, iteratee, accumulator);

        expect(result).to.deep.equal(_.reduce(collection, iteratee, accumulator));
        expect(result).to.deep.equal({'0': 'C'});
    })

    it("Should return null if all parameters are null", () => {
        const result = reduce(null, null, null);

        expect(result).to.deep.equal(_.reduce(null, null, null));
        expect(result).to.deep.equal(null);
    })

    it("Should return accumulator unchanged if collection is null", () => {
        let iteratee = _.defaults;
        let accumulator = [1, 2, 3, 4, 5];
        const result = reduce(null, iteratee, accumulator);

        expect(result).to.deep.equal(_.reduce(null, iteratee, accumulator));
        expect(result).to.deep.equal(accumulator);
    })

})