
import * as React from 'react';
import {Component} from 'react';

import {Style} from '../../util/Style';
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

export interface JsonObjectProps {
    data: Object;
    deep: number;
    label?: string | number;
    comma?: boolean;
}

export interface JsonObjectState {
    collapsed?: boolean;
}

//TODO: Refactor in microcomponents
export class JsonObject extends Component<JsonObjectProps, JsonObjectState> {

    public constructor(props?: JsonObjectProps, context?: any) {
        super(props, context);
        this.state = {collapsed: false};
    }

    private getProperties(): {key: string | number, value: any}[] {

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

                <li style={{paddingLeft: this.props.deep * 20}} onClick={this.toggle} >

                    <span className={style.caret} style={{left: (this.props.deep - 1) * 20 + 5}} />

                    {...(this.props.label && [
                        <span key="key" className={typeof this.props.label === 'string' ? style.key : style.number} >
                            {this.props.label}
                        </span>,
                        <span key="colon" className={Style.classNames(style.symbol, style.colon)} >{symbol.COLON}</span>
                    ])}

                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.OPEN_BRACKET : symbol.OPEN_CURLY}
                    </span>

                </li>

                {this.getProperties().map(({key, value}, i, items) => this.renderProperty(value, key, i, items))}

                <li style={{paddingLeft: this.props.deep * 20}} >
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.CLOSE_BRACKET : symbol.CLOSE_CURLY}
                    </span>
                    {this.props.comma && <span className={style.symbol} >{symbol.COMMA}</span>}
                </li>


            </ul>
        ) : (
            <ul className={Style.classNames(style.container, style.collapsed)} onClick={this.toggle} >

                <li style={{paddingLeft: this.props.deep * 20}} >

                    <span className={style.caret} style={{left: (this.props.deep - 1) * 20 + 7.5}} />

                    {...(this.props.label && [
                        <span key="key" className={typeof this.props.label === 'string' ? style.key : style.number} >
                            {this.props.label}
                        </span>,
                        <span key="colon" className={Style.classNames(style.symbol, style.colon)} >{symbol.COLON}</span>
                    ])}

                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.OPEN_BRACKET : symbol.OPEN_CURLY}
                    </span>
                    <span className={style.summary} > {this.props.data instanceof Array ? 'Array' : 'Object'} </span>
                    <span className={style.symbol} >
                        {this.props.data instanceof Array ? symbol.CLOSE_BRACKET : symbol.CLOSE_CURLY}
                    </span>
                    {this.props.comma && <span className={style.symbol} >{symbol.COMMA}</span>}

                </li>

            </ul>
        );
    }

    private renderProperty(value: any, key: string | number, index: number, items: any[]): JSX.Element {

        return typeof value === 'object' && value ? (
            <JsonObject key={key} data={value} deep={this.props.deep + 1} label={key} comma={index < items.length - 1} />
        ) : (
            <li key={key} style={{paddingLeft: (this.props.deep + 1) * 20}} >
                <span className={typeof key === 'string' ? style.key : style.number} >{key}</span>
                <span className={Style.classNames(style.symbol, style.colon)} >{symbol.COLON}</span>
                {this.renderValue(value)}
                {index < items.length - 1 && <span className={style.symbol} >{symbol.COMMA}</span>}
            </li>
        );
    }

    private renderValue(value: any): JSX.Element {

        if(value === undefined) {
            return <span className={style.undefined} >undefined</span>;
        }

        if(value === null) {
            return <span className={style.null} >null</span>;
        }

        if(typeof value === 'boolean') {
            return <span className={style.boolean} >{value.toString()}</span>;
        }

        if(typeof value === 'number') {
            return <span className={style.number} >{value}</span>;
        }

        if(typeof value === 'string') {
            return <span className={style.string} >{symbol.QUOTE + value + symbol.QUOTE}</span>;
        }

    }

}
