import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

import { Config } from '../config';
import { ActionComment } from '../models/action-comment';
import { generateComment } from '../functions/generate-comment';
import { editComment } from '../functions/edit-comment';
import { insertComment } from '../functions/insert-comment';
import { TrackFeature } from './telemetry';
import { registerCommand } from '../functions/register-command';

export class Modifications {

    constructor(context: vscode.ExtensionContext, private config: Config) {
        registerCommand(context, 'extension.editComment', this.editCommentCommand.bind(this));
        registerCommand(context, 'extension.insertComment', this.insertCommentCommand.bind(this));
        registerCommand(context, 'extension.copyComment', this.copyCommentCommand.bind(this));
    }

    updateConfiguration(config: Config) {
        this.config = config;
    }

    @TrackFeature('Edit')
    private async editCommentCommand(item: ActionComment) {
        item = await this.getUserInputs(item);

        if (!item) {
            return;
        }

        const newComment = generateComment(item);
        editComment(item, newComment);
    }

    @TrackFeature('Insert')
    private async insertCommentCommand() {
        const item = await this.getUserInputs();
        if (!item) {
            return;
        }
        insertComment(item);
    }

    @TrackFeature('Copy')
    private async copyCommentCommand(item: ActionComment) {
        const text = generateComment(item);
        await clipboardy.write(text);
    }

    private async getUserInputs(item?: ActionComment) {
        item = item || new ActionComment(null);
        const data = [
            { prompt: 'Comment type', value: item && item.commentType, key: 'commentType' },
            { prompt: 'Text', value: item && item.label, key: 'label' },
            { prompt: 'Created by', value: (item && item.createdBy) || this.config.name, key: 'createdBy' }
        ];

        for (let i = 0; i < data.length; i++) {
            const input = data[i];
            const newValue = await vscode.window.showInputBox({ prompt: input.prompt, value: input.value });
            if (newValue === undefined) {
                return;
            }

            item[input.key] = newValue;
        }

        return item;
    }

}