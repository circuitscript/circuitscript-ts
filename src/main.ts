import { Component } from "./objects/Component.js";

export default function main(): void {
    const component = new Component("helloWorld", 100);
    console.log(component + '');
}

main();