import { GenericObject } from "@mongez/reinforcements";
import { QuickPickItem } from "vscode";

export function getPickedOptions(options?: QuickPickItem[]) {
  const pickedOptions: GenericObject = {};

  if (!options) {
    return pickedOptions;
  }

  options.forEach((option) => {
    pickedOptions[option.label] = true;
  });

  return pickedOptions;
}

export async function pickOptions(
  vscode: any,
  optionsList: QuickPickItem[],
  placeHolder: string
) {
  const selectedOptions = await vscode.window.showQuickPick(optionsList, {
    canPickMany: true,
    placeHolder,
  });

  return getPickedOptions(selectedOptions);
}
