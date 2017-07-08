
import * as React from 'react';
import {Component} from 'react';
import {Methods} from '@agama/http';

import {call} from '../../lib/types/function';
import {Bind} from '../../lib/util/Bind';
import {Button} from '../../lib/components/basic/Button';
import {Input} from '../../lib/components/basic/Input';
import {Select} from '../../lib/components/basic/Select';
import {HttpConnection} from '../../model/HttpConnection';

const styles = require('./HttpConnectionBar.scss');


export interface HttpConnectionBarProps {
    onSubmit?: (connection: HttpConnection) => void;
}

export interface HttpConnectionBarState {
    method: string;
    protocol: string;
    host?: string;
    port?: number;
    path?: string;
}

export class HttpConnectionBar extends Component<HttpConnectionBarProps, HttpConnectionBarState> {

    private methods: string[];
    private protocols: string[];

    public constructor(props?: HttpConnectionBarProps, context?: any) {
        super(props, context);

        this.methods = Object.keys(Methods);
        this.protocols = ['http', 'https'];

        this.state = {
            method: this.methods[0],
            protocol: this.protocols[0]
        };
    }

    @Bind()
    private onSubmit(): void {

        let s: any = {};

        this.state.port || (s.port = 80);
        this.state.path || (s.path = '/');

        this.setState(s, () => call(this.props.onSubmit, {...this.state}));
    }

    public render(): JSX.Element {
        return (
            <form className={styles.bar} >

                <Select className={styles.method}
                        options={this.methods}
                        title="Method"
                        onChange={v => this.setState({method: v})} />

                <Select className={styles.protocol}
                        options={this.protocols}
                        title="Protocol" />

                <Input className={styles.host}
                       placeholder="Host"
                       title="Host"
                       onChange={v => this.setState({host: v})} />

                <Input className={styles.port}
                       type="number"
                       value={this.state.port}
                       placeholder="Port"
                       title="Port"
                       onChange={v => this.setState({port: v})} />

                <Input className={styles.path}
                       value={this.state.path}
                       placeholder="Path"
                       title="Path"
                       onChange={v => this.setState({path: v})} />

                <Button className={styles.button}
                        onClick={this.onSubmit} >Send</Button>

            </form>
        );
    }

}
