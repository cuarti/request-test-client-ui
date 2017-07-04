

export module Style {

    export function classNames(classNames: string[]): string;
    export function classNames(...classNames: string[]): string;
    export function classNames(classNames: {[name: string]: boolean}): string;

    export function classNames(...classNames: any[]): string {

        if(typeof classNames[0] === 'object') {
            classNames = classNames[0];
        }

        if(!(classNames instanceof Array)) {
            //TODO: Abstract in @agama/types object filter iterator
            classNames = Object.keys(classNames).filter(k => classNames[k]);
        }

        return classNames.filter(c => c).join(' ');
    }

}
