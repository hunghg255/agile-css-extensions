import * as vscode from 'vscode';
import { BREAK_POINT, CSS_PROPS, CSS_PSEUDO } from './constant';

export function activate(context: vscode.ExtensionContext) {
  const provider = {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext,
    ) {
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

  const provider1 = vscode.languages.registerCompletionItemProvider(
    { language: 'typescript' },
    provider,
  );
  const provider2 = vscode.languages.registerCompletionItemProvider(
    { language: 'javascript' },
    provider,
  );
  const provider3 = vscode.languages.registerCompletionItemProvider(
    { language: 'typescriptreact' },
    provider,
  );
  const provider5 = vscode.languages.registerCompletionItemProvider(
    { language: 'javascriptreact' },
    provider,
  );

  context.subscriptions.push(provider1, provider2, provider3, provider5);
}
