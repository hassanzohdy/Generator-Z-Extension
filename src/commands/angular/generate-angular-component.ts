// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { preparePath } from "../../utils/prepare-path";
import { exec } from "child_process";
import { pickOptions } from "../../utils/get-picked-options";

export function generateAngularComponent() {
  return async function generateComponent(passedOptions: any = {}) {
    const path = preparePath(passedOptions.path);

    // Now ask the user to enter the name of the component
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter the name of the component",
      placeHolder: "my-component",
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
          label: "withSpec",
          description: "With Spec",
          picked: true,
        },
        {
          label: "withStyle",
          description: "With Style",
          picked: true,
        },
      ],
      "Select the options you want to include"
    );

    const command = `npx ng generate component ${componentName} ${
      options.some((opt: any) => opt.label === "withSpec" && !opt.picked)
        ? "--skip-tests"
        : ""
    } ${
      options.some((opt: any) => opt.label === "withStyle" && opt.picked)
        ? "--style=scss"
        : ""
    }`;

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Generating Component...",
      },
      async () => {
        exec(command, { cwd: path }, (error, stdout, stderr) => {
          if (error) {
            console.log(error);
            vscode.window.showErrorMessage(
              `Error generating component: ${error.message}`
            );
            return;
          }
          if (stderr) {
            vscode.window.showErrorMessage(`Error: ${stderr}`);
            return;
          }
          vscode.window.showInformationMessage(
            `Component '${componentName}' has been generated successfully.`
          );
        });
      }
    );
  };
}
