'use strict';

import { Disposable, window, ExtensionContext, commands, Terminal } from "vscode";
import { GaugeVSCodeCommands } from "../constants";

let terminalStack: Terminal[] = [];

export class TerminalProvider implements Disposable {
    private readonly _context: ExtensionContext;
    private readonly _disposable: Disposable;
    constructor(context: ExtensionContext) {
        this._context = context;
        this._disposable = Disposable.from(
            commands.registerCommand(GaugeVSCodeCommands.ExecuteInTerminal, (text: string) => {
                terminalStack.push(window.createTerminal('gauge install'));
                getLatestTerminal().show();
                getLatestTerminal().sendText(text);
                setTimeout(
                    () => window.showInformationMessage(`Please reload the project after Gauge is installed!`)
                    , 1000);
            }
        ));
    }

    dispose() {
        this._disposable.dispose()
    }
}

function getLatestTerminal() {
    return terminalStack[terminalStack.length - 1];
}
