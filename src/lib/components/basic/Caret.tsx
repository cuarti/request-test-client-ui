
import * as React from 'react';
import {Component} from 'react';

import {StyledProps} from './Styled';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';

const styles = require('./Caret.scss');


export interface CaretProps extends StyledProps {
    onClick?: () => void;
}

export class Caret extends Component<CaretProps> {

    public constructor(props?: CaretProps, context?: any) {
        super(props, context);
    }

    @Bind()
    private onClick(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        if(typeof this.props.onClick === 'function') {
            this.props.onClick();
        }
    }

    public render(): JSX.Element {

        return (
            <span
                className={Style.classNames(styles.caret, this.props.className)}
                style={this.props.style || {}}
                onClick={this.onClick} />
        );
    }

}
