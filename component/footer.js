import { useState, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { NoteLength } from "./noteLength";
import { VolumeSlider } from "./volumeSlider";

export const Footer = ({ transpose, ref0, ref1, setTranspose, range, setRange, vr, sVr }) => {
  const [msg, setMsg] = useState(
    `choose different orbs and press 'SPACE' to hear them!`
  );

  const [pubMsg, setPub] = useState();

  var d = new Date();

  useEffect(() => {
    //    function ay() {
    //     setTimeout(msgRef.current.style.opacity < 1 ? msgRef.current.style.opacity = 1 : msgRef.current.style.opacity = 0
    //         ,3000  )
    //         setTimeout(console.log(d.getSeconds())
    //             ,6000  )
    //    }

    //     ay()

    const interval = setTimeout(() => setMsg(d.getSeconds()), 1000);
  }, [d]);

  useEffect(() => {
    d.getSeconds() % 5 === 0 && console.log("ay");
  });

  const msgRef = useRef();
  return (
    <div
      style={{
        width: "100%",
        opacity: '100%',
        position: "fixed",
        bottom: 20,
        left: 0,
        textAlign: "center",
        lineHeight: "70%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: "25%",
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div>
          <NoteLength range={range} setRange={setRange} />
          <VolumeSlider range={vr} setRange={sVr} />
        </div>
        <div
          style={{
         
            display: "flex",
            flexDirection: "column-reverse",
            lineHeight: "150%",
          }}
        >
          <span >semitone tranpose</span>
          <span style={{
              fontWeight: 'bolder',
              fontSize: '2em    '
          }}>
            {transpose && transpose > 0
              ? `+${transpose / 100}`
              : `${transpose / 100}`}
          </span>
          <div>
            {" "}
            {["-", "+"].map((x, i) => (
              <span
                key={i}
                ref={i < 1 ? ref0 : ref1}
                onClick={() =>
                  setTranspose(x === "+" ? transpose + 100 : transpose - 100)
                }
                style={{ margin: "0 10px", fontWeight: 'bolder', fontSize: "2em", cursor: "pointer" }}
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "50%",
        }}
      >
        {" "}
        <h3 style={{ color: "#5FACD7" }}>Chord Finder</h3>
        <span
          onClick={() => window.location.replace("https://rasha.world")}
          style={{
            color: "#181D45",
            padding: "0 10px",
            borderRadius: 5,
            backgroundColor: "#5FACD7",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          developed by Rasha Rahman
        </span>
        <h3
          ref={msgRef}
          onClick={() => setMsg(msg)}
          style={{
            color: "white",
            opacity: 0.3,
            transition: "300ms opacity ease-in-out",
          }}
        >
          {msg < 15
            ? "tap an orb (or use keyboard) & then hit enter/space to hear it!"
            : msg > 29
            ? msg < 45
              ? "drag suggested chords to the top left and make progressions!!"
              : "press 'K' for more keyboard shortcuts!"
            : "share your progressions that you store!!!"}
        </h3>
      </div>
      <div
        style={{
          width: "25%",
        }}
      >
        <div
          style={{
         
            display: "flex",
            flexDirection: "column-reverse",
            lineHeight: "150%",
          }}
        >
          <span >https://iwillvote.com/</span>
          <span style={{
              fontWeight: 'bolder',
              fontSize: '2em    '
          }}>
            BLM
          </span>
          <div>
        <span
                
                style={{ margin: "0 10px", fontWeight: 'bolder', fontSize: "2em", cursor: "pointer" }}
              >
               have fun!
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};
