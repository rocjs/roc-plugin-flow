import { execFile } from 'child_process';

import { initLog } from 'roc';
import flow from 'flow-bin';

const log = initLog();

const HEAVY_EXCLAMATION_MARK_SYMBOL = '❗';

const numErrors = (stdout) => /Found (\d+) error[s]?/.exec(stdout)[1];
const removeErrorFooter = (stdout) => stdout.replace(/Found \d+ error[s]?/, '');
const errorString = (num) => ((num > 1) ? 'errors' : 'error');

export default () => () => {
    log.small.info('Starting flow type check. This may take a short while, please be patient.\n');

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
