// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateWarlockHandler } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { WarlockHandlerOptions } from "@mongez/gnz";

export function generateWarlockRequestHandler(
  defaultOptions: Partial<WarlockHandlerOptions> = {}
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the handler",
      placeHolder: "getUsers",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid handler name";
      },
    });

    if (!moduleName) {
      return;
    }

    try {
      await gnz.execute(
        generateWarlockHandler.execute({
          saveTo: path,
          name: moduleName,
          ...defaultOptions,
        })
      );

      vscode.window.showInformationMessage(
        `Handler has been generated successfully.`
      );
    } catch (error: any) {
      vscode.window.showErrorMessage(
        `An error occurred while generating the handler: ${error.message}`
      );
    }
  };
}
