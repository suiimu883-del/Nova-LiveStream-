let mediaStream = null;

async function startScreenShare() {
    try {
        // Browser support check
        if (!navigator.mediaDevices) {
            throw new Error("mediaDevices is not available");
        }

        if (!navigator.mediaDevices.getDisplayMedia) {
            throw new Error("getDisplayMedia is not supported by this browser");
        }

        // Screen capture
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        const video = document.getElementById("screenPreview");

        if (!video) {
            throw new Error("screenPreview element not found");
        }

        video.srcObject = mediaStream;
        video.style.display = "block";
        video.muted = true;

        document.getElementById("camera").style.display = "none";
        document.getElementById("offline").style.display = "none";
        document.getElementById("status").innerText =
            "Screen Share Ready";

        const track = mediaStream.getVideoTracks()[0];

        if (track) {
            track.addEventListener("ended", () => {
                stopScreenShare();
            });
        }

    } catch (error) {
        console.error("Screen Share Error:", error);

        alert(
            "Screen Share কাজ করছে না.\n\n" +
            "কারণ: " + error.message
        );
    }
}

function stopScreenShare() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }

    const video = document.getElementById("screenPreview");

    if (video) {
        video.srcObject = null;
        video.style.display = "none";
    }

    document.getElementById("offline").style.display = "flex";
    document.getElementById("status").innerText = "Offline";
        }
