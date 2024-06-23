document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const links = navbar.querySelectorAll('a');
    const sections = document.querySelectorAll('section');
    const navbarHeight = navbar.offsetHeight;

    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Special case for Home section
        if (window.scrollY < sections[0].offsetTop - navbarHeight) {
            links[0].classList.add('active');
        }
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        updateActiveLink();
    });

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Immediately update the active link
            links.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Call updateActiveLink after the smooth scroll completes to ensure the correct link is highlighted
            setTimeout(updateActiveLink, 600); // Adjust timeout to ensure correct section is highlighted
        });
    });

    // Initial call to set the active link on page load
    updateActiveLink();
});
