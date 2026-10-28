const audioCtx = typeof window !== 'undefined' ?
 new (window.AudioContext || window.webkitAudioContext)() : null;

 function playSound(frequency, type,duration) {
    if(!audioCtx) return;

    // Resume context if suspended (crucial for mobile/Android WebViews)
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);

 }

 export const sounds = {
    click: () => playSound(440, 'square', 0.06),

    win: () => {
        playSound(523.25, "square", 0.08);
        setTimeout(() => {
            playSound(659.25, "square", 0.08);
        }, 100)
        setTimeout(() => {
            playSound(783.99, "square", 0.15);
        }, 200)
    },

    loss: () => {
        playSound(400, "sawtooth", 0.1);
        setTimeout(() => {
            playSound(250, "sawtooth", 0.15);
        }, 120);
    },

    draw: () => {
        playSound(523.25, "triangle", 0.1);
        setTimeout(() => {
            playSound(523.25, "triangle", 0.15);
        }, 200)
    },

    buttonClick: () => playSound(880, "sine", 0.05)
}
