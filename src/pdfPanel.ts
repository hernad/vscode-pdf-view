import * as vscode from 'vscode';
import { Global } from './global';
import * as path from 'path';
import * as fs from 'fs';

export class PdfPanel {

    public static create() {

        new PdfPanel();
    }

    private readonly extensionPath: string;
    private static viewType: 'PDF';
    private webPanel: vscode.WebviewPanel;
    private panelCaption: string;

    private constructor() {

        this.extensionPath = Global.context.extensionPath;
        this.panelCaption = 'PDF viewer';
        this.webPanel = this.createWebPanel();
    }


    private createWebPanel() {

        const w = vscode.window.createWebviewPanel(
            PdfPanel.viewType,
            this.panelCaption,
            { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
            {
                enableScripts: true, // Enable javascript in the webview
                retainContextWhenHidden: true,

                // And restric the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this.extensionPath, 'media')),
                    vscode.Uri.file(path.join(this.extensionPath, 'node_modules')),
                    vscode.Uri.file(path.join('/home/hernad/.vscode/extensions/F18/data')),
                ]
            }
        );

        w.webview.html = fs.readFileSync( path.join(this.extensionPath, 'media', 'index.html'), 'utf8');
       
        return w;
    }
}