import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';
import flow from '../commands/flow';

const lazyRequire = lazyFunctionRequire(require);

export default {
    description: 'Plugin providing FlowType type checking.',
    config,
    meta,
    actions: [
        {
            hook: 'run-flow-command',
            description: 'Run flow command',
            action: lazyRequire('../actions/flow'),
        },
        {
            hook: 'babel-config',
            action: lazyRequire('../actions/babel'),
        },
    ],
    commands: {
        development: {
            flow: {
                command: flow,
                description: 'Runs typechecking on current project',
                settings: true,
            },
        },
    },
    hooks: {
        'run-flow-command': {
            description: 'Used to run the flow command',
        },
    },
};
