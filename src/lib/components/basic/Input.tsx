
import * as React from 'react';
import {Component} from 'react';

import {call} from '../../types/function';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {StyledProps} from './Styled';

const styles = require('./Input.scss');


export declare type InputType = 'number' | 'text';

export interface InputProps extends StyledProps {
    type?: InputType;
    defaultValue?: any;
    value?: any;
    placeholder?: string;
    onChange?: (data: any) => void;
}

export class Input extends Component<InputProps> {

    private type: InputType;

    public constructor(props?: InputProps, context?: any) {
        super(props, context);
        this.type = props.type || 'text';
    }

    private parse(data: string): any {
        return this.type !== 'number' ? data : data as any * 1;
    }

    @Bind()
    private onChange(event: any): void {
        call(this.props.onChange, this.parse(event.target.value));
    }

    public render(): JSX.Element {

        return (
            <input type={this.type}
                   className={Style.classNames(styles.input, this.props.className)}
                   style={this.props.style || {}}
                   placeholder={this.props.placeholder}
                   onChange={this.onChange} />
        );
    }

}
