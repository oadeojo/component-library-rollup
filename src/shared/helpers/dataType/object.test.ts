import * as helpers from './object';

describe('Object Helpers:', () => {
    describe('Update:', () => {
        test('can merge two objects', () => {
            const obj1 = { prop1: 'prop1'},
                obj2 = { prop2: 'prop2'},
                expected = helpers.merge(obj1, obj2);

            expect(expected.prop1).toEqual('prop1');
            expect(expected.prop2).toEqual('prop2');
        });

        test('does not mutate sources', () => {
            const obj1: any = { prop1: 'prop1'},
                obj2: any = { prop2: 'prop2'};

            helpers.merge(obj1, obj2);
            expect(obj1.prop2).toEqual(undefined);
            expect(obj2.prop1).toEqual(undefined);
        });
    });
});
