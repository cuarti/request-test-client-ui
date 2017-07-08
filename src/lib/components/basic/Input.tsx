
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
    title?: string;
    onChange?: (data: any) => void;
}

export interface InputState {
    value?: any;
}

export class Input extends Component<InputProps, InputState> {

    private type: InputType;

    public constructor(props?: InputProps, context?: any) {
        super(props, context);

        this.type = props.type || 'text';

        this.state = {value: this.props.defaultValue || this.props.value};
    }

    public componentWillReceiveProps(nextProps: InputProps): void {

        // console.log(nextProps.value, this.state.value, nextProps.value && nextProps.value !== this.state.value);
        // if(nextProps.value !== this.state.value) {
        //     console.log('TRUE');
        //     this.setState({value: nextProps.value});
        // }

        if(this.state.value !== !nextProps.value) {
            this.setState({value: nextProps.value})
        }
    }

    private parse(data: string): any {
        return this.type !== 'number' ? data : data as any * 1;
    }

    @Bind()
    private onChange(event: any): void {

        let {value} = event.target;
        this.setState({value}, () => call(this.props.onChange, this.parse(value)));
    }

    public render(): JSX.Element {

        return (
            <input type={this.type}
                   className={Style.classNames(styles.input, this.props.className)}
                   style={this.props.style || {}}
                   placeholder={this.props.placeholder}
                   title={this.props.title}
                   value={this.state.value || ''}
                   onChange={this.onChange} />
        );
    }

}
