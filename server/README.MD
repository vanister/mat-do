# Matdo .NET Server

This project is **deprecated**. Firebase is now used as the backend for Matdo.

## Setup

This project was created using the .net core cli and VS Code.

A Solution file is provided only for convenience.

## Environments

Create an `appsettings.Local.json` file and put your Mongo or other configuration overrides there.
`appsettings.Local.json` should be ignored and not committed to source control.

- Set `ASPNETCORE_ENVIRONMENT` in the `launch.json` file to control which `appsettings.json` file is used
  - `Local` to use `appsettings.Local.json`, this file is ignored and shouldn't be committed
  - `Development` to use `appsettings.Development.json`, this is the default file
  - 
