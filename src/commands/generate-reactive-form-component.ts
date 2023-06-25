// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateReactiveFormComponent } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { ReactiveFormComponentOptions } from "@mongez/gnz";

export function generateReactiveForm(
  defaultOptions: Partial<ReactiveFormComponentOptions> = {
    memo: true,
  }
) {
  return async function generateComponent(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the component name
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter the name of the component",
      placeHolder: "UserForm",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid component name";
      },
    });

    if (!componentName) {
      return;
    }

    await gnz.execute(
      generateReactiveFormComponent.execute({
        saveTo: path,
        inputs: {
          name: "text",
        },
        name: componentName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Component has been generated successfully.`
    );
  };
}
