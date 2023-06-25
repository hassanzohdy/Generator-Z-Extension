// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { generateReactComponent } from "./commands/generate-react-template";
import { generateMongoDBModelTemplate } from "./commands/generate-mongodb-model";
import { generateClientServiceFile } from "./commands/generate-client-service-file";
import { generateClientRestfulService } from "./commands/generate-client-restful-file";
import { generateReactMongezModule } from "./commands/generate-react-mongez-module";
import { generateReactiveForm } from "./commands/generate-reactive-form-component";
import { generateSuperTable } from "./commands/generate-super-table-component";
import { generateMoonlight } from "./commands/generate-moonlight-module";
import { generateWarlockRequestHandler } from "./commands/generate-warlock-reqeust-handler";
import { generateWarlockRestfulHandler } from "./commands/generate-warlock-restful";
import { generateWarlockOutputHandler } from "./commands/generate-warlock-output";
import { generateWarlockRepositoryHandler } from "./commands/generate-warlock-repository";
import { generateWarlockModuleHandler } from "./commands/generate-warlock-module";

const commands: any = {
  generateReactComponent: generateReactComponent({
    memo: false,
    forwardRef: false,
  }),
  generateReactMemoComponent: generateReactComponent({ memo: true }),
  generateReactForwardRefComponent: generateReactComponent({
    forwardRef: true,
  }),
  generateReactWithMemoAndForwardRefComponent: generateReactComponent({
    memo: true,
    forwardRef: true,
  }),
  generateMongoDBModel: generateMongoDBModelTemplate,
  generateClientService: generateClientServiceFile,
  generateRestfulService: generateClientRestfulService,
  generateReactMongezModule: generateReactMongezModule(),
  generateReactiveFormComponent: generateReactiveForm(),
  generateSuperTableComponent: generateSuperTable(),
  generateMoonlightModule: generateMoonlight(),
  generateWarlockModule: generateWarlockModuleHandler(),
  generateWarlockHandler: generateWarlockRequestHandler(),
  generateWarlockHandlerWithValidation: generateWarlockRequestHandler({
    withValidation: true,
    rules: {
      name: ['required', 'string']
    },
  }),
  generateWarlockRestfulHandler: generateWarlockRestfulHandler(),
  generateWarlockOutput: generateWarlockOutputHandler(),
  generateWarlockRepository: generateWarlockRepositoryHandler(),
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  for (const command in commands) {
    const generateReactComponentButton = vscode.commands.registerCommand(
      command,
      commands[command]
    );
    context.subscriptions.push(generateReactComponentButton);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
