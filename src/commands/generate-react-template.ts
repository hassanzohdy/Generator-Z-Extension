// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  generateReactComponent as generateComponentApi,
  gnz,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { ReactComponentOptions } from "@mongez/gnz/cjs/generators/generate-react-component/types";
import { preparePath } from "../utils/prepare-path";

export function generateReactComponent(
  defaultOptions: Partial<ReactComponentOptions> = {
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

    await gnz.execute(
      generateComponentApi.execute({
        saveTo: path,
        name: componentName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Component has been generated successfully.`
    );
  };
}
