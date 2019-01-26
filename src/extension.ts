// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { PdfPanel } from './pdfPanel';
import { Global } from './global';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "pdf-view" is now active!');
	Global.context = context;

	let disposable = vscode.commands.registerCommand('pdf.view', () => {
		PdfPanel.create();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}