// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { generateMongoDBModel, gnz } from "@mongez/gnz";
import * as vscode from "vscode";
import { preparePath } from "../utils/prepare-path";

export async function generateMongoDBModelTemplate(options: any = {}) {
  const path = preparePath(options.path);

  console.log("=======");
  console.log(path);
  console.log("=======");

  const collectionName = await vscode.window.showInputBox({
    prompt: "Enter the collection name of the model",
    placeHolder: "users",
    validateInput: (text: string) => {
      return text ? null : "Please enter a valid collection name";
    },
  });

  if (!collectionName) {
    return;
  }

  await gnz.execute(
    generateMongoDBModel.execute({
      saveTo: path,
      collection: collectionName,
    })
  );

  vscode.window.showInformationMessage(
    `Model has been generated successfully.`
  );
}
