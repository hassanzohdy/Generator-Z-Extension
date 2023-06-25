// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  gnz,
  generateWarlockOutput,
  generateWarlockRepository,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type { WarlockRepositoryOptions } from "@mongez/gnz";
import { toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import * as pluralize from "pluralize";

export function generateWarlockRepositoryHandler(
  defaultOptions: Partial<WarlockRepositoryOptions> = {}
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the repository class",
      placeHolder: "users",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid repository name";
      },
    });

    if (!moduleName) {
      return;
    }

    const modelName = toStudlyCase(pluralize(moduleName, 1));
    const modelPath = `./../models/${toKebabCase(pluralize(modelName, 1))}`;

    await gnz.execute(
      generateWarlockRepository.execute({
        saveTo: path,
        name: moduleName,
        modelPath: modelPath,
        model: modelName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Output class has been generated successfully.`
    );
  };
}
