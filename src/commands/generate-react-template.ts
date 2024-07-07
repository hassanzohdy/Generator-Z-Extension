// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  generateReactComponent as generateComponentApi,
  gnz,
} from "@mongez/gnz";
import * as vscode from "vscode";
import { ReactComponentOptions } from "@mongez/gnz/cjs/generators/generate-react-component/types";
import { preparePath } from "../utils/prepare-path";
import { getPickedOptions } from "../utils/get-picked-options";

export function generateReactComponent(
  defaultOptions: Partial<ReactComponentOptions> = {}
) {
  return async function generateComponent(options: any = {}) {
    const path = preparePath(options.path);

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

    const optionsList = [
      {
        label: "withIndex",
        description: "Create In A Folder With Index File",
        picked: false,
      },
      {
        label: "withProps",
        description: "With Props",
        picked: false,
      },
      {
        label: "memo",
        description: "Wrap the component with React.memo()",
      },
      {
        label: "forwardRef",
        description: "Wrap the component with React.forwardRef()",
        picked: false,
      },
    ];

    const selectedOptions = await vscode.window.showQuickPick(optionsList, {
      canPickMany: true,
      placeHolder: "Select the options you want to include",
    });

    const selectedOptionsValues = getPickedOptions(selectedOptions);

    await gnz.execute(
      generateComponentApi.execute({
        saveTo: path,
        name: componentName,
        memo: !!selectedOptionsValues.memo,
        forwardRef: !!selectedOptionsValues.forwardRef,
        withIndex: !!selectedOptionsValues.withIndex,
        withProps: !!selectedOptionsValues.withProps,
        ...defaultOptions,
      })
    );

    vscode.window.showInformationMessage(
      `Component has been generated successfully.`
    );
  };
}
