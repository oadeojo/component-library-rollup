import * as helpers from './validate';

describe('Validate Helpers:', () => {
    describe('Detect types:', () => {
        test('can detect a function', () => {
            const arr = helpers.isFunction([]),
                obj = helpers.isFunction({}),
                fn = helpers.isFunction(() => { return; });

            expect(arr).toEqual(false);
            expect(obj).toEqual(false);
            expect(fn).toEqual(true);
        });

        test('can detect a number', () => {
            const arr = helpers.isNumber([]),
                arrVals = helpers.isNumber([1, 2, 3]),
                obj = helpers.isNumber({}),
                str = helpers.isNumber('abc'),
                strNum = helpers.isNumber('123'),
                strFlt = helpers.isNumber('123.45'),
                int = helpers.isNumber(123),
                flt = helpers.isNumber(123.45),
                bin = helpers.isNumber(true);

            expect(arr).toEqual(false);
            expect(arrVals).toEqual(false);
            expect(obj).toEqual(false);
            expect(str).toEqual(false);
            expect(strNum).toEqual(true);
            expect(strFlt).toEqual(true);
            expect(int).toEqual(true);
            expect(flt).toEqual(true);
            expect(bin).toEqual(true);
        });

        test('can detect null', () => {
            const arr = helpers.isNull([]),
                arrVals = helpers.isNull([1, 2, 3]),
                obj = helpers.isNull({}),
                bin = helpers.isNull(true),
                nul = helpers.isNull(null),
                undef = helpers.isNull(undefined),
                notNul = helpers.isNotNull('plop');

            expect(arr).toEqual(false);
            expect(arrVals).toEqual(false);
            expect(obj).toEqual(false);
            expect(bin).toEqual(false);
            expect(nul).toEqual(true);
            expect(undef).toEqual(true);
            expect(notNul).toEqual(true);
        });

        test('can detect "empty"', () => {
            const arr = helpers.isNullOrEmpty([]),
                arrVals = helpers.isNullOrEmpty([1, 2, 3]),
                obj = helpers.isNullOrEmpty({}),
                bin = helpers.isNullOrEmpty(true),
                nul = helpers.isNullOrEmpty(null),
                undef = helpers.isNullOrEmpty(undefined),
                notNul = helpers.isNotNullOrEmpty('plop');

            expect(arr).toEqual(true);
            expect(arrVals).toEqual(false);
            expect(obj).toEqual(false);
            expect(bin).toEqual(false);
            expect(nul).toEqual(true);
            expect(undef).toEqual(true);
            expect(notNul).toEqual(true);
        });
    });

    describe('Get types:', () => {
        test('gets "string" for strings', () => {
            const expected = 'string',
                actual = helpers.getTypeName('string');

            expect(actual).toEqual(expected);
        });

        test('gets "number" for numbers', () => {
            const expected = 'number',
                actual1 =  helpers.getTypeName(123),
                actual2 = helpers.getTypeName(123.25);

            expect(actual1).toEqual(expected);
            expect(actual2).toEqual(expected);
        });

        test('gets "boolean" for bools', () => {
            const expected = 'boolean',
                actual = helpers.getTypeName(true);

            expect(actual).toEqual(expected);
        });

        test('gets "boolean" for booleans', () => {
            const expected = 'boolean',
                actual = helpers.getTypeName(true);

            expect(actual).toEqual(expected);
        });

        test('gets "array" for arrays', () => {
            const expected = 'array',
                actual = helpers.getTypeName([1, 2, 3]);

            expect(actual).toEqual(expected);
        });
    });
});
