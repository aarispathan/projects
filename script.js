document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const quantity = parseInt(getComputedStyle(slider).getPropertyValue("--quantity"));
    let rotationY = 0;

    const updateSliderTransform = () => {
        slider.style.transform = `perspective(1000px) rotateX(-16deg) rotateY(${rotationY}deg)`;
    };

    // Auto rotate
    let autoRotate = setInterval(() => {
        rotationY += 360 / quantity;
        updateSliderTransform();
    }, 1000);

    // Button navigation
    document.querySelector(".slide-left").addEventListener("click", () => {
        rotationY -= 360 / quantity;
        updateSliderTransform();
        resetAutoRotate();
    });

    document.querySelector(".slide-right").addEventListener("click", () => {
        rotationY += 360 / quantity;
        updateSliderTransform();
        resetAutoRotate();
    });

    function resetAutoRotate() {
        clearInterval(autoRotate);
        autoRotate = setInterval(() => {
            rotationY += 360 / quantity;
            updateSliderTransform();
        }, 2000);
    }

    // 🖱️ Scroll with mouse only when hovering over the slider
    slider.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY > 0 || e.deltaX > 0) {
            rotationY += 360 / quantity;
        } else {
            rotationY -= 360 / quantity;
        }
        updateSliderTransform();
        resetAutoRotate();
    }, { passive: false });

    updateSliderTransform();
});
