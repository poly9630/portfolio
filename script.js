document.addEventListener('DOMContentLoaded', () => {
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    
    let scrollPosition = window.pageYOffset;

    // Throttle function to limit the rate at which the scroll handler fires
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Parallax effect function
    const parallax = throttle(() => {
        const currentScroll = window.pageYOffset;
        const scrollDiff = currentScroll - scrollPosition;
        
        // Calculate new positions with different speeds for each layer
        const layer1Speed = currentScroll * 0.4;
        const layer2Speed = currentScroll * 0.2;

        // Apply transforms with different speeds
        layer1.style.transform = `translate3d(-50%, calc(-50% + ${layer1Speed}px), 0) scale(1.1)`;
        layer2.style.transform = `translate3d(-50%, calc(-50% + ${layer2Speed}px), 0) scale(1.2)`;

        scrollPosition = currentScroll;
    }, 16); // approximately 60fps

    // Add scroll event listener
    window.addEventListener('scroll', parallax);
});
