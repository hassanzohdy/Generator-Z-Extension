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
import { generateNextjsClientComponent } from "./commands/generate-nextjs-client-component";
import { generateNextjsServerComponent } from "./commands/generate-nextjs-server-component";
import { generateQwikComponent } from "./commands/qwik/generate-qwik-component";
import { generateQwikPage } from "./commands/qwik/generate-qwik-page";
import { generateAngularComponent } from "./commands/angular/generate-angular-component";

const commands: any = {
  generateReactComponent: generateReactComponent(),
  generateNextjsClientComponent: generateNextjsClientComponent(),
  generateNextjsServerComponent: generateNextjsServerComponent(),
  generateCascadeModel: generateMongoDBModelTemplate,
  generateAngularComponent: generateAngularComponent(),
  // generateAngularModule: generateAngularModule,
  // generateAngularDirective: generateAngularDirective,
  // generateAngularService: generateAngularService,
  // generateAngularPipe: generateAngularPipe,
  // generateAngularGuard: generateAngularGuard,
  // generateAngularInterceptor: generateAngularInterceptor,
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
  }),
  generateWarlockRestfulHandler: generateWarlockRestfulHandler(),
  generateWarlockOutput: generateWarlockOutputHandler(),
  generateWarlockRepository: generateWarlockRepositoryHandler(),
  generateQwikComponent: generateQwikComponent(),
  generateQwikPage: generateQwikPage(),
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
