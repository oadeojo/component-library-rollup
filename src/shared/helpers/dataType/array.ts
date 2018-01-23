import { isFunction, isNotNull, isNumber } from './validate';

// THESE ARRAY HELPERS DO NOT MUTATE THE SOURCE ARRAY.
// **** ALWAYS USE THESE FOR ANY REDUCER ARRAY HANDLING ****
export function findObjectIndex(source: any, indexFn: any) {
    let index = -1, i = null;

    if (isFunction(indexFn) && source.length > 0) {
        for (i = 0; i < source.length; i++) {
            if (indexFn(source[i])) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export function findObjectIndexByKey(source: any, key: string, value: any) {
    return findObjectIndex(source, (s: any) => s[key] === value);
}

///////////////////// ** GET ONE FROM ARRAY ** /////////////////////
export function get(source: any, indexFn: any) {
    return getAt(source, findObjectIndex(source, indexFn));
}

export function getAt(source: any, index: number) {
    if (isNumber(index) && index >= 0) {
        return { ...source[index] };
    }
    return null;
}
///////////////////// END ** GET ONE FROM ARRAY ** /////////////////////

///////////////////// ** UPDATE ARRAY ** /////////////////////
export function upsert(source: any, item: any, index?: number) {
    let retArr = [];

    if (index === null || isNaN(index)) {
        index = source.length;
    }

    if (index >= 0) {
        retArr = [
            ...source.slice(0, index), item,
            ...source.slice(index + 1)
        ];
    } else {
        retArr = [
            ...source, item
        ];
    }
    return retArr;
}

export function upsertSorted(source: any, item: any, key: string, sortBy: any) {
    const index = findObjectIndexByKey(source, key, item[key]);
    return upsert(source, item, index).sort((a, b) => sort(a, b, sortBy));
}

export function upsertAll(source: any, list: any[]) {
    const ret: any[] = [];

    if (isNotNull(list)) {
        list.forEach((item: any) => {
            ret.push(item);
        });
    }

    return ret;
}

export function upsertAllSorted(source: any, list: any[], key: string, sortBy: any) {
    const ret = upsertAll(source, list);

    return ret.sort((a, b) => sort(a, b, sortBy));
}
///////////////////// END ** UPDATE ARRAY ** /////////////////////

///////////////////// ** REMOVE ONE FROM ARRAY ** /////////////////////
export function remove(source: any, indexFn: any) {
    return removeAt(source, findObjectIndex(source, indexFn));
}

export function removeAt(source: any, index: number) {
    if (!isNaN(index) && index >= 0) {
        return [
            ...source.slice(0, index),
            ...source.slice(index + 1)
        ];
    }
    return source.sort();
}
///////////////////// END ** REMOVE ONE FROM ARRAY ** /////////////////////

//////////////////////////////
/// Private Utility Functions
//////////////////////////////
function sort(a: any, b: any, key: string) {
    let ret = 0;

    if (a[key] > b[key]) {
        ret = 1;
    } else if (a[key] < b[key]) {
        ret = -1;
    }

    return ret;
}
