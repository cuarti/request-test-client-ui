
import * as React from 'react';
import {Component} from 'react';

import {JsonPreview} from './previews/JsonPreview';

const style = require('./App.scss');


export class App extends Component<{}, {}> {

    private json: Object;

    public constructor(props?: any, context?: any) {
        super(props, context);

        this.json = {
            username: 'cuarti',
            name: 'Albert',
            lastname: 'Cuartiella',
            age: 24,
            birthday: '31/08/1992',
            developer: true,
            business: [
                'Travisy',
                'EdisoNews',
                'FlyKube',
                'CuoTech'
            ],
            foo: null,
            bar: undefined
        };

    }

    public render(): JSX.Element {
        return (
            <div className={style.container} >
                <JsonPreview data={this.json} />
            </div>
        );
    }

}
