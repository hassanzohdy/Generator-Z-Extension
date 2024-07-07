import * as vscode from "vscode";

export async function withIndexOptionPicker() {
  const withIndex = await vscode.window.showQuickPick(
    [
      {
        label: "Yes, Create inside folder with index file.",
        value: 1,
      },
      {
        label: "No, just create a file.",
        value: 2,
      },
    ],
    {
      placeHolder: "Do you want to generate index file? (Yes/No), default: Yes",
    }
  );

  if (!withIndex?.value) {
    return undefined;
  }

  return withIndex.value === 1;
}
