
import {isFunction} from './validation';


export function applyThis(func: Function, thisArg: any, args: any[]): any {

    if(isFunction(func)) {
        return func.apply(thisArg, args);
    }
}

export function callThis(func: Function, thisArg: any, ...args: any[]): any {
    return applyThis(func, thisArg, args);
}

export function apply(func: Function, args: any[]): any {
    return applyThis(func, undefined, args);
}

export function call(func: Function, ...args: any[]): any {
    return apply(func, args);
}
