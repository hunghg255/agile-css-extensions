import * as vscode from 'vscode';
import { BREAK_POINT, CSS_PROPS, CSS_PSEUDO } from './constant';

const regClass = /[className,class,\',\",\[]/;

export function activate(context: vscode.ExtensionContext) {
  const provider = {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext,
    ) {
      const line = document.lineAt(position.line);

      if (!regClass.test(line?.text)) {
        return [];
      }

      // const simpleCompletion1 = new vscode.CompletionItem({
      // 	label: 'background-color',
      // 	detail: " [bgc:]",
      // 	description: "AgileCss"
      // });
      // simpleCompletion1.insertText = "bgc:";

      const arr1 = Object.keys(CSS_PROPS).map((key) => {
        const simpleCompletion = new vscode.CompletionItem({
          label: CSS_PROPS[key],
          detail: ` [${key}:]`,
          description: 'AgileCss',
        });
        simpleCompletion.insertText = `${key}:`;

        return simpleCompletion;
      });

      const arr2 = Object.keys(CSS_PSEUDO).map((key) => {
        const simpleCompletion = new vscode.CompletionItem({
          label: CSS_PSEUDO[key],
          detail: ` [${key}:]`,
          description: 'AgileCss',
        });
        simpleCompletion.insertText = key;

        return simpleCompletion;
      });

      const arr3 = BREAK_POINT.map((key) => {
        const simpleCompletion = new vscode.CompletionItem({
          label: key,
          detail: ` [${key}]`,
          description: 'AgileCss',
        });
        simpleCompletion.insertText = key;

        return simpleCompletion;
      });

      return [...arr1, ...arr2, ...arr3];
    },
  };

  const subscription = vscode.languages.registerCompletionItemProvider(
    [
      { language: 'typescript', scheme: 'file' },
      { language: 'typescriptreact', scheme: 'file' },
      { language: 'javascript', scheme: 'file' },
      { language: 'javascriptreact', scheme: 'file' },
    ],
    provider,
    ' ',
  );

  context.subscriptions.push(subscription);
}
