
import * as React from 'react';
import {Component} from 'react';

import {isNumber, isUndefined} from '../../types/validation';
import {call} from '../../types/function';
import {isObject} from '../../types/validation';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {StyledProps} from './Styled';
import {Toggle, ToggleProps, ToggleState} from './Toggle';
import {ToggleCaret} from './ToggleCaret';

const styles = require('./Select.scss');


//TODO: Abstraer y moverlo a otro sitio
export interface LabeledValue<T = any> {
    label: string;
    value?: T;
}

export interface SelectProps extends StyledProps, ToggleProps {
    options: (LabeledValue | string)[];
    defaultValue?: any;
    defaultIndex?: number;
    // disabled?: boolean;
    title?: string;
    onChange?: (value: any) => void;
}

export interface SelectState extends ToggleState {
    value?: any;
}

//TODO: Crear Select > DropdownButton > Dropdown
export class Select extends Component<SelectProps, SelectState> implements Toggle {

    private options: LabeledValue[];

    public constructor(props?: SelectProps, context?: any) {
        super(props, context);

        this.options = this.prepareOptions();

        this.state = {
            value: this.prepareDefaultValue(),
            open: false
        };
    }

    public open(): void {
        this.toggle(true);
    }

    public close(): void {
        this.toggle(false);
    }

    @Bind()
    public toggle(open: boolean = !this.state.open): void {
        this.setState({open});
    }

    private prepareOptions(): LabeledValue[] {

        return this.props.options.every(o => isObject(o))
            ? (this.props.options as LabeledValue[]).map(({label, value}) => ({label, value: value || label}))
            : (this.props.options as string[]).map(label => ({label, value: label}));
    }

    private prepareDefaultValue(): any {

        if(!isUndefined(this.props.defaultValue)) {
            return this.props.defaultValue;
        }

        let index = isNumber(this.props.defaultIndex) ? this.props.defaultIndex : 0;
        let option = this.options[index];

        return option && option.value;
    }

    private getCurrentLabel(): string {

        let option = this.options.find(o => o.value === this.state.value);
        return option && option.label;
    }

    @Bind()
    private onClick(): void {

        // if(!this.props.disabled) {
            this.toggle();
        // }
    }

    @Bind()
    private onChange(value: any): void {

        this.setState({value}, () => {
            call(this.props.onChange, value);
            this.close();
        });
    }

    @Bind()
    private onBlur(): void {
        this.close();
    }

    public render(): JSX.Element {

        return (
            <div className={Style.classNames(styles.select, this.props.className)}
                 style={this.props.style || {}}
                 title={this.props.title}
                 tabIndex={0}
                 onBlur={this.onBlur} >
                {/*disabled={this.props.disabled} >*/}

                <div className={styles.input} onClick={this.onClick} >

                    {this.getCurrentLabel()}

                    {/*<div disabled={this.props.disabled} >*/}
                        {/*{this.getCurrentLabel()}*/}
                    {/*</div>*/}

                    <div className={styles.caret} >
                        <ToggleCaret closed={this.state.open} onToggle={this.onClick} />
                    </div>

                </div>

                <ul className={Style.classNames(styles.dropdown, this.state.open && styles.open)} >
                    {this.options.map(this.renderOption, this)}
                </ul>

            </div>
        );
    }

    private renderOption({label, value}: LabeledValue, index: number): JSX.Element {

        return (
            <li key={index} onClick={() => this.onChange(value)} >
                {label}
            </li>
        );
    }

}
