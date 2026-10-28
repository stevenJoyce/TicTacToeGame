import { useEffect, useState, useRef } from "react";


export default function SettingsPage() {
    const [playMusic, setPlayMusic] = useState(false);

    const audioRef = useRef(null);
    const [aiLevel, setAiLevel] = useState(() => {
        return localStorage.getItem("aiLevel") || "medium";
    });

    const handleAiLevelChange = (e) => {
        const newLevel = e.target.value;
        setAiLevel(newLevel);
        localStorage.setItem("aiLevel", newLevel);
    }

    useEffect(() => {
        if(!audioRef.current) {
            audioRef.current = new Audio("/the_mountain-retro-game-593063.mp3");
            audioRef.current.loop = true;
        }

        if(playMusic) {
            console.log("Music is playing");
            audioRef.current.play().catch(() => {});
        } 
        if(!playMusic) {
            console.log("Music is paused");
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset to start
        }
    }, [playMusic]);

    return (
        <div>
            <h2>Settings</h2>
            <label>
                <input
                    type="checkbox"
                    checked={playMusic}
                    onChange={(e) => setPlayMusic(e.target.checked)}
                />
                Play Music
            </label> <br />
            <label> AI level:
                <select value={aiLevel} onChange={handleAiLevelChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
        </div>
    );
}
