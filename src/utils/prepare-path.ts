import * as vscode from "vscode";
import * as os from "os";
export function preparePath(path?: string) {
  if (!path) {
    path = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  }

  // if os is windows, then remove the trailing slash
  if (os.platform() === "win32") {
    // remove the first slash
    path = String(path).replace(/^\//i, "");
  }

  return String(path);
}
