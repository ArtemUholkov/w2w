document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("video");
    const preview = document.querySelector(".video");
    const closeBtn = document.querySelector(".close");

    preview.addEventListener("click", () => {
        modal.style.display = "flex";
        video.play();
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        video.pause();
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            video.pause();
        }
    });
});