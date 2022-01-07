import { Html, useProgress, useTexture } from "@react-three/drei";
import React from "react";

function map(value, min1, max1, min2, max2) {
    return parseInt(min2 + (value - min1) * (max2 - min2) / (max1 - min1));
}

export default function Loading () {
    const { active, progress, errors, item, loaded, total } = useProgress();
    let pngNum = map(progress, 0, 100, 1, 48);
    let path = `/images/loading/note_animation${pngNum}.png`

    return (
        <img className="image-sequence" src={path} />
    );
}