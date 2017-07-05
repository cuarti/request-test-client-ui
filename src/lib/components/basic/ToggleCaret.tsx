
import * as React from 'react';
import {Component} from 'react';

import {StyledProps} from './Styled';
import {Toggle, ToggleProps, ToggleState} from './Toggle';
import {Bind} from '../../util/Bind';
import {Style} from '../../util/Style';
import {Caret} from './Caret';

const styles = require('./ToggleCaret.scss');


export interface ToggleCaretProps extends StyledProps, ToggleProps {}

export interface ToggleCaretState extends ToggleState {}

export class ToggleCaret extends Component<ToggleCaretProps, ToggleCaretState> implements Toggle {

    public constructor(props?: ToggleCaretProps, context?: any) {
        super(props, context);
        this.state = {open: !this.props.closed};
    }

    public componentWillReceiveProps(nextProps: ToggleCaretProps): void {

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

    @Bind()
    public toggle(open: boolean = !this.state.open): void {

        this.setState({open}, () => {
            if(typeof this.props.onToggle === 'function') {
                this.props.onToggle(open);
            }
        });
    }

    public render(): JSX.Element {

        return (
            <Caret
                className={Style.classNames(styles.toggleCaret, this.state.open || styles.collapsed, this.props.className)}
                style={this.props.style || {}}
                onClick={this.toggle} />
        );
    }

}
