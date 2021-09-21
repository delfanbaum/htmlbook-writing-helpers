// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htmlbook-writing-helpers" is now active!');

	let pasteWrapLink = vscode.commands.registerCommand('htmlbook-writing-helpers.pasteWrapLink', () => {
		vscode.env.clipboard.readText().then((clipboard) => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.selection){
				const document = editor.document;
				editor.edit(editBuilder => {
					editor.selections.forEach(sel => {
						var text = editor.document.getText(sel);
						if (/htt(p|ps):\/\/(.*?)/.test(clipboard)){
							text = `<a href="${clipboard}">${text}</a>`;
							editBuilder.replace(sel, text);
						} else {
							vscode.window.showInformationMessage("Error: You tried to paste-wrap something other than a link.");
						}
					});
				});
			}
		});
	});
	context.subscriptions.push(pasteWrapLink);
	
	let pasteXref = vscode.commands.registerCommand('htmlbook-writing-helpers.pasteXref', () => {
		vscode.env.clipboard.readText().then((clipboard) => {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.selection){
				const document = editor.document;
				editor.edit(editBuilder => {
					editor.selections.forEach(sel => {
						var text = `<a data-type="xref" href="#${clipboard}">#${clipboard}</a>`;
						editBuilder.replace(sel, text);
					});
				});
			}
		});
	});
	context.subscriptions.push(pasteXref);
}

// this method is called when your extension is deactivated
export function deactivate() {}
