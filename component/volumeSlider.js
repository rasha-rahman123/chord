import { useState } from "react"


export const VolumeSlider = ({range, setRange}) => {   
   
    return (
        <form style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <label>volume:</label>
            <label> {range}
            <input type="range" value={range} onChange={(e) => setRange(e.target.value)} min="1" max="100"/>
            </label>
        </form>
    )
}