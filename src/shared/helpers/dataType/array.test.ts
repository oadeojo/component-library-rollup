import * as helpers from './array';

describe('Array Helpers:', () => {
    let testArray: any[];

    beforeEach(() => {
        testArray = [
            { id: 1, data: 'test value #1' },
            { id: 2, data: 'test value #2' },
            { id: 3, data: 'test value #3' },
            { id: 4, data: 'test value #4' },
            { id: 5, data: 'test value #5' },
            { id: 6, data: 'test value #6' },
            { id: 9, data: 'test value #9' }
        ];
    });

///// INDEX TESTS
    describe('Find by Index:', () => {
        test('can find object array index using a predicate', () => {
            const index = helpers.findObjectIndex(testArray, (item: any) => item.id === 2);
            // item is at second index (1).
            expect(index).toEqual(1);
        });

        test('can find object array index using a key name', () => {
            const index = helpers.findObjectIndexByKey(testArray, 'id', 1);
            // item is at first index (0).
            expect(index).toEqual(0);
        });
    });
///// END INDEX TESTS

///// GET TESTS
    describe('Get:', () => {
        test('can get object from array using search predicate', () => {
            const item = helpers.get(testArray, (i: any) => i.id === 3);
            expect(item.id).toEqual(3);
            expect(item.data).toEqual('test value #3');
        });
        test('can get object from array using array index', () => {
            const item = helpers.getAt(testArray, 3);
            expect(item.id).toEqual(4);
            expect(item.data).toEqual('test value #4');
        });
    });
///// END GET TESTS

///// UPSERT TESTS
    describe('Upsert:', () => {
        test('can insert a new item', () => {
            const item = { id: 200, data: 'test value #200'},
                newArray = helpers.upsert(testArray, item),
                expected = helpers.get(newArray, (i: any) => i.id === 200);

            expect(expected.id).toEqual(200);
            expect(expected.data).toEqual('test value #200');
        });

        test('can update an existing item', () => {
            const newValue = 'new test value',
                item = helpers.getAt(testArray, 3);
            let newArray = null,
                expected;

            item.data = newValue;
            newArray = helpers.upsert(testArray, item, 3);
            expected = helpers.getAt(newArray, 3);

            expect(expected.id).toEqual(4);
            expect(expected.data).toEqual(newValue);
        });

        test('can insert and sort', () => {
            const item = { id: 8, data: 'test value #8'},
                newArray = helpers.upsertSorted(testArray, item, 'id', 'data'),
                expected = helpers.getAt(newArray, 5);

            expect(expected.id).toEqual(6);
            expect(expected.data).toEqual('test value #6');
        });

        test('can update and sort', () => {
            const item = { id: 0, data: 'test value #0'},
                newArray = helpers.upsertSorted(testArray, item, 'id', 'data'),
                expected = helpers.getAt(newArray, 6);

            expect(expected.id).toEqual(6);
            expect(expected.data).toEqual('test value #6');
        });

        test('can replace array', () => {
            const items = [{ id: 0, data: 'test value #0'}],
                newArray = helpers.upsertAll(testArray, items);

            expect(newArray.length).toEqual(1);
        });

        test('can replace array and sort', () => {
            const items = [
                    { id: 20, data: 'replacement test value #20'},
                    { id: 30, data: 'replacement test value #30'}
                ],
                newArray = helpers.upsertAllSorted(testArray, items, 'id', 'data');

            expect(newArray.length).toEqual(2);
        });

        test('does not mutate array on insert', () => {
            const item = { id: 200, data: 'test value #200'},
                length = testArray.length;

            helpers.upsert(testArray, item);

            expect(testArray.length).toEqual(length);
        });

        test('does not mutate array on update', () => {
            const item = helpers.getAt(testArray, 3),
                newValue = 'new test value',
                oldValue = item.data;
            let newItem = null;

            item.data = newValue;
            helpers.upsert(testArray, item, 3);

            newItem = helpers.getAt(testArray, 3);
            expect(newItem.id).toEqual(4);
            expect(newItem.data).toEqual(oldValue);
        });
    });
///// END UPSERT TESTS

///// REMOVE TESTS
    describe('Remove:', () => {
        test('does not mutate array on remove', () => {
            const length = testArray.length;

            helpers.remove(testArray, (i: any) => i.id === 2);

            expect(testArray.length).toEqual(length);
        });

        test('can remove an existing item via predicate', () => {
            const item = helpers.getAt(testArray, 2),
               newArray = helpers.remove(testArray, (i: any) => i.id === item.id),
               expected = helpers.get(newArray, (i: any) => i.id === item.id);

            expect(expected).toBe(null);
        });

        test('can remove an existing item via index', () => {
            const item = helpers.getAt(testArray, 2),
               newArray = helpers.removeAt(testArray, 2),
               expected = helpers.get(newArray, (i: any) => i.id === item.id);

            expect(expected).toBe(null);
        });
    });
///// END REMOVE TESTS
});
