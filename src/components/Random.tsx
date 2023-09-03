/*
import { useState } from "react";

let usedLeftOffsets = [0];
export const randLeft = () => {
    let leftOrRight = Math.floor(Math.random() * 2) % 2 === 0;
    let offset = 0;
    while (usedLeftOffsets.includes(offset)) {
        offset = Math.floor((Math.random() / 0.1 / 10) * 10) + 10;
    }
    offset = leftOrRight ? 100 - offset : offset;
    usedLeftOffsets.push(offset);
    return offset;
};


let usedTopOffsets = [0];
export const randTop = () => {
    let offset = 0;
    while (usedTopOffsets.includes(offset)) {
        offset = Math.floor((Math.random() / 0.1 / 10) * 80) + 10;
    }
    usedTopOffsets.push(offset);
    return offset;
};


export const randAngle = () => {
    return Math.floor(Math.random() * 2) % 2 === 0 ? 30 : -30;
};
*/

export const randLeft = () => {
    let leftOrRight = Math.floor(Math.random() * 2) % 2 === 0;
    let offset = Math.floor((Math.random() / 0.1 / 10) * 10) + 10;
    offset = leftOrRight ? 100 - offset : offset;
    return offset;
};


export const randTop = () => {
    let offset = 0;
        offset = Math.floor((Math.random() / 0.1 / 10) * 80) + 10;
    return offset;
};


export const randAngle = () => {
    return Math.floor(Math.random() * 2) % 2 === 0 ? 30 : -30;
};