
import * as React from 'react';
import {Component} from 'react';

import {JsonObject} from './JsonObject';

const style = require('./JsonPreview.scss');


export interface JsonPreviewProps {
    data: Object;
}

export class JsonPreview extends Component<JsonPreviewProps, {}> {

    public constructor(props?: JsonPreviewProps, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        return (
            <div className={style.container} >
                <JsonObject data={this.props.data} deep={1} />
            </div>
        );
    }

}
