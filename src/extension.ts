// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-svg-preview" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('react-svg-preview.renderSVGPreview', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const currentFilename = vscode.window.activeTextEditor?.document.fileName;

		vscode.window.showInformationMessage("a");
		if (currentFilename) {
			vscode.workspace.openTextDocument(vscode.Uri.file(currentFilename)).then((document) => {
				const rawComponent = document.getText();
				const re = /\<svg(\n?.?)*\<\/svg\>/g;
        if (!rawComponent || !rawComponent.match(re)) {
          vscode.window.showInformationMessage("El archivo no sigue el formato requerido para crear su preview");
        }
				const svg = rawComponent.match(re)?.[0];
        if (!svg) {
          vscode.window.showInformationMessage("El archivo no sigue el formato requerido para crear su preview");
        }
        vscode.window.showInformationMessage("b");
				const strokeRegex = /stroke={.+}/g;
        const classNameRegex = /className={.+}/g;
        vscode.window.showInformationMessage("c");
				const cleanSvg = svg?.replace(strokeRegex, 'stroke="white"').replace(classNameRegex, 'stroke="white"');
        vscode.window.showInformationMessage("d");
				const panel = vscode.window.createWebviewPanel('log View', "Examedi SVG", vscode.ViewColumn.Two, { enableScripts: true });
        vscode.window.showInformationMessage("e");
        if (cleanSvg) {
          panel.webview.html = cleanSvg;
        }
			});
		}

		// vscode.window.createWebviewPanel(
		// 	'catCoding', // Identifies the type of the webview. Used internally
		// 	'Cat Coding', // Title of the panel displayed to the user
		// 	vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		// 	{} // Webview options..
		// );
	
    //  //Get path to resource on disk
    //  const extensionPath = extensionVariables_1.ext.context.extensionPath;
    //  const scriptFile = vscode.Uri.file(path.join(extensionPath, 'commands', 'azureCommands', 'acr-logs-utils', 'logScripts.js')).with({ scheme: 'vscode-resource' });
    //  const styleFile = vscode.Uri.file(path.join(extensionPath, 'commands', 'azureCommands', 'acr-logs-utils', 'style', 'stylesheet.css')).with({ scheme: 'vscode-resource' });
    //  const iconStyle = vscode.Uri.file(path.join(extensionPath, 'commands', 'azureCommands', 'acr-logs-utils', 'style', 'fabric-components', 'css', 'vscmdl2-icons.css')).with({ scheme: 'vscode-resource' });
    //  //Populate Webview
    //  this.panel.webview.html = this.getBaseHtml(scriptFile, styleFile, iconStyle);
    //  this.setupIncomingListeners();
    //  this.addLogsToWebView();
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
