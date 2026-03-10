/* ═══════════════════════════════════════════════════════
   POSSIBILITIES CO. — Chatbot FAQ Assistant
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatToggle || !chatWindow || !chatMessages) return;

    const faqs = [
        { q: '¿Qué es el coaching de fortalezas?', a: 'El coaching de fortalezas está basado en el modelo CliftonStrengths® de Gallup. Ayuda a identificar tus 34 talentos naturales y convertirlos en fortalezas para mejorar tu desempeño personal y profesional.' },
        { q: '¿Quién es Porfirio Gómez?', a: 'Porfirio Gómez Ojeda es Coach de Fortalezas Certificado por Gallup con más de 14 años de experiencia. Ha trabajado con más de 40 organizaciones en 9 países de América Latina, impactando a más de 3,000 líderes.' },
        { q: '¿Qué servicios ofrecen?', a: 'Ofrecemos tres servicios principales:\n\n• <strong>Coaching Individual:</strong> Sesiones personalizadas para descubrir tus fortalezas.\n• <strong>Coaching de Equipos:</strong> Team building y alineación de equipos.\n• <strong>Consultoría Organizacional:</strong> Transformación estratégica y cultura empresarial.' },
        { q: '¿Cómo puedo agendar?', a: 'Puedes agendar una <strong>videollamada gratuita de 15 minutos</strong> directamente en nuestro Calendly:<br><br><a href="https://calendly.com/porfirio-gomez/15min" target="_blank" style="color:var(--blue-700);font-weight:600;">📅 Agendar videollamada</a>' },
        { q: '¿Qué es la masterclass?', a: 'El programa <strong>"Possibilities for You"</strong> es una masterclass de 6 horas que incluye la prueba CliftonStrengths® de Gallup, sesión grupal intensiva y una sesión 1:1 personalizada con Porfirio.' },
        { q: '¿En qué países trabajan?', a: 'Hemos trabajado en más de <strong>9 países de América Latina</strong>, incluyendo México, Colombia, Guatemala, Honduras, Costa Rica, Panamá, entre otros. También ofrecemos sesiones virtuales internacionales.' },
    ];

    let isOpen = false;

    function addMessage(content, type = 'bot') {
        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        msg.innerHTML = content;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';
        faqs.forEach((faq, idx) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = faq.q;
            btn.addEventListener('click', () => {
                optionsDiv.remove();
                addMessage(faq.q, 'user');
                setTimeout(() => {
                    addMessage(faq.a);
                    setTimeout(addOptions, 500);
                }, 400);
            });
            optionsDiv.appendChild(btn);
        });
        chatMessages.appendChild(optionsDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function initChat() {
        chatMessages.innerHTML = '';
        addMessage('¡Hola! 👋 Soy el asistente de <strong>Possibilities Co.</strong> ¿En qué puedo ayudarte?');
        setTimeout(addOptions, 500);
    }

    chatToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatToggle.classList.toggle('active', isOpen);
        chatWindow.classList.toggle('active', isOpen);
        if (isOpen && chatMessages.children.length === 0) {
            initChat();
        }
    });
});
