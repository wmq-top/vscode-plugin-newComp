// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { posix } from 'path';
import { lowerCaseFirstLetter, upCaseFirstLetter } from './staticFile/stringUtils';
import buildVueComponent from './staticFile/vueComponent';
import buildServieFile from './staticFile/serviceFile';
import buildTypeFile from './staticFile/typeFile';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "create-new-component" is now active!');

	let disposable = vscode.commands.registerCommand('create-new-component.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from create-new-component!');
	});

	context.subscriptions.push(disposable);

	let createCompWithService = vscode.commands.registerCommand('create-new-component.compWithService', async () => {
		if(!vscode.workspace.workspaceFolders) {
			vscode.window.showErrorMessage('no folder or workSpace opened');
			return;
		}

		// 获取当前文件夹路径
		const folderUri = vscode.workspace.workspaceFolders[0].uri;

		// 当前工作区文件列表
		const fileList = await vscode.workspace.fs.readDirectory(folderUri);

		// 获取当前是否存在src目录
		const flag = fileList.some((item: any[]) => item[0] === 'src');
		console.log(fileList);
		if(!flag) {
			vscode.window.showErrorMessage('Missing src folder, please check your project legitimate');
			return;
		}
		// 获取当前src路径下的所有组件的名字
		const srcFileUri = folderUri.with({ path: posix.join(folderUri.path, 'src') });
		const srcFileList = await vscode.workspace.fs.readDirectory(srcFileUri);

		const defaultName = 'NewComponent';
		const nameForComponent = await vscode.window.showInputBox({
			placeHolder: 'please input your component name(necessary)'
		});

		vscode.workspace.fs.createDirectory(folderUri.with({
			path: posix.join(folderUri.path, `/src/view/${lowerCaseFirstLetter(nameForComponent || defaultName)}`)
		}
		));

		// 构造vue组件
		const fileData = buildVueComponent(nameForComponent || defaultName);
		const fileName = `${upCaseFirstLetter(nameForComponent || defaultName)}.vue`;
		const targetUri = folderUri.with({
			path: posix.join(folderUri.path, 
				`/src/view/${lowerCaseFirstLetter(nameForComponent || defaultName)}/${fileName}`)
		});
		await vscode.workspace.fs.writeFile(targetUri, Buffer.from(fileData, 'utf-8'));

		// 构造类型文件
		const typeFileData = buildTypeFile(nameForComponent || defaultName);
		const typeFileName = 'types.ts';
		const typeFileTargetUri = folderUri.with({
			path: posix.join(folderUri.path, 
				`/src/view/${lowerCaseFirstLetter(nameForComponent || defaultName)}/${typeFileName}`)
		});
		await vscode.workspace.fs.writeFile(typeFileTargetUri, Buffer.from(typeFileData, 'utf-8'));

		// 构造服务文件
		const serviceData = buildServieFile(nameForComponent || defaultName);
		const serviceFileName = `${upCaseFirstLetter(nameForComponent || defaultName)}Service.ts`;
		const	serviceFileTargetUri = folderUri.with({
			path: posix.join(folderUri.path, 
				`/src/view/${lowerCaseFirstLetter(nameForComponent || defaultName)}/${serviceFileName}`)
		});
		await vscode.workspace.fs.writeFile(serviceFileTargetUri, Buffer.from(serviceData, 'utf-8'));

		vscode.window.showInformationMessage(`${upCaseFirstLetter(nameForComponent || defaultName)} has been created!`);
	});

	context.subscriptions.push(createCompWithService);
}

export function deactivate() {}
