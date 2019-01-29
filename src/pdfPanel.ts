import * as vscode from 'vscode';
import { Global } from './global';
import * as path from 'path';
import * as fs from 'fs';

export class PdfPanel {

    public static currentPdfPanel: PdfPanel;
    public static pdfNum: number = 1;

    public static create(fileName?: string) {
        PdfPanel.currentPdfPanel = new PdfPanel(fileName);
        PdfPanel.pdfNum++;
    }

    private readonly extensionPath: string;
    private static viewType: 'PDF';
    //private webPanel: vscode.WebviewPanel;
    private panelCaption: string;
    private fileName: string;

    private constructor(fileName?: string) {

        if (fileName) {
            this.fileName = fileName;
        } else {
            this.fileName = '';
        }

        this.extensionPath = Global.context.extensionPath;
        if (this.fileName === '') {
            this.panelCaption = 'PDF viewer';
        } else {
            this.panelCaption = path.basename(this.fileName);
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

        const extF18 = vscode.extensions.getExtension('bout.f18-klijent');

        if (extF18) {
            localResourceRoots.push(vscode.Uri.file(path.join(extF18.extensionPath, '..', 'F18', 'data')));
        }

        const w = vscode.window.createWebviewPanel(
            PdfPanel.viewType,
            this.panelCaption,
            { viewColumn: vscode.ViewColumn.Active, preserveFocus: false },
            {
                enableScripts: true, // Enable javascript in the webview
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
        html = html.replace(/\$\{extensionPath\}/g, 'vscode-resource:' + this.extensionPath);
        if (this.fileName === '') {
            html = html.replace(/\$\{defaultUrl\}/g, '');
        } else {
            html = html.replace(/\$\{defaultUrl\}/g, `vscode-resource:${this.fileName}`);
        }
        html = html.replace(/\$\{language\}/g, 'bs-BA');

        w.webview.html = html;

        return w;
    }
}