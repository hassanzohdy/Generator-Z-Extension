// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  generateQwikComponent as generateComponentApi,
  gnz,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { QwikComponentOptions } from "@mongez/gnz/cjs/generators/qwik/generate-qwik-component/types";
import { preparePath } from "../../utils/prepare-path";
import { withIndexOptionPicker } from "../../utils/with-index-option-selection";
import { pickOptions } from "../../utils/get-picked-options";

export function generateQwikComponent() {
  return async function generateComponent(passedOptions: any = {}) {
    const path = preparePath(passedOptions.path);

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

    const options = await pickOptions(
      vscode,
      [
        {
          label: "withSignal",
          description: "With Signal",
          picked: false,
        },
        {
          label: "withTask",
          description: "With Task",
          picked: false,
        },
        {
          label: "withVisibleTask",
          description: "With Visible Task",
          picked: false,
        },
        {
          label: "withProps",
          description: "With Props",
          picked: false,
        },
        {
          label: "withIndex",
          description: "With Index",
          picked: false,
        },
      ],
      "Select the options you want to include"
    );

    await gnz.execute(
      generateComponentApi.execute({
        saveTo: path,
        name: componentName,
        ...options,
      })
    );

    vscode.window.showInformationMessage(
      `Component has been generated successfully.`
    );
  };
}
