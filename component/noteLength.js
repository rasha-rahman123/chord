import { useState } from "react"


export const NoteLength = ({range, setRange}) => {   
 
    return (
        <form style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <label>note length:</label>
            <label> {range}
            <input type="range" value={range} onChange={(e) => setRange(e.target.value)} min="1" max="8"/>
            </label>
        </form>
    )
}