import * as vscode from 'vscode';
import { Global } from './global';
import * as path from 'path';
import * as fs from 'fs';

export class PdfPanel {

    public static currentPdfPanel: PdfPanel;
    public static pdfNum: number = 1;

    public static create(urifileName?: string) {
        PdfPanel.currentPdfPanel = new PdfPanel(urifileName);
        PdfPanel.pdfNum++;
    }

    private readonly extensionPath: string;
    private static viewType: 'PDF';
    //private webPanel: vscode.WebviewPanel;
    private panelCaption: string;
    private urifileName: string;

    private constructor(urifileName?: string) {

        if (urifileName) {
            this.urifileName = urifileName;
        } else {
            this.urifileName = '';
        }

        this.extensionPath = Global.context.extensionPath;
        if (this.urifileName === '') {
            this.panelCaption = 'PDF viewer';
        } else {
            this.panelCaption = path.basename(vscode.Uri.parse(this.urifileName).fsPath);
        }
        // this.webPanel = 
        this.createWebPanel();
        //this.webPanel.onDidChangeViewState(() => {
        // vscode.window.showInformationMessage('webpanel onDidChangeViewState');
        //});

    }


    private createWebPanel() {

        const localResourceRoots = [
            // vscode.Uri.file(path.join(this.extensionPath, 'media')),
            vscode.Uri.file(path.join(this.extensionPath, 'pdf.js_build_generic')),
            vscode.Uri.file(path.join(this.extensionPath, 'node_modules')),
        ];

        const extF18 = vscode.extensions.getExtension('bringout.f18-klijent');

        if (extF18) {
            localResourceRoots.push(vscode.Uri.file(path.join(extF18.extensionPath, '..', 'F18', 'data')));
        }

        const w = vscode.window.createWebviewPanel(
            PdfPanel.viewType,
            this.panelCaption,
            { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
            {
                enableScripts: true, // Enable javascript in the webview
                enableCommandUris: true,
                retainContextWhenHidden: true,
                localResourceRoots
            }
        );


        /*
    
        vscode_viewer.html 'DOMContentLoaded' - webViewerLoad()
    
          // vscode_viewer.js: vscode-patch 2
    
          // The canvas and each ancestor node must have a height of 100% to make
          // sure that each canvas is printed on exactly one page.
          '#printContainer {height:100%}' +
          '#printContainer > div {width:100% !important;height:100% !important;}' +
          '}';
    
    
           // vscode_viewer.js: vscode-patch 3 locale
    
           const langElement = document.getElementById('localeContainer');
           if (langElement) {
                const locale = langElement.getAttribute('lang');
                console.log(`pdf.js debug locale from localeContainer: ${locale}`);
                this.l10n = this.externalServices.createL10n({ locale });
            }
            else
                this.l10n = this.externalServices.createL10n({ locale: _app_options.AppOptions.get('locale') });
    
        */

        let html = fs.readFileSync(path.join(this.extensionPath, 'pdf.js_build_generic', 'web', 'vscode_viewer.html'), 'utf8');
        // https://stackoverflow.com/questions/20856197/remove-non-ascii-character-in-string
        html = html.replace(/[^\x00-\x7F]/g, "");

        const fileUri: vscode.Uri = vscode.Uri.file(this.extensionPath);
        html = html.replace(/\$\{extensionPath\}/g, fileUri.with({ scheme: 'vscode-resource'}).toString());
        if (this.urifileName === '') {
            html = html.replace(/\$\{defaultUrl\}/g, '');
        } else {
            html = html.replace(/\$\{defaultUrl\}/g, `${this.urifileName}`);
        }
        html = html.replace(/\$\{language\}/g, 'bs-BA');

        w.webview.html = html;

        return w;
    }
}