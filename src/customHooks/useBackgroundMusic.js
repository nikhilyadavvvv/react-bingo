import { useEffect, useRef } from "react";

// A custom hook that plays background music
function useBackgroundMusic(musicFile) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audioRef.current = audio;

    // Function to play audio when user interacts with the page
    const playAudio = () => {
      audioRef.current.play();
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };

    // Add event listeners to play audio on user interaction
    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);

    // Clean up function to pause audio and remove event listeners
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
  }, [musicFile]);

  return audioRef;
}

export default useBackgroundMusic;