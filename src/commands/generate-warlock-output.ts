// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateWarlockOutput } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { WarlockOutputOptions } from "@mongez/gnz";

export function generateWarlockOutputHandler(
  defaultOptions: Partial<WarlockOutputOptions> = {
    withBaseOutputDetails: true,
    withExtend: true,
  }
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the output class",
      placeHolder: "user",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid output name";
      },
    });

    if (!moduleName) {
      return;
    }

    await gnz.execute(
      generateWarlockOutput.execute({
        saveTo: path,
        name: moduleName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Output class has been generated successfully.`
    );
  };
}
