# System Architecture

## Overview

- Generate a QR Code with embedded data for the items that you want to track
  - Account needed?
    - Leverage SSO from google, ms, apple
  - TODO: QR Code format/resolution
- Base64 encoded hash fragment with basic data
- MongoDb for datastore
- Generate random short path or have user input themselves

## Design Tools

Code to UML: https://www.nomnoml.com