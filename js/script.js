// Mobile nav toggle and simple form handling
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      menu.classList.toggle('show');
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Simple form feedback (no backend) for contact form
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      setTimeout(function(){
        btn.textContent = 'Send Message';
        alert('This site is currently configured as a static site. To receive messages, configure a form provider (Netlify, Formspree) or add a server endpoint.');
        contactForm.reset();
      },900);
    });
  }
});
