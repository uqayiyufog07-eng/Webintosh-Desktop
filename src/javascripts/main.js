function resetHeight() { document.body.style.height = `${window.innerHeight}px`; }

resetHeight();

window.addEventListener('resize', resetHeight);
window.addEventListener('orientationchange', resetHeight);
window.addEventListener('load', resetHeight);

