// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { generateGenerateClientServiceFile, gnz } from "@mongez/gnz";
import * as vscode from "vscode";
import * as os from "os";

export async function generateClientServiceFile({ path }: any) {
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
    placeHolder: "UsersService",
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

  const endpointPath = await vscode.window.showInputBox({
    prompt:
      "Enter the endpoint path of the service",
    placeHolder: "shared/endpoints",
    value: "shared/endpoints",
  });

  await gnz.execute(
    generateGenerateClientServiceFile.execute({
      saveTo: path,
      name: serviceName,
      route,
      endpointPath,
    })
  );

  vscode.window.showInformationMessage(
    `Service has been generated successfully.`
  );
}
