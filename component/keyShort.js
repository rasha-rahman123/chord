import { useRef } from "react";

export const KeyShort = ({togKey, setKey}) => {
  const noteArr = [
    { key: "A", tag: `'C Note'` },
    { key: "W", tag: `'Db Note'` },
    { key: "S", tag: `'D Note'` },
    { key: "E", tag: `'Eb Note'` },
    { key: "D", tag: `'E Note'` },
    { key: "F", tag: `'F Note'` },
    { key: "T", tag: `'Gb Note'` },
    { key: "G", tag: `'G Note'` },
    { key: "Y", tag: `'Ab Note'` },
    { key: "H", tag: `'A Note'` },
    { key: "U", tag: `'Bb Note'` },
    { key: "J", tag: `'B Note'` },
  ];

  const utilArr = [
    { key: "SPACEBAR", tag: `'Play Notes'` },
    { key: "ENTER", tag: `'Play Notes'` },
    { key: "BACKSPACE", tag: `'Reset Notes'` },
    { key: "Z", tag: `'Transpose 1 Semitone Down'` },
    { key: "X", tag: `'Transpose 1 Semitone Up'` },
    { key: "K", tag: `'Shortcut Menu Toggle'` },

  ];

  const ref = useRef()
  return (
    <div
      style={{
        position: "fixed",
        fontSize: "1em",
        display: "flex",
        justifyContent: "left",

        textAlign: "left",
        left: 10,
        top: 10,
        color: "white",
        zIndex: '1'
      }}
    >
        <div ref={ref} onClick={() => setKey(false)} style={{
            cursor: 'pointer',
            marginRight: 20,
            marginBotton: 30,
            color: '#181D45',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '32px',
            height: '32px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '16px',
            transform: 'scale(0.8)',
            boxShadow: '2px 2px 30px #181D45'
        }}>
           X
        </div>
   <div>
   <h4>Notes:</h4>
      <ul>
        {noteArr.map((x) => (
          <ul>
            <li
              style={{
                display: "inline",
                marginRight: 10,
              }}
            >
              {x.key}
            </li>
            <li
              style={{
                display: "inline",
                marginRight: 10,
                opacity: 0.3,
              }}
            >
              -
            </li>
            <li
              style={{
                display: "inline",
                opacity: 0.8,
                fontWeight: "lighter",
              }}
            >
              {x.tag}
            </li>
          </ul>
        ))}
      </ul>
   </div>
   <div>
   <h4>Utilities:</h4>
      <ul>
        {utilArr.map((x) => (
          <ul>
            <li
              style={{
                display: "inline",
                marginRight: 10,
              }}
            >
              {x.key}
            </li>
            <li
              style={{
                display: "inline",
                marginRight: 10,
                opacity: 0.3,
              }}
            >
              -
            </li>
            <li
              style={{
                display: "inline",
                opacity: 0.8,
                fontWeight: "lighter",
              }}
            >
              {x.tag}
            </li>
          </ul>
        ))}
      </ul>
   </div>

    </div>
  );
};
