// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateMoonlightModule } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { ReactMoonlightOptions } from "@mongez/gnz";

export function generateMoonlight(
  defaultOptions: Partial<ReactMoonlightOptions> = {
    usingPages: true,
    updateUrls: true,
  }
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the modules",
      placeHolder: "users",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid module name";
      },
    });

    if (!moduleName) {
      return;
    }

    await gnz.execute(
      generateMoonlightModule.execute({
        saveTo: path,
        name: moduleName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Module has been generated successfully.`
    );
  };
}
