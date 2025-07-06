import React from "react"

const dotPositions = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

export default function Die({ value, isHeld, hold }) {
    const dots = dotPositions[value].map(([row, col], i) => {
        const isCenter = value === 1 && row === 1 && col === 1
        return (
            <span
                key={i}
                className={`dot${isCenter ? " center-dot" : ""}`}
                style={{
                    gridRow: row + 1,
                    gridColumn: col + 1,
                }}
            />
        )
    })

    return (
        <button
            className={`die-face${isHeld ? " held" : ""}`}
            onClick={hold}
            type="button"
        >
            <div className="dots-grid">{dots}</div>
        </button>
    )
}