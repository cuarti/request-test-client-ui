
import * as React from 'react';
import {Component} from 'react';
import {request, Methods} from '@agama/http';

import {Bind} from '../lib/util/Bind';
import {LabeledValue, Select} from '../lib/components/basic/Select';
import {Input} from '../lib/components/basic/Input';
import {Button} from '../lib/components/basic/Button';
import {JsonPreview} from './previews/JsonPreview';

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
            <div className={styles.httpPanel} >

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
            <div className={styles.bar} >

                <Select options={this.methods}
                        onChange={v => this.setState({method: v})} />

                {/*<select value={this.state.method} onChange={this.onMethodChange} >*/}
                    {/*<option>{Methods.GET}</option>*/}
                    {/*<option>{Methods.POST}</option>*/}
                    {/*<option>{Methods.PUT}</option>*/}
                    {/*<option>{Methods.DELETE}</option>*/}
                {/*</select>*/}

                <Input placeholder="Host"
                       onChange={v => this.setState({host: v})} />

                {/*<input*/}
                    {/*type="text"*/}
                    {/*value={this.state.host}*/}
                    {/*onChange={this.onHostChange} />*/}

                <Input type="number"
                       placeholder="Port"
                       onChange={v => this.setState({port: v})} />

                {/*<input*/}
                    {/*type="number"*/}
                    {/*value={this.state.port}*/}
                    {/*onChange={this.onPortChange} />*/}

                <Input placeholder="Path"
                       onChange={v => this.setState({path: v})} />

                {/*<input*/}
                    {/*type="text"*/}
                    {/*value={this.state.path}*/}
                    {/*onChange={this.onPathChange} />*/}

                <Button onClick={this.onRunClick} >Run</Button>

                {/*<button onClick={this.onRunClick} >Run</button>*/}

            </div>
        );
    }

}
