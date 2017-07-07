
import * as React from 'react';
import {Component} from 'react';

import {call} from '../../types/function';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {StyledProps} from './Styled';

const styles = require('./Button.scss');


export interface ButtonProps extends StyledProps {
    onClick?: () => void;
}

export class Button extends Component<ButtonProps> {

    public constructor(props?: ButtonProps, context?: any) {
        super(props, context);
    }

    @Bind()
    private onClick(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        call(this.props.onClick);
    }

    public render(): JSX.Element {

        return (
            <button className={Style.classNames(styles.button, this.props.className)}
                    style={this.props.style || {}}
                    onClick={this.onClick} >

                {this.props.children}

            </button>
        );
    }

}
