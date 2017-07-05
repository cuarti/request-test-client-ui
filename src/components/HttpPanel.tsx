
import * as React from 'react';
import {Component} from 'react';
import {request, Methods} from '@agama/http';

import {Bind} from '../lib/util/Bind';
import {JsonPreview} from './previews/JsonPreview';


export interface HttpPanelState {
    method: string;
    host: string;
    port: number;
    path: string;
    data?: any;
}

export class HttpPanel extends Component<{}, HttpPanelState> {

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.state = {
            method: Methods.GET,
            host: 'localhost',
            port: 80,
            path: '/'
        };
    }

    @Bind()
    private onMethodChange(event: any): void {
        this.setState({method: event.target.value});
    }

    @Bind()
    private onHostChange(event: any): void {
        this.setState({host: event.target.value});
    }

    @Bind()
    private onPortChange(event: any): void {
        this.setState({port: parseInt(event.target.value)});
    }

    @Bind()
    private onPathChange(event: any): void {
        this.setState({path: event.target.value});
    }

    @Bind()
    private onRunClick(): void {

        let url = this.state.host + this.state.path;

        request<string>(this.state.method, url).then(data => this.setState({data: JSON.parse(data)}));

    }

    public render(): JSX.Element {
        return (
            <div>

                {this.renderBar()}

                {this.state.data ? (
                    <JsonPreview data={this.state.data} />
                ) : (
                    <div>Waiting to request...</div>
                )}

            </div>
        );
    }

    private renderBar(): JSX.Element {
        return (
            <div>

                <select value={this.state.method} onChange={this.onMethodChange} >
                    <option>{Methods.GET}</option>
                    <option>{Methods.POST}</option>
                    <option>{Methods.PUT}</option>
                    <option>{Methods.DELETE}</option>
                </select>

                <input
                    type="text"
                    value={this.state.host}
                    onChange={this.onHostChange} />

                <input
                    type="number"
                    value={this.state.port}
                    onChange={this.onPortChange} />

                <input
                    type="text"
                    value={this.state.path}
                    onChange={this.onPathChange} />

                <button onClick={this.onRunClick} >Run</button>

            </div>
        );
    }

}
