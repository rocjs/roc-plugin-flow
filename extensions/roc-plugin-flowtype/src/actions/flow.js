import { initLog } from 'roc';
import { execFile } from 'child_process';
import flow from 'flow-bin';

const log = initLog();

export default () => (targets) => {
    log.large.info('Starting flow type check.');
    
    return () => execFile(flow, ['check'], (err, stdout) => {

        if (err) {
            log.small.error(err);
        }

        if (stdout) {
            log.small.info(stdout);
        }
    });
}
