
import * as React from 'react';
import {Component} from 'react';
import {request, Methods} from '@agama/http';

import {Bind} from '../lib/util/Bind';
import {LabeledValue, Select} from '../lib/components/basic/Select';
import {Input} from '../lib/components/basic/Input';
import {Button} from '../lib/components/basic/Button';
import {JsonPreview} from './previews/JsonPreview';
import {HttpConnectionBar} from './http/HttpConnectionBar';

const styles = require('./HttpPanel.scss');


export interface HttpPanelState {
    method: string;
    host?: string;
    port?: number;
    path?: string;
    data?: any;
}

export class HttpPanel extends Component<{}, HttpPanelState> {

    private methods: LabeledValue[];

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.methods = Object.keys(Methods).map(m => ({label: m, value: m}));

        this.state = {
            method: Methods.GET
        };
    }

    @Bind()
    private onRunClick(): void {

        let url = this.state.host + this.state.path;

        request<string>(this.state.method, url).then(data => this.setState({data: JSON.parse(data)}));

    }

    public render(): JSX.Element {
        return (
            <div className={styles.httpPanel} >

                <HttpConnectionBar />

                {this.state.data ? (
                    <JsonPreview data={this.state.data} />
                ) : (
                    <div>Waiting to request...</div>
                )}

            </div>
        );
    }

}
