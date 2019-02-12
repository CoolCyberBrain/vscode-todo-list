# TODO List

This VSCode extension will list all of your TODO-type comments in an easy-to-read tree view panel.

## Features
- Convenient way to view tagged comments
- Remove, Copy & Edit comments easily
- Insert comment quickly
- Comment formatting
- **Trello Integration** - Create Trello card directly from your IDE

## How It Works
Once installed, you'll see a list of `Action Comments` in `Explorer` view.

The list is updated every time you save a document (configurable)

List Actions:
- Click an item to open.
- Click `Remove` to delete the comment from document.
- `Right-Click -> Edit` to edit selected comment.

Press `Ctrl+Shift+T` to insert a comment in current cursor position.

## Supported Comments
TODO List supports any comment written in the next formats:
```
// <ACTION>: <message>
/* <ACTION>: <message> */
// <ACTION>(NAME): <message>
```
Examples:
```
// TODO: Refactor everything
/* FIXME: Please please please */
// HACK(Tzach): This is a workaround
```

Common tags/types:
- `TODO` – something to be done.
- `FIXME` – should be corrected.
- `HACK` – a workaround.
- `BUG` – a known bug that should be corrected.
- `UNDONE` – a reversal or "roll back" of previous code.

## Settings

- **Expression**

  RegExp to use for extracting comments (first group must be type, last must be text). We recommend capturing only all-uppercase types to avoid capturing `tslint:` and commented properties.

  Default: ```(?:\/\/|\/\*)[ ]?([A-Z]+)(?:\:|\(([A-Za-z\/\d ]+)\)\:)[ ]?(.*)```

- **Scan On Save**

  Scan comments when saving a file.

  Default: ```true```

- **Exclude**

  Glob pattern to exclude from scans.

  Default: ```{**/node_modules/**,**/bower_components/**,**/dist/**,**/build/**,**/.vscode/**,**/_output/**,**/*.min.*,**/*.map}```

- **Name**

  Name to use as `Created by`.

  Default: `empty`

- **Enable Comment Formatting**

  Enable comment formatting (Set color for comment type and make text italic)

  Default: `true`

- **Trello:Token**

  In order to create Trello cards, this extension requires read and write permissions.
  
  [Click here to generate token](https://trello.com/1/authorize?name=TODO%20List&scope=read,write&expiration=never&response_type=token&key=a20752c7ff035d5001ce2938f298be64).

- **Trello:Default List**

  List ID to create cards in (will be automatically set on first use)

## Supported Languages
This extension currently supports `Javascript` and `Typescript`. We'll add support for other languages in the near future.