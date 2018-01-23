// FUNCTION DETECTION
export function isFunction(value: any) {
    return value && Object.prototype.toString.call(value) === '[object Function]';
}

// PRIMITIVES
// Number
export function isNumber(value: any) {
    return false === (isNaN(value) || (value instanceof Array));
}
// END PRIMITIVES

// NULL OR UNDEFINED
export function isNotNull(value: any) {
    return false === isNull(value);
}
export function isNotNullOrEmpty(value: any) {
    return false === isNullOrEmpty(value);
}

export function isNull(value: any) {
    return value === null || value === undefined;
}
export function isNullOrEmpty(value: any) {
    return isNull(value) || (isNotNull(value.length) && value.length === 0);
}

export function getTypeName(value: any) {
    const raw = Object.prototype.toString.call(value),
        type = raw.match(/ ([a-zA-Z0-9]*)/gm) || '';

    return type.toString().toLowerCase().trim();
}
