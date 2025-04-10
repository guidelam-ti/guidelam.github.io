// script.js - version mise à jour
document.addEventListener('DOMContentLoaded', function() {
  /* Gestion du chatbot "Rose" */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot');
  const chatbotClose = document.getElementById('chatbot-close');
  const sendBtn = document.getElementById('sendBtn');
  const userInput = document.getElementById('userInput');
  const chatbotMessages = document.getElementById('chatbot-messages');

  // Bascule d'affichage du chatbot
  chatbotToggle.addEventListener('click', function() {
    chatbot.classList.toggle('active');
    // Afficher un message de bienvenue automatique si c'est la première ouverture
    if(chatbot.classList.contains('active') && chatbotMessages.children.length === 0) {
      setTimeout(() => {
        appendMessage('bot', "Bonjour ! Je suis Rose, votre assistante virtuelle. Comment puis-je vous aider aujourd'hui ?");
      }, 500);
    }
  });

  

  chatbotClose.addEventListener('click', function() {
    chatbot.classList.remove('active');
  });

  // Envoyer le message en cliquant sur le bouton ou avec la touche "Enter"
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === '') return;

    // Afficher le message utilisateur dans la fenêtre de chat
    appendMessage('user', messageText);
    userInput.value = '';

    // Simulation de "en train d'écrire"
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot', 'typing');
    typingIndicator.innerHTML = '<p><i class="bi bi-three-dots"></i></p>';
    chatbotMessages.appendChild(typingIndicator);
    
    // Auto-scroll vers le dernier message
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Simulation de la réponse de Rose après un court délai
    setTimeout(function() {
      // Supprimer l'indicateur de frappe
      chatbotMessages.removeChild(typingIndicator);
      
      const botResponse = generateBotResponse(messageText);
      appendMessage('bot', botResponse);
      
      // Auto-scroll vers le dernier message
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1200);
  }

  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    const p = document.createElement('p');
    p.textContent = message;
    messageElement.appendChild(p);
    chatbotMessages.appendChild(messageElement);
  }

  function generateBotResponse(userMessage) {
    // Réponses plus détaillées basées sur des mots-clés
    userMessage = userMessage.toLowerCase();
    
    if (userMessage.includes('bonjour') || userMessage.includes('salut') || userMessage.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? Je peux vous renseigner sur nos services informatiques, notre équipe ou vous aider à prendre contact avec nous.";
    } 
    else if (userMessage.includes('services') || userMessage.includes('offre') || userMessage.includes('prestation')) {
      return "Guidelam propose plusieurs services informatiques : développement web et mobile, sécurité informatique, solutions cloud, maintenance et support technique. Quel service vous intéresse particulièrement ?";
    } 
    else if (userMessage.includes('prix') || userMessage.includes('tarif') || userMessage.includes('coût')) {
      return "Nos tarifs varient selon vos besoins spécifiques. Pour obtenir un devis personnalisé, vous pouvez remplir notre formulaire de contact ou nous appeler directement au +1 514 686 8345.";
    }
    else if (userMessage.includes('contact') || userMessage.includes('joindre') || userMessage.includes('appeler')) {
      return "Vous pouvez nous contacter par téléphone au +1 514 686 8345, par email à Guidelam1@GMAIL.com, ou en remplissant le formulaire de contact sur cette page.";
    }
    else if (userMessage.includes('équipe') || userMessage.includes('expert') || userMessage.includes('consultant')) {
      return "Notre équipe est composée d'experts en informatique avec plus de 10 ans d'expérience dans différents domaines : développement, sécurité, infrastructure cloud et support technique.";
    }
    else if (userMessage.includes('merci')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider !";
    }
    else if (userMessage.includes('adresse') || userMessage.includes('bureau') || userMessage.includes('locaux')) {
      return "Nos bureaux sont situés au 1400 LAVALLEE J4J 4C2. Vous pouvez nous rendre visite du lundi au vendredi, de 9h à 17h.";
    }
    else {
      return "Merci pour votre message. Pourriez-vous préciser votre demande afin que je puisse mieux vous aider ? Vous pouvez me demander des informations sur nos services, notre équipe ou nos coordonnées.";
    }
  }

  /* Validation du formulaire de contact avec Bootstrap */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // Simuler l'envoi du formulaire
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi en cours...';
        
        setTimeout(() => {
          // Création d'une alerte de succès
          const alertEl = document.createElement('div');
          alertEl.className = 'alert alert-success mt-3';
          alertEl.role = 'alert';
          alertEl.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Votre message a été envoyé avec succès. Nous vous contacterons très bientôt !';
          
          // Insérer l'alerte avant le formulaire
          contactForm.parentNode.insertBefore(alertEl, contactForm);
          
          // Réinitialiser le formulaire et le bouton
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          // Faire disparaître l'alerte après 5 secondes
          setTimeout(() => {
            alertEl.classList.add('fade');
            setTimeout(() => alertEl.remove(), 500);
          }, 5000);
        }, 1500);
      }
      
      contactForm.classList.add('was-validated');
    });
  }

  /* Animation au défilement pour tous les éléments avec la classe 'animate-on-scroll' */
  const animatedElements = document.querySelectorAll('.card, .animation-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  /* Animation pour le texte de mission */
  const missionText = document.getElementById('mission-highlight');
  if (missionText) {
    const missionPhrases = [
      "Transformer vos idées en solutions digitales.",
      "Vous accompagner dans votre réussite numérique.",
      "Créer des solutions technologiques innovantes."
    ];
    let currentIndex = 0;

    function changeMissionText() {
      missionText.style.opacity = 0;
      setTimeout(() => {
        missionText.textContent = missionPhrases[currentIndex];
        missionText.style.opacity = 1;
        currentIndex = (currentIndex + 1) % missionPhrases.length;
      }, 500); // Durée de la transition
    }
  
    setInterval(changeMissionText, 3000); // Change le texte toutes les 3 secondes
  }
});
