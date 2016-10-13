import { invokeHook } from '../roc/util';

export default function flow({
    context: { config },
    arguments: { managed: managedArguments },
    options: { managed: managedOptions },
}) {
    let { targets } = managedArguments;

    if (!targets) {
        targets = config.settings.build.targets;
    }

    invokeHook('run-flow-command', targets, managedOptions);
}
