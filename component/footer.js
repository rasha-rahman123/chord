import {useState, useEffect, useRef} from 'react'
import { useFrame } from 'react-three-fiber';
import { NoteLength } from './noteLength';
export const Footer = ({ transpose,ref0, ref1, setTranspose }) => {
  
    const [msg, setMsg] = useState(
        `choose different orbs and press 'SPACE' to hear them!`
      );

      const [pubMsg, setPub] = useState()
    
      var d = new Date()



     useEffect(() => {
         
    //    function ay() {
    //     setTimeout(msgRef.current.style.opacity < 1 ? msgRef.current.style.opacity = 1 : msgRef.current.style.opacity = 0
    //         ,3000  )
    //         setTimeout(console.log(d.getSeconds())
    //             ,6000  )
    //    }
        

    //     ay()

    const interval = setTimeout(() => setMsg(d.getSeconds()), 1000); 
    
     },[d]) 


     useEffect(() => {
         d.getSeconds()%5 === 0 && console.log('ay')
     })

    const msgRef = useRef()  
    return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: 20,
        left: 0,
        textAlign: "center",
        lineHeight: "70%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
        <div style={{
            display: 'block'
        }}>
<div>
    <NoteLength />
</div>
        <div
        style={{
          margin: "0 20px 0 0px",
          display: "flex",
          flexDirection: "column-reverse",
          lineHeight: "200%",
          width: "100px",
        }}
      >
        <span style={{ margin: "0 4px" }}>transpose</span>
        <span style={{ margin: "0 4px" }}>{transpose && transpose > 0 ? `+${transpose/100}` : `${transpose/100}`}</span>
        <div>
          {" "}
            {['-', '+'].map((x,i) =>       <span key={i} ref={i < 1 ? ref0 : ref1}
            onClick={() => setTranspose(x === '+' ? transpose + 100 : transpose - 100)}
            style={{ margin: "0 4px", fontSize: "2em", cursor: 'pointer' }}
          >
            {x}
          </span>)}
        </div>
      </div>
        </div>
      
      <div>
        {" "}
        <h3 style={{ color: "#5FACD7" }}>Chord Finder</h3>
        <span
            onClick={() => window.location.replace('https://rasha.world')}
          style={{
            color: "#181D45",
            padding: "0 10px",
            borderRadius: 5,
            backgroundColor: "#5FACD7",
            fontSize: "1rem",
            cursor: 'pointer'
          }}
        >
          developed by Rasha Rahman
        </span>
        <h3 ref={msgRef} onClick={() => setMsg(msg)} style={{ color: "white", opacity: 0.3 ,transition: '300ms opacity ease-in-out'}}>
         {msg}
        </h3>
      </div>
      <div>
          <span style={{width: 20}}> sick website
          </span>
        </div>
    </div>
  );
};
