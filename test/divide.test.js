import divide from '../src/divide.js';
import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;


describe('Divide Functions Tests', () => {
    // Basic cases:
    it("Dividing positive integer with a positive integer should give the correct result", () => {
        expect(divide(6, 4)).to.deep.equal(1.5);
    })

    it("Dividing positive integer with a larger positive integer should give the correct result", () => {
        expect(divide(4, 6)).to.be.closeTo(0.6666, 0.0001)
    })

    it("Dividing negative integer with a positive integer should give the correct result", () => {
        expect(divide(-4, 6)).to.be.closeTo(-0.6666, 0.0001)
    })

    it("Dividing positive integer with a negative integer should give the correct result", () => {
        expect(divide(4, -6)).to.be.closeTo(-0.6666, 0.0001)
    })

    it("Dividing negative integer with a negative integer should give the correct result", () => {
        expect(divide(-4, -6)).to.be.closeTo(0.6666, 0.0001)
    })

    it("Dividing decimal with a decimal should give the correct result", () => {
        expect(divide(2.5, 0.5)).to.deep.equal(5);
    })

    it("Dividing 0 with another number should result in 0", () => {
        expect(divide(0, 5)).to.deep.equal(0);
    })

    // Other cases:
    it("Dividing an number with 0 should result in Infinity", () => {
        expect(divide(5, 0)).to.deep.equal(Infinity);
    })

    it("Dividing a string type number with another should give the correct result", () => {
        expect(divide('-55', '10')).to.deep.equal(-5.5);
    })

    it("Dividing a number with a string type number should give the correct result", () => {
        expect(divide(-50, '0.5')).to.deep.equal(-100);
    })

    it("Boolean value should be treated as number 1 or 0", () => {
        expect(divide(true, 0,25)).to.deep.equal(true / 0.25); // 4
        expect(divide(0,25, false)).to.deep.equal(0.25 / false); // Infinity
    })

    it("Passing a function as a parameter should result in NaN", () => {
        expect(divide((() => 5), 0.2)).to.deep.equal(NaN);
    })

    it("Null parameter should be treated as 0", () => {
        expect(divide(null, 0.2)).to.deep.equal(0);
        expect(divide(-0.2, null)).to.deep.equal(-Infinity);
    }) // But should they really?

    it("Undefined parameter should return the approppriate default value", () => {
        expect(divide(undefined, 0.2)).to.deep.equal(0.2);
        expect(divide(-0.2, undefined)).to.deep.equal(-0.2);
        expect(divide(undefined, undefined)).to.deep.equal(1);
    }) // But should they really? What's the point? Isn't this behavior kind of unpredictable?

    //^ null/undefined/otherwise invalid value treatment is also not very consistent.
})