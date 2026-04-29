import { useState, useEffect, useRef } from "react";
import "./index.css";

const rampRate = (video: HTMLVideoElement, from: number, to: number, durationMs: number) => {
    const start = performance.now();
    const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        video.playbackRate = from + (to - from) * eased;
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

function Logo({ content }) {
    const [done, setDone] = useState(() => sessionStorage.getItem("splash_shown") === "1");
    const [fading, setFading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const started = useRef(false);
    const rampingDown = useRef(false);

    useEffect(() => {
        const fallback = setTimeout(() => { sessionStorage.setItem("splash_shown", "1"); setDone(true); }, 15000);
        return () => clearTimeout(fallback);
    }, []);

    const handleCanPlay = () => {
        if (started.current) return;
        started.current = true;
        const v = videoRef.current;
        if (!v) return;
        setTimeout(() => {
            v.playbackRate = 0.5;
            v.play();
            rampRate(v, 0.5, 3, 800);
        }, 1000);
    };

    const handleTimeUpdate = () => {
        const v = videoRef.current;
        if (!v || rampingDown.current || !v.duration) return;
        if (v.duration - v.currentTime < 1.5) {
            rampingDown.current = true;
            rampRate(v, v.playbackRate, 0.3, 600);
        }
    };

    const handleEnded = () => {
        setTimeout(() => setFading(true), 500);
        setTimeout(() => { sessionStorage.setItem("splash_shown", "1"); setDone(true); }, 1000);
    };

    if (done) return <>{content}</>;

    return (
        <div className={`video-container${fading ? " fading" : ""}`}>
            <video ref={videoRef} muted preload="auto" onCanPlay={handleCanPlay} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}>
                <source src={`${process.env.PUBLIC_URL}/assets/logo_yng.webm`} type="video/webm" />
            </video>
        </div>
    );
}

export default Logo;
