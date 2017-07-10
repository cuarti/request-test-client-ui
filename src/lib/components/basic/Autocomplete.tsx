
import * as React from 'react';
import {Component} from 'react';

import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {StyledProps} from './Styled';
import {Toggle, ToggleProps, ToggleState} from './Toggle';
import {Input} from './Input';

const styles = require('./Autocomplete.scss');


export interface AutocompleteProps extends ToggleProps, StyledProps {
    options: string[];
    // defaultValue?: string;
    // value?: string;
    // placeholder?: string;
    title?: string;
    // disabled?: boolean;
    onChange?: (data: string) => void;
}

export interface AutocompleteState extends ToggleState {
    value?: string;
}

export class Autocomplete extends Component<AutocompleteProps, AutocompleteState> implements Toggle {

    public constructor(props?: AutocompleteProps, context?: any) {
        super(props, context);

        this.state = {
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

    public render(): JSX.Element {

        return (
            <div className={Style.classNames(styles.autocomplete, this.props.className)}
                 style={this.props.style || {}}
                 title={this.props.title}
                 tabIndex={0}
                 onFocus={() => this.toggle(true)}
                 onBlur={() => this.toggle(false)} >

                <Input />

                <ul>
                    {this.props.options.map(this.renderOption)}
                </ul>

            </div>
        );
    }

    private renderOption(value: string, index: number): JSX.Element {
        return <li key={index} >{value}</li>;
    }

}
