document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init("YOUR_EMAILJS_USER_ID");

    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Send the email
        emailjs.send("service_5pr6vkl", "template_gce56fh", {
            from_name: name,
            message: message,
            email: email
        }).then(function () {
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Reset form fields
        }, function (error) {
            alert('Failed to send message: ' + JSON.stringify(error));
        });
    });

    // Collapse the navbar when a link is clicked and scroll to the section
    document.querySelectorAll('.navbar-nav a').forEach(function (element) {
        element.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 56, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }

            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler.getAttribute('aria-expanded') === 'true') {
                navbarToggler.click();
            }
        });
    });

    // Highlight the nav link based on the scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const aboutUsDropdown = document.querySelector('.nav-link.dropdown-toggle');

    function highlightCurrentNav() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70; // Adjust to highlight sooner
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        if (current === "who-we-are" || current === "meet-our-staff" || current === "faqs") {
            aboutUsDropdown.classList.add('active');
        } else {
            aboutUsDropdown.classList.remove('active');
        }
    }

    window.onscroll = highlightCurrentNav;
    highlightCurrentNav(); // Highlight the correct nav link on page load
});