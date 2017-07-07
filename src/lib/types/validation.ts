

export function isUndefined(value: any): boolean {
    return value === undefined;
}

export function isNull(value: any): boolean {
    return value === null;
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isNumber(value: any): boolean {
    return typeof value === 'number';
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isObject(value: any): boolean {
    return typeof value === 'object';
}

export function isArray(value: any): boolean {
    return value instanceof Array;
}

export function isFunction(value: any): boolean {
    return value instanceof Function;
}

export function isDefined(value: any): boolean {
    return !isUndefined(value) && !isNull(value);
}
