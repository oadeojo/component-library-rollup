import * as helpers from './string';

describe('String Helpers:', () => {
    describe('Slugify:', () => {
        test('creates a slug based on a provided string', () => {
            const expected = 'this-is-a-string-to-be-slugged',
                original = 'this is a string to be slugged.',
                actual = helpers.slugify(original);

            expect(actual).toEqual(expected);
        });

        test('returns null if null or undefined is passed in', () => {
            const expect1: any = null,
                actual1 = helpers.slugify(expect1),
                actual2 = helpers.slugify(undefined);

            expect(actual1).toBeNull();
            expect(actual2).toBeNull();
        });
    });
});
