// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { generateReactMongez, gnz } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import { MongezReactModuleGeneratorOptions } from "@mongez/gnz/cjs/generators/generate-mongez-react-module/types";
import * as basePath from "path";

export function generateReactMongezModule(
  defaultOptions: Partial<MongezReactModuleGeneratorOptions> = {
    memo: false,
    forwardRef: false,
  }
) {
  return async function generateComponent(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the component name
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter the name of the module",
      placeHolder: "posts",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid module name";
      },
    });

    if (!componentName) {
      return;
    }

    const appName = basePath.basename(path);

    await gnz.execute(
      generateReactMongez.execute({
        saveTo: path,
        appName,
        name: componentName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Module has been generated successfully.`
    );
  };
}
