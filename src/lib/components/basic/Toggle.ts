

export interface ToggleProps {
    // defaultClosed?: boolean;
    closed?: boolean;
    onToggle?: (open: boolean) => void;
}

export interface ToggleState {
    open: boolean;
}

export interface Toggle {

    open(): void;

    close(): void;

    toggle(open?: boolean): void;

}
