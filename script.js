document.addEventListener('DOMContentLoaded', () => {
    // Parallax elements
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');

    // Mobile menu elements
    const menuButton = document.querySelector('.portfolio-header__menu-button');
    const nav = document.querySelector('.portfolio-header__nav');
    const menuIcon = document.querySelector('.portfolio-header__menu-icon');

    // Mobile menu toggle
    menuButton?.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        nav?.classList.toggle('is-active');
        menuIcon?.classList.toggle('is-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav?.contains(e.target) && !menuButton?.contains(e.target)) {
            nav?.classList.remove('is-active');
            menuButton?.setAttribute('aria-expanded', 'false');
            menuIcon?.classList.remove('is-active');
        }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            nav?.classList.remove('is-active');
            menuButton?.setAttribute('aria-expanded', 'false');
            menuIcon?.classList.remove('is-active');
        }
    });
    
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
