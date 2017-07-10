
import * as React from 'react';
import {Component} from 'react';

import {Style} from '../../util/Style';
import {StyledProps} from './Styled';
import {Toggle, ToggleProps, ToggleState} from './Toggle';

const styles = require('./Dropdown.scss');


export interface DropdownProps extends StyledProps, ToggleProps {}

export interface DropdownState extends ToggleState {}

export class Dropdown extends Component<DropdownProps, DropdownState> implements Toggle {

    public constructor(props?: DropdownProps, context?: any) {
        super(props, context);

        this.state = {
            open: !this.props.closed
        };
    }

    public componentWillReceiveProps(nextProps: DropdownProps): void {

        if(this.state.open !== !nextProps.closed) {
            this.setState({open: !nextProps.closed})
        }
    }

    public open(): void {
        this.toggle(true);
    }

    public close(): void {
        this.toggle(false);
    }

    public toggle(open: boolean = !this.state.open): void {
        this.setState({open});
    }

    public render(): JSX.Element {
        return (
            <div className={Style.classNames(styles.dropdown, this.props.className, this.state.open && styles.open)}
                 style={this.props.style || {}} >

                {this.props.children}

            </div>
        );
    }

}
