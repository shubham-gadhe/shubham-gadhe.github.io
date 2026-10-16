/* ==================== Mobile Navigation Menu ==================== */

const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    // Toggle the menu when the icon is clicked
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close the menu after a link is tapped
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

/* ==================== Contact Form Submission ==================== */

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyls9Z7JXBZcMSONq5m4PV_cyFWdfyPPODw9wYSVn0vIp5EAphNi1SXlP8uO1biRjBr/exec';

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // no-cors: the response can't be read, so only network errors are caught
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(data)
            });

            alert('Thanks! Your message has been sent.');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            alert('Sorry, something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });
}