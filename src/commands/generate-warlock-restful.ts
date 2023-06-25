// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { gnz, generateWarlockRestful } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { WarlockRestfulOptions } from "@mongez/gnz";
import { toCamelCase, toKebabCase } from "@mongez/reinforcements";

export function generateWarlockRestfulHandler(
  defaultOptions: Partial<WarlockRestfulOptions> = {}
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the restful handler",
      placeHolder: "users",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid handler name";
      },
    });

    if (!moduleName) {
      return;
    }

    // remove the restful keyword from the name if found
    const name = moduleName.toLowerCase().startsWith("restful")
      ? moduleName.substring(7)
      : moduleName;
    const repository = toCamelCase(name) + "Repository";
    const repositoryPath = `./../repositories/${toKebabCase(name)}-repository`;

    await gnz.execute(
      generateWarlockRestful.execute({
        saveTo: path,
        name: moduleName,
        repository,
        repositoryPath,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Restful file has been generated successfully.`
    );
  };
}
