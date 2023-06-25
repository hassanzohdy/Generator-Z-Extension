// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  gnz,
  generateWarlockOutput,
  generateWarlockRepository,
  generateWarlockModule,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";
import type {
  WarlockModuleOptions,
  WarlockRepositoryOptions,
} from "@mongez/gnz";
import { toKebabCase, toStudlyCase } from "@mongez/reinforcements";
import * as pluralize from "pluralize";

export function generateWarlockModuleHandler(
  defaultOptions: Partial<WarlockModuleOptions> = {
    withEvents: true,
    withLocales: true,
  }
) {
  return async function generateModule(options: any = {}) {
    const path = preparePath(options.path);

    // now ask the user to enter the name of the module name
    const moduleName = await vscode.window.showInputBox({
      prompt: "Enter the name of the module name",
      placeHolder: "users",
      validateInput: (text: string) => {
        return text ? null : "Please enter a valid module name";
      },
    });

    if (!moduleName) {
      return;
    }

    await gnz.execute(
      generateWarlockModule.execute({
        saveTo: path,
        name: moduleName,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Warlock module has been generated successfully.`
    );
  };
}
