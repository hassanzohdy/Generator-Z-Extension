// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateSuperTableComponent } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { SuperTableComponentOptions } from "@mongez/gnz";

export function generateSuperTable(
  defaultOptions: Partial<SuperTableComponentOptions> = {
    memo: true,
    asPage: true,
  }
) {
  return async function generateComponent(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the component name
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter the name of the component",
      placeHolder: "UsersPage",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid component name";
      },
    });

    if (!componentName) {
      return;
    }

    await gnz.execute(
      generateSuperTableComponent.execute({
        saveTo: path,
        columns: {
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
