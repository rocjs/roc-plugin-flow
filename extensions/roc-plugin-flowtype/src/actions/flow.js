import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';

import { initLog } from 'roc';
import flow from 'flow-bin';

import { default as flowconfig } from '../resources/flowconfig';

const log = initLog();
const HEAVY_EXCLAMATION_MARK_SYMBOL = '❗';

const numErrors = (stdout) => /Found (\d+) error[s]?/.exec(stdout)[1];
const removeErrorFooter = (stdout) => stdout.replace(/Found \d+ error[s]?/, '');
const errorString = (num) => ((num > 1) ? 'errors' : 'error');

const configFileExists = () => fs.existsSync(path.join(process.cwd(), '.flowconfig'));

const createConfigFile = () => {
    const target = path.join(process.cwd(), '.flowconfig');

    fs.writeFileSync(target, flowconfig);
};

export default () => () => {
    if (!configFileExists()) {
        log.small.warn('No .flowconfig file found - creating.');
        log.small.info('You should commit .flowconfig to your source code repsository.');
        createConfigFile();
    } else {
        log.small.info('Using .flowconfig file in root of project.');
    }

    log.small.info('Starting Flow type check. This may take a short while, please be patient.\n');

    return () => execFile(flow, ['check'], (err, stdout) => {
        if (err) {
            const num = numErrors(stdout);

            log.small.raw('warn', 'red', HEAVY_EXCLAMATION_MARK_SYMBOL)(`Flow found ${num} ${errorString(num)}:\n`);
            log.small.raw('error')(removeErrorFooter(stdout));
        }

        if (stdout) {
            log.small.success(stdout);
        }
    });
};
