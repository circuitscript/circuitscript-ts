import { NodeScriptEnvironment } from "./environment";
import { ESMNodeScriptEnvironment } from "./esm-environment";

export function getNewEnvironment(): NodeScriptEnvironment {
    return new ESMNodeScriptEnvironment();
}