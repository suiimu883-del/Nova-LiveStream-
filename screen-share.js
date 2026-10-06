let mediaStream = null;

async function startScreenShare() {
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 }
            },
            audio: true
        });

        const video = document.getElementById("livePreview");

        if (video) {
            video.srcObject = mediaStream;
            video.muted = true;
            await video.play();
        }

        const videoTrack = mediaStream.getVideoTracks()[0];

        if (videoTrack) {
            videoTrack.addEventListener("ended", () => {
                stopScreenShare();
            });
        }

        console.log("Screen sharing started");

    } catch (error) {
        console.error("Screen sharing failed:", error);
        alert("Screen sharing cancelled or not supported.");
    }
}

function stopScreenShare() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }

    const video = document.getElementById("livePreview");

    if (video) {
        video.srcObject = null;
    }

    console.log("Screen sharing stopped");
              }
