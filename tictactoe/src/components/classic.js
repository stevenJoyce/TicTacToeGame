import "../App.css";
import TwoPlayer from "./twoPlayer";
import CpuGame from "./cpuMatch";
import { useState } from "react";

function Classic() {
    const [cpuType, setCpuType] = useState(false);
    const [twoPlayer, setTwoPlayer] = useState(false);

    const setCpu = () => {
        setCpuType(true);
        setTwoPlayer(false);
    }

    const setPlayer = () => {
        setCpuType(false);
        setTwoPlayer(true);
    }

    return (
        <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}> 
                <button onClick={setCpu} id="btn"> CPU Match </button>
                <button onClick={setPlayer} id="btn"> 2 Player </button>
            </div>

            {cpuType && <CpuGame />}
            {twoPlayer && <TwoPlayer />}
        </div>
    );
}

export default Classic;