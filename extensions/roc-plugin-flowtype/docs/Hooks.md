# Hooks for `roc-plugin-flow`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-plugin-flow](#roc-plugin-flow)
  * [run-flow-command](#run-flow-command)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

Makes it possible to modify the settings object before a command is started and after potential arguments from the command line and configuration file have been parsed. This is a good point to default to some value if no was given or modify something in the settings.

__Initial value:__ _Nothing_  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       |              |

## roc-plugin-flow

### run-flow-command

Used to run the flow command

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_
