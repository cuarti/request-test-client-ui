
import * as React from 'react';
import {Component} from 'react';

import {PreviewField} from './PreviewField';
import {JsonField} from './JsonObject';

const style = require('./JsonPreview.scss');


export interface JsonPreviewProps {
    data: Object;
}

export class JsonPreview extends Component<JsonPreviewProps, {}> {

    public constructor(props?: JsonPreviewProps, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        // return (
        //     <div className={style.container} >{this.renderObject(this.props.data)}</div>
        // );
        return (
            <div className={style.container} >
                <JsonField data={this.props.data} deep={1} />
            </div>
        );
    }

    // private renderObject(data: Object): JSX.Element {
    //
    //     if(data instanceof Array) {
    //         return (
    //             <ul>
    //                 <span className={style.caret} />
    //                 <li>
    //                     <span className={style.symbol} >{symbol.OPEN_BRACKET}</span>
    //                 </li>
    //                 {data.map(this.renderPos, this)}
    //                 <li>
    //                     <span className={style.symbol} >{symbol.CLOSE_BRACKET}</span>
    //                 </li>
    //             </ul>
    //         );
    //     }
    //
    //     let keys = Object.keys(data);
    //
    //     return <PreviewField />;
    //
    //     // return (
    //     //     <ul>
    //     //         <li>
    //     //             <span className={style.symbol} >{symbol.OPEN_CURLY_BRACKET}</span>
    //     //         </li>
    //     //         {keys.map((k, i) => this.renderProp(data[k], k, i < keys.length - 1))}
    //     //         <li>
    //     //             <span className={style.symbol} >{symbol.CLOSE_CURLY_BRACKET}</span>
    //     //         </li>
    //     //     </ul>
    //     // );
    // }

    // private renderProp(value: any, key: string, comma: boolean): JSX.Element {
    //     return (
    //         <li key={key} className={style.prop} >
    //             <span className={style.key} >{key}</span>
    //             <span className={style.symbol} >{symbol.COLON}</span>
    //             {this.renderValue(value)}
    //             {comma && <span className={style.symbol} >{symbol.COMMA}</span>}
    //         </li>
    //     );
    // }

    // private renderPos(value: any, index: number, items: any[]): JSX.Element {
    //
    //     let comma = index < items.length - 1;
    //
    //     return (
    //         <li key={index} className={style.prop} >
    //             {this.renderValue(value)}
    //             {comma && <span className={style.symbol} >{symbol.COMMA}</span>}
    //         </li>
    //     );
    // }

    // private renderValue(value: any): JSX.Element {
    //
    //     let type = typeof value;
    //
    //     if(type === 'undefined') {
    //         return <span className={style.undefined} >undefined</span>;
    //     }
    //
    //     if(value === null) {
    //         return <span className={style.null} >null</span>;
    //     }
    //
    //     if(type === 'boolean') {
    //         return <span className={style.boolean} >{value.toString()}</span>;
    //     }
    //
    //     if(type === 'number') {
    //         return <span className={style.number} >{value}</span>;
    //     }
    //
    //     if(type === 'string') {
    //         return <span className={style.string} >"{value}"</span>;
    //     }
    //
    //     return this.renderObject(value);
    // }

}
