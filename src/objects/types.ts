import { Component } from "./Component.js";
import { Net } from "./Net.js";

export type ComponentPin = [Component, number];

export type NetMap = Map<ComponentPin, Net>;