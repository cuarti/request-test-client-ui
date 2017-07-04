
import * as React from 'react';
import {Component} from 'react';

import {StyleSheet} from '../../util/StyleSheet';
import {Bind} from '../../util/Bind';

const style = require('./JsonObject.scss');


const symbol = {
    OPEN_CURLY: '{',
    CLOSE_CURLY: '}',
    OPEN_BRACKET: '[',
    CLOSE_BRACKET: ']',
    COLON: ':',
    QUOTE: '"',
    COMMA: ','
};

export interface JsonFieldProps {
    data: Object;
    deep: number;
}

export interface JsonFieldState {
    collapsed?: boolean;
}

export class JsonField extends Component<JsonFieldProps, JsonFieldState> {

    public constructor(props?: JsonFieldProps, context?: any) {
        super(props, context);
        this.state = {collapsed: false};
    }

    private getPairs(): {key: string | number, value: any}[] {

        return this.props.data instanceof Array
            ? this.props.data.map((value, key) => ({key, value}))
            : Object.keys(this.props.data).map(key => ({key, value: this.props.data[key]}));
    }

    @Bind()
    public toggle(): void {
        this.setState({collapsed: !this.state.collapsed});
    }

    public render(): JSX.Element {

        return !this.state.collapsed ? (
            <ul className={style.container} >
                <li style={{marginLeft: this.props.deep * 20}} >
                    <span className={style.caret} onClick={this.toggle} />
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.OPEN_BRACKET : symbol.OPEN_CURLY}
                    </span>
                </li>
                {this.getPairs().map(({key, value}) => this.renderProperty(value, key))}
                <li style={{marginLeft: this.props.deep * 20}} >
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.CLOSE_BRACKET : symbol.CLOSE_CURLY}
                    </span>
                </li>
            </ul>
        ) : (
            <ul className={StyleSheet.className(style.container, style.collapsed)} >
                <li style={{marginLeft: this.props.deep * 20}} >
                    <span className={style.caret} onClick={this.toggle} />
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.OPEN_BRACKET : symbol.OPEN_CURLY}
                    </span>
                    <span> ... </span>
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.CLOSE_BRACKET : symbol.CLOSE_CURLY}
                    </span>
                </li>
            </ul>
        );

        // return (
        //     <ul className={StyleSheet.className(style.container, this.state.collapsed && style.collapsed)} >
        //         <li style={{marginLeft: this.props.deep * 20}} >
        //             <span className={style.caret} onClick={this.toggle} />
        //             <span className={style.symbol} >
        //                 {this.props.data instanceof Array ? symbol.OPEN_BRACKET : symbol.OPEN_CURLY}
        //             </span>
        //         </li>
        //         {this.getPairs().map(({key, value}) => this.renderProperty(value, key))}
        //         <li style={{marginLeft: this.props.deep * 20}} >
        //             <span className={style.symbol} >
        //                 {this.props.data instanceof Array ? symbol.CLOSE_BRACKET : symbol.CLOSE_CURLY}
        //             </span>
        //         </li>
        //     </ul>
        // );
    }

    private renderProperty(value: any, key: string | number): JSX.Element {
        return (
            <li style={{marginLeft: (this.props.deep + 1) * 20}} >
                <span>{key}:</span>
                <span>{value}</span>
            </li>
        );
    }

}
