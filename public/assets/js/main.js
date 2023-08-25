/**
* Template Name: Arsha
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    if (window.innerWidth <= 767) {
    const toggleBacktotop = () => {
      if (window.scrollY > 1200 ) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  }

  const suscribiteButton = select('#suscribiteButton');

  if (suscribiteButton) {
    const originalButtonText = suscribiteButton.textContent;

    on('click', '#suscribiteButton', function(e) {
      e.preventDefault();
      suscribiteButton.textContent = "Enviando...";
    const email = select('#email-suscribite').value;
    console.log(email)
    fetch('https://script.google.com/macros/s/AKfycbzGGxx8ScHPPrZ5oSRS5lTJ8OS9nIMTZc_iC8vC05ivslZY9dqion2yipNBQFp7pRtkPw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=suscribite&email=${encodeURIComponent(email)}&contactPreference=email`
      })
        .then(response => {
        suscribiteButton.textContent = originalButtonText;
        
        if (response.ok) {
          alert("Te contactaremos pronto.");
        } else {
          alert("Error al enviar el formulario");
        }
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
        // Restaurar el texto original del botón en caso de error
        errorMessage.textContent = "Error al enviar el formulario";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
        contactButton.textContent = originalButtonText;
        successMessage.display = "none";
        
        // Mostrar un mensaje de error en un alert o notificación
      });
  });

}

  const contactButton = select('#contactButton');
  if (contactButton) {
    const originalButtonText = contactButton.textContent;
    on('click', '#contactButton', function(e) {
      e.preventDefault();

      // Cambiar el texto del botón a "Enviando..."
      contactButton.textContent = 'Enviando...';

      // Obtener los datos del formulario
      const name = select('#name').value;
      const phone = select('#numero').value;
      const email = select('#email').value;
      const contactPreference = select('#contactPreference').value;
      const errorMessage = document.getElementById("error-message");
      const successMessage = document.getElementById("success-message");

      if (contactPreference === "email" && email.trim() === "") {
        errorMessage.textContent = "Por favor, ingrese su dirección de correo electrónico.";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
        contactButton.textContent = originalButtonText;
        successMessage.style.display = "none";
        return; // Detener el envío del formulario
      }

      if (contactPreference === "phone" && phone.trim() === "") {
        errorMessage.textContent = "Por favor, ingrese su número de contacto.";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
        contactButton.textContent = originalButtonText;
        successMessage.style.display = "none";
        return; // Detener el envío del formulario
      }

      if (contactPreference === "indistinto" && phone.trim() === "" && email.trim() === "" ) {
        errorMessage.textContent = "Por favor, ingrese su dirección de correo electrónico o número de contacto";
        errorMessage.style.display = "block"; // Mostrar el mensaje de error
        contactButton.textContent = originalButtonText;
        successMessage.style.display = "none";
        return; // Detener el envío del formulario
      }

      // Realizar la solicitud al servidor
      fetch('https://script.google.com/macros/s/AKfycbzGGxx8ScHPPrZ5oSRS5lTJ8OS9nIMTZc_iC8vC05ivslZY9dqion2yipNBQFp7pRtkPw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&contactPreference=${encodeURIComponent(contactPreference)}`
      })
        .then(response => {
          // Restaurar el texto original del botón
          contactButton.textContent = originalButtonText;
          // Mostrar el mensaje de éxito o error en un alert o notificación
          
          if (response.ok) {
            successMessage.textContent = "Su pedido fue envíado, lo contactaremos pronto.";
            successMessage.style.display = "block"; // Mostrar el mensaje de error
            errorMessage.style.display = "none";
          } else {
            errorMessage.textContent = "Error al enviar el formulario";
            errorMessage.style.display = "block"; // Mostrar el mensaje de error
            successMessage.display = "none";
          }
        })
        .catch(error => {
          console.error('Error al enviar el formulario:', error);
          // Restaurar el texto original del botón en caso de error
          errorMessage.textContent = "Error al enviar el formulario";
          errorMessage.style.display = "block"; // Mostrar el mensaje de error
          contactButton.textContent = originalButtonText;
          successMessage.display = "none";
          
          // Mostrar un mensaje de error en un alert o notificación
        });
    });
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()