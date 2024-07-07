// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  NextServerComponentOptions,
  generateNextServerReactComponent as generateComponentApi,
  gnz,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import { withIndexOptionPicker } from "../utils/with-index-option-selection";

export function generateNextjsServerComponent(
  defaultOptions: Partial<NextServerComponentOptions> = {
    memo: false,
    forwardRef: false,
  }
) {
  return async function generateComponent(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the component name
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter the name of the component",
      placeHolder: "MyComponent",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid component name";
      },
    });

    if (!componentName) {
      return;
    }

    const withIndex = await withIndexOptionPicker();

    if (withIndex === undefined) {
      return;
    }

    await gnz.execute(
      generateComponentApi.execute({
        saveTo: path,
        name: componentName,
        withIndex,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Component has been generated successfully.`
    );
  };
}
