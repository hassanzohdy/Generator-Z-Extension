// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { generateQwikPage as generatePageApi, gnz } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../../utils/prepare-path";
import { GenericObject } from "@mongez/reinforcements";
import { getPickedOptions } from "../../utils/get-picked-options";

export function generateQwikPage() {
  return async function generatePage(options: any) {
    try {
      let path = "";

      // log in vscode messages the path
      const selectedPath = (String(options.path) as any).replaceAll("\\", "/");

      if (selectedPath && (selectedPath as any).includes("src/routes")) {
        path = preparePath(selectedPath);
      } else {
        path = preparePath("") + "/src/routes";
      }

      // now ask the user to enter the name of the component name
      const componentName = await vscode.window.showInputBox({
        prompt: "Enter the page route path",
        placeHolder: "posts/[id]",
        validateInput: (text: string) => {
          return text ? null : "Please enter a valid qwik page path";
        },
      });

      if (!componentName) {
        return;
      }

      // now we want to display a multi select options to allow the developer to select the one or more of the following options:
      // 1. withHead
      // 2. withRouteLoader

      const optionsList = [
        {
          label: "withHead",
          description: "With Page Head",
          picked: false,
        },
        {
          label: "withRouteLoader",
          description: "With Route Loader",
          picked: false,
        },
      ];

      const selectedOptions = await vscode.window.showQuickPick(optionsList, {
        canPickMany: true,
        placeHolder: "Select the options you want to include",
      });

      const selectedOptionsValues = getPickedOptions(selectedOptions);

      console.log({
        ...selectedOptionsValues,
        saveTo: path,
        name: componentName,
      });

      await gnz.execute(
        generatePageApi.execute({
          ...selectedOptionsValues,
          saveTo: path,
          name: componentName,
        })
      );

      vscode.window.showInformationMessage(
        `Page has been generated successfully.`
      );
    } catch (error: any) {
      vscode.window.showErrorMessage(error.message);
    }
  };
}
