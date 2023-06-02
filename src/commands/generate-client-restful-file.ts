// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { generateGenerateClientRestfulService, gnz } from "@mongez/gnz";
import * as vscode from "vscode";
import * as os from "os";

export async function generateClientRestfulService({ path }: any) {
  if (!path) {
    path = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  }

  // if os is windows, then remove the trailing slash

  if (os.platform() === "win32") {
    // remove the first slash
    path = path.replace(/^\//i, "");
  }

  // now ask the user to enter the name of the service name
  const serviceName = await vscode.window.showInputBox({
    prompt: "Enter the name of the service class",
    placeHolder: "users",
    validateInput: (text: string) => {
      return text ? null : "Please enter a valid service name";
    },
  });

  if (!serviceName) {
    return;
  }

  const route = await vscode.window.showInputBox({
    prompt:
      "Enter the route of the service (leave empty to be taken from the service name)",
    placeHolder: "/users",
  });

  await gnz.execute(
    generateGenerateClientRestfulService.execute({
      saveTo: path,
      name: serviceName,
      route,
    })
  );

  vscode.window.showInformationMessage(
    `Restful Service has been generated successfully.`
  );
}
