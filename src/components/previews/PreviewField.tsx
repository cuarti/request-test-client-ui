
import * as React from 'react';
import {Component} from 'react';

import {StyleSheet} from '../../util/StyleSheet';
import {Bind} from '../../util/Bind';

const style = require('./PreviewField.scss');


export interface PreviewFieldState {
    collapsed?: boolean;
}

export class PreviewField extends Component<{}, PreviewFieldState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {collapsed: false};
    }

    @Bind()
    private onToggle(): void {
        this.setState({collapsed: !this.state.collapsed});
    }

    public render(): JSX.Element {

        let {collapsed} = this.state;

        return (
            <div className={style.container} >

                <div className={style.collapsable} onClick={this.onToggle} >
                    <span className={style.caret} />
                    <span>{collapsed ? '[ ... ]' : '['}</span>
                </div>

                <div className={StyleSheet.className(style.box, collapsed && style.collapsed)} >
                    asdasd
                </div>

                {collapsed || <div className={style.collapsable} onClick={this.onToggle} >]</div>}

            </div>
        );
    }

}
