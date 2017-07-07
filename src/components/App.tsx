
import * as React from 'react';
import {Component} from 'react';

import {HttpPanel} from './HttpPanel';
import {Demo} from '../demo.secret/Demo';

const styles = require('./App.scss');


export class App extends Component<{}, {}> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    public render(): JSX.Element {
        return (
            <div className={styles.container} >
                {/*<HttpPanel />*/}
                <Demo />
            </div>
        );
    }

}
