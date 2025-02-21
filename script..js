// Smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example of adding an alert on button click
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        alert('Button clicked!');
    });
});