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

  // Only intercept form submission when data-remote="true" is set
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      if(contactForm.dataset.remote === 'true'){
        e.preventDefault();
        var btn = contactForm.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        // Simple client-side POST to the form action URL
        var formData = new FormData(contactForm);
        fetch(contactForm.action, {
          method: contactForm.method || 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        }).then(function(response){
          if(response.ok){
            alert('Message sent — thank you!');
            contactForm.reset();
          } else {
            response.json().then(function(data){
              alert((data.error && data.error.length) ? data.error.join(', ') : 'There was a problem submitting the form.');
            }).catch(function(){
              alert('There was a problem submitting the form.');
            });
          }
        }).catch(function(){
          alert('Network error. Please try again later.');
        }).finally(function(){
          btn.textContent = 'Send Message';
        });
      } else {
        // allow normal form submit (for providers like Formspree via action="..." method="POST")
      }
    });
  }
});
