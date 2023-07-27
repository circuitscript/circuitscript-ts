import { Component } from "./Component.js";

export type CFunction = () => CFunctionResult;

export type CFunctionResult = null | any;

export type ComponentPin = [Component, number];

// export type NetMap = Map<ComponentPin, Net>;