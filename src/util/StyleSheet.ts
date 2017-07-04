

export module StyleSheet {

    export function className(...classNames: string[]) {
        return classNames.filter(c => c).join(' ');
    }

}
