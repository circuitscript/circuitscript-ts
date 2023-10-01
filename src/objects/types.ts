import { Component } from './Component';

export type CFunction = (args) => CFunctionResult;

export type CFunctionResult = null | any;

export type ComponentPin = [Component, number];

// export type NetMap = Map<ComponentPin, Net>;

export type ComponentPinNet = [netName: string, instanceName: string, pin: number];