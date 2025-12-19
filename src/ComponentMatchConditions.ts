import { ClassComponent } from "./objects/ClassComponent.js";
import { NumericValue } from "./objects/ParamDefinition.js"
import { TypeProps } from "./objects/types.js";

export type ConditionNode = {
    // Parameter key to compare with
    key: {
        type: string,
        value: string | NumericValue
    },

    // Values to compare with
    values: any[],

    // Children of this condition node
    children: ConditionNode[],

    // If this is set, then this is an end-node in the condition tree.
    endValue: any[],
}

export function flattenConditionNodes(conditionNodes: ConditionNode[], level = 0): ConditionNode[][] {
    const conditionBranches: ConditionNode[] = [];
    conditionNodes.forEach(node => {
        
        // If values are not defined, then the children keys are 
        // the values
        const { key, values, children = [], endValue = [] } = node;
        // console.log(level, 'key', key, 'values', values, endValue, 'children len: ' + children.length)

        // Remove all children
        const firstCondition: ConditionNode = {
            key, values, endValue
        }

        if (children.length > 0) {
            const nestedBranches = flattenConditionNodes(children, level + 1);
            // console.log(level, 'got branches', nestedBranches.length);

            nestedBranches.forEach(tmpCondition => {

                if (values === undefined) {
                    // Values not defined, get values key from the first condition in 
                    // the list of tmpCondition

                    const modifiedCondition = {
                        ...firstCondition,
                        values: [tmpCondition[0].key.value],
                        endValue: tmpCondition[0].endValue
                    };

                    // Exclude the first condition, since it is merged with
                    // the current condition.
                    conditionBranches.push([
                        modifiedCondition,
                        ...tmpCondition.slice(1)
                    ]);

                } else {
                    conditionBranches.push([
                        firstCondition,
                        ...tmpCondition
                    ]);
                }
            });
        } else {
            conditionBranches.push([firstCondition]);
        }
    });

    return conditionBranches;
}

export type PartConditions = {
    endValue: string[],
    conditions: ConditionNode[],
}

export function extractPartConditions(conditionBranches: ConditionNode[][]): PartConditions[] {
    const partConditions = conditionBranches.map(branch => {
        // The last item will contain the final value to use
        const lastNode = branch[branch.length - 1];
        const { endValue } = lastNode;
        const conditions: ConditionNode[] = [];

        branch.forEach((node, index) => {
            conditions.push({
                key: node.key,
                values: node.values
            });
        });

        // Dump the conditions
        // console.log('endValue', endValue, 'conditions:');
        // conditions.forEach(condition => {
        //     console.log('-- ' + JSON.stringify(condition.key) + " " + condition.values);
        // });

        return {
            endValue,
            conditions
        }
    });

    return partConditions;
}

export function partMatchesConditions(instance: ClassComponent, partConditions: PartConditions[]): any | undefined {
    for (let i = 0; i < partConditions.length; i++) {
        const { endValue, conditions } = partConditions[i];

        const didNotMatch = conditions.some(condition => {
            // Return false to indicate that next condition should be
            // processed.
            const { key, values } = condition;

            let useKey = '';
            if (key.type === 'ID') {
                useKey = key.value;
            } else {
                // Other types not supported yet, quit matching.
                console.log('key type not supported', key);
                return true;
            }

            if (useKey === 'type') {
                // Special case, type is not in parms, so this handled
                // differently.
                return (instance.typeProp !== values[0]);

            } else {
                if (!instance.hasParam(useKey)) {
                    // If params, does not exist, then quit matching.
                    return true;
                } else {
                    // Match first value only
                    const paramValue = instance.getParam(useKey);
                    const compareValue = values[0];

                    if (typeof compareValue === "string") {
                        return (compareValue !== paramValue);
                    } else if (typeof compareValue === 'object') {
                        if (compareValue instanceof NumericValue) {
                            return !compareValue.eq(paramValue as NumericValue);
                        }
                    }
                }
            }
        });

        if (didNotMatch === false) {
            // Return the first match
            return endValue;
        }
    }
}

export function applyPartConditions(instances: ClassComponent[], paramKeys: string[], partConditions: PartConditions[]): void {
    instances.forEach(item => {
        // get the params
        if (item.typeProp !== TypeProps.Graphic) {
            const matchedResult = partMatchesConditions(item, partConditions);

            if (matchedResult !== undefined) {
                // console.log(item.instanceName, matchedResult);
                paramKeys.forEach((paramKey, index) => {
                    if (matchedResult[index] !== undefined) {
                        item.setParam(paramKey, matchedResult[index]);
                    }
                });
            }
        }
    });
}