/* ═══════════════════════════════════════════════════════
   POSSIBILITIES CO. — Conversational Chatbot Assistant
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    if (!chatToggle || !chatWindow || !chatMessages) return;

    let isOpen = false;
    let conversationStarted = false;

    // ── Knowledge Base ──
    const knowledge = [
        {
            keywords: ['coaching', 'fortalezas', 'clifton', 'strengths', 'gallup', 'talento'],
            answer: 'El coaching de fortalezas está basado en el modelo <strong>CliftonStrengths® de Gallup</strong>. Ayuda a identificar tus 34 talentos naturales y convertirlos en fortalezas para mejorar tu desempeño personal y profesional. 💪\n\n¿Te gustaría saber más sobre nuestros programas?'
        },
        {
            keywords: ['porfirio', 'gómez', 'gomez', 'fundador', 'coach', 'quién es', 'quien es'],
            answer: '<strong>Porfirio Gómez Ojeda</strong> es Coach de Fortalezas Certificado por Gallup con más de 14 años de experiencia. Ha trabajado con más de 40 organizaciones en 9 países de América Latina, impactando a más de 3,000 líderes. 🌎'
        },
        {
            keywords: ['servicio', 'ofrecen', 'hacen', 'programas', 'qué hacen'],
            answer: 'Ofrecemos tres servicios principales:\n\n• <strong>Coaching Individual</strong> — Sesiones personalizadas para descubrir y potenciar tus fortalezas.\n• <strong>Coaching de Equipos</strong> — Team building y alineación de equipos de alto rendimiento.\n• <strong>Consultoría Organizacional</strong> — Transformación estratégica y cultura empresarial.\n\n¿Sobre cuál te gustaría saber más?'
        },
        {
            keywords: ['agendar', 'cita', 'reunión', 'reunion', 'llamada', 'contactar', 'contacto', 'calendly', 'videollamada'],
            answer: '¡Claro! Puedes agendar una <strong>videollamada gratuita de 15 minutos</strong> directamente aquí:\n\n<a href="https://calendly.com/porfirio-gomez/15min" target="_blank" style="display:inline-block;padding:8px 16px;background:var(--blue-700);color:white;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px;">📅 Agendar ahora</a>\n\nSin compromiso, es solo para conocer tus necesidades. 😊'
        },
        {
            keywords: ['masterclass', 'possibilities for you', 'curso', 'taller', 'programa'],
            answer: 'El programa <strong>"Possibilities for You"</strong> es una masterclass de 6 horas que incluye:\n\n✅ Prueba CliftonStrengths® de Gallup\n✅ Sesión grupal intensiva\n✅ Sesión 1:1 personalizada con Porfirio\n\nEs ideal para quienes quieren un primer acercamiento profundo al coaching de fortalezas.'
        },
        {
            keywords: ['país', 'pais', 'países', 'paises', 'latinoamérica', 'latinoamerica', 'dónde', 'donde', 'ubicación', 'ubicacion', 'internacional'],
            answer: 'Hemos trabajado en más de <strong>9 países de América Latina</strong>: México, Colombia, Guatemala, Honduras, Costa Rica, Panamá, entre otros.\n\nTambién ofrecemos sesiones virtuales para cualquier parte del mundo. 🌐'
        },
        {
            keywords: ['precio', 'costo', 'cuánto', 'cuanto', 'tarifa', 'inversión', 'inversion', 'pagar'],
            answer: 'Los precios varían según el programa y las necesidades de cada cliente. Te invito a agendar una <strong>llamada gratuita</strong> para darte una cotización personalizada.\n\n<a href="https://calendly.com/porfirio-gomez/15min" target="_blank" style="color:var(--blue-700);font-weight:600;">📅 Agendar llamada gratuita</a>'
        },
        {
            keywords: ['equipo', 'equipos', 'team', 'grupo', 'empresa', 'organización', 'organizacion'],
            answer: 'Nuestro <strong>coaching de equipos</strong> ayuda a:\n\n• Mejorar la comunicación y colaboración\n• Alinear fortalezas complementarias\n• Crear equipos de alto rendimiento\n\nHemos trabajado con equipos desde 5 hasta 200+ personas. ¿Quieres saber más?'
        },
        {
            keywords: ['individual', 'personal', 'uno a uno', '1:1', 'sesión personal', 'mi caso'],
            answer: 'El <strong>coaching individual</strong> es un proceso personalizado donde:\n\n1️⃣ Descubrimos tus talentos dominantes con CliftonStrengths®\n2️⃣ Diseñamos un plan de desarrollo\n3️⃣ Te acompañamos en la aplicación práctica\n\nCada persona es única — por eso el coaching se adapta a ti.'
        },
        {
            keywords: ['hola', 'buenos días', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'hi', 'hello', 'qué tal', 'que tal'],
            answer: '¡Hola! 😊 Me da gusto saludarte. Soy el asistente de <strong>Possibilities Co.</strong>\n\nPuedo ayudarte con información sobre nuestros servicios de coaching, programas, o ayudarte a agendar una llamada con Porfirio. ¿Qué necesitas?'
        },
        {
            keywords: ['gracias', 'thank', 'genial', 'perfecto', 'excelente', 'ok', 'vale'],
            answer: '¡Con mucho gusto! 😊 Si tienes alguna otra pregunta, aquí estoy para ayudarte.\n\nTambién puedes <a href="https://calendly.com/porfirio-gomez/15min" target="_blank" style="color:var(--blue-700);font-weight:600;">agendar una llamada</a> cuando quieras.'
        },
        {
            keywords: ['blog', 'artículo', 'articulo', 'artículos', 'articulos', 'leer'],
            answer: 'Tenemos un blog con contenido sobre coaching, liderazgo y desarrollo personal. 📝\n\n<a href="./blog/" style="color:var(--blue-700);font-weight:600;">📖 Ver artículos del blog</a>'
        }
    ];

    // ── Core Functions ──
    function addMessage(content, type = 'bot') {
        // Remove any existing suggestions
        const existingSuggestions = chatMessages.querySelector('.chat-suggestions');
        if (existingSuggestions) existingSuggestions.remove();

        const msg = document.createElement('div');
        msg.className = `chat-message ${type}`;
        msg.innerHTML = content.replace(/\n/g, '<br>');
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chat-message bot typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    function addSuggestions(suggestions) {
        const div = document.createElement('div');
        div.className = 'chat-suggestions';
        suggestions.forEach(text => {
            const chip = document.createElement('button');
            chip.className = 'chat-suggestion-chip';
            chip.textContent = text;
            chip.addEventListener('click', () => {
                div.remove();
                handleUserMessage(text);
            });
            div.appendChild(chip);
        });
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function findAnswer(input) {
        const normalized = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let bestMatch = null;
        let bestScore = 0;

        for (const entry of knowledge) {
            let score = 0;
            for (const kw of entry.keywords) {
                const kwNorm = kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                if (normalized.includes(kwNorm)) score++;
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        if (bestScore > 0) return bestMatch.answer;

        return 'No estoy seguro de entender tu pregunta, pero puedo ayudarte con:\n\n• Información sobre <strong>coaching de fortalezas</strong>\n• Nuestros <strong>servicios</strong> y programas\n• Cómo <strong>agendar</strong> una llamada\n• Conocer a <strong>Porfirio Gómez</strong>\n\n¿Podrías reformular tu pregunta? 🤔';
    }

    function handleUserMessage(text) {
        if (!text.trim()) return;

        addMessage(text, 'user');
        if (chatInput) chatInput.value = '';

        showTyping();
        const delay = 600 + Math.random() * 800;
        setTimeout(() => {
            hideTyping();
            const answer = findAnswer(text);
            addMessage(answer);

            // Show contextual suggestions
            setTimeout(() => {
                addSuggestions(getContextualSuggestions(text));
            }, 400);
        }, delay);
    }

    function getContextualSuggestions(lastInput) {
        const normalized = lastInput.toLowerCase();
        if (normalized.includes('servicio') || normalized.includes('hacen'))
            return ['Coaching individual', 'Coaching de equipos', 'Agendar llamada'];
        if (normalized.includes('equipo'))
            return ['¿Cuánto cuesta?', 'Agendar llamada'];
        if (normalized.includes('precio') || normalized.includes('costo'))
            return ['Agendar llamada gratuita', 'Ver servicios'];
        return ['¿Qué servicios ofrecen?', 'Agendar llamada', 'Sobre Porfirio Gómez'];
    }

    // ── Init ──
    function initChat() {
        chatMessages.innerHTML = '';
        addMessage('¡Hola! 👋 Soy el asistente de <strong>Possibilities Co.</strong>\n\n¿En qué puedo ayudarte hoy?');
        setTimeout(() => {
            addSuggestions(['¿Qué es el coaching de fortalezas?', '¿Qué servicios ofrecen?', 'Quiero agendar una llamada']);
        }, 600);
        conversationStarted = true;
    }

    // ── Events ──
    chatToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatToggle.classList.toggle('active', isOpen);
        chatWindow.classList.toggle('active', isOpen);
        if (isOpen && !conversationStarted) {
            initChat();
            if (chatInput) chatInput.focus();
        } else if (isOpen && chatInput) {
            chatInput.focus();
        }
    });

    if (chatSend) {
        chatSend.addEventListener('click', () => {
            handleUserMessage(chatInput.value);
        });
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleUserMessage(chatInput.value);
            }
        });
    }
});
