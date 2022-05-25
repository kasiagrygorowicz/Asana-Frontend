import { useEffect, useState } from "react";
import biegający from ".././pages/images/biegający.png";


export default function Unicorn({start}) {

  const [x, setX] = useState("0px 0px");

  var scale = 1.3;
  var frameHeight = 120 * scale;
  var frameWidth = 128 * scale;
  var frames = 6;
  var frame = 0;

  var marginT = '15px'
  var marginStart = 83;
  var marginEnd = -20;
  var m = marginStart;


  const [marginL, setMarginL] = useState();

  const [flag, setFlag] = useState(0);

  const [s, setS] = useState(false);


  useEffect(() => {
    
    var interval = setInterval(function () {
        if(start === 1) {
            if (flag === 0) {
                frame = frame + 1;
                m = m - 0.8;
    
                setFlag(1);
            } else {
                setFlag(0);
            }
            var frameOffset = (frame % frames) * frameHeight * (-1);
            setX("0px " + frameOffset + "px");

            if (m <= marginEnd) {
                clearInterval(interval)
            }

            setMarginL("" + m + "%");
            setS(true);
        }  else {
            setS(false);
        }

    }, 80);
  }, []);

  return (
    <div className="App">
      {s ?
        <img key={frame.toString} src={biegający} 
        width={"" + frameWidth + "px"} 
        height={"" + frameHeight + "px"} 

        style={{
            marginTop: marginT,
            marginLeft: marginL,
            objectFit: "cover",
            objectPosition: x,
            position: 'absolute',
            zIndex: '-1'
        }}
        alt={"unicorn"}/>
        : <div/>
      }
      
    </div>
  );
}
