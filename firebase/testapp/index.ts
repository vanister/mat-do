#!/usr/bin/env node

import * as dotenv from 'dotenv';
dotenv.config();

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './src/app';
import { TestAppArgs } from './types';

const args = yargs(hideBin(process.argv)).boolean('verbose')
  .argv as TestAppArgs;

const verbose = !!args.verbose;

run({ verbose })
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
