
import {join} from 'path';
import {renderFile} from 'ejs';
import {app, BrowserWindow} from 'electron';


export class AppWindow {

    private window: any;

    public constructor() {
        app.on('ready', () => this.create());
        app.on('window-all-closed', () => this.onClose());
        app.on('activate', () => this.onActivate());
    }

    private onClose(): void {

        if(process.platform !== 'darwin') {
            app.quit();
        }
    }

    private onActivate(): void {

        if(this.window === null) {
            this.create();
        }
    }

    private create(): void {

        this.window = new BrowserWindow({width: 800, height: 600});

        this.renderUrl().then(url =>
            this.window.loadURL(url));

        this.window.on('closed', () => this.window = null);
    }

    private renderUrl(): Promise<string> {

        return new Promise((resolve, reject) => {
            renderFile(join(__dirname, 'AppWindow.ejs'), {env: process.env.NODE_ENV}, (err, compiled) => {

                if(err) {
                    reject(err);
                } else {
                    resolve(`data:text/html,${encodeURIComponent(compiled)}`);
                }
            });
        });

    }

}
