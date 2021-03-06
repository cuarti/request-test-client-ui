
import * as React from 'react';
import {Component} from 'react';

import {call} from '../../types/function';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {StyledProps} from './Styled';

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

        call(this.props.onClick);
    }

    public render(): JSX.Element {

        return (
            <span className={Style.classNames(styles.caret, this.props.className)}
                  style={this.props.style || {}}
                  onClick={this.onClick} />
        );
    }

}
