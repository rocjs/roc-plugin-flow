import { invokeHook } from '../roc/util';

export default function flow() {
    invokeHook('run-flow-command');
}
