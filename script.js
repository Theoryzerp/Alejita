let currentPage = 0;
const totalPages = 4;

// Fecha de inicio del amor
const loveStartDate = new Date('2025-12-18T00:00:00');

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  startIntroAnimation();
  
  // Precarga de la página
  document.body.classList.add('loaded');
});

// ==================== ANIMACIÓN DE INTRO ====================
function startIntroAnimation() {
  const seedContainer = document.getElementById('seedContainer');
  const treeContainer = document.getElementById('treeContainer');
  const loveMessage = document.getElementById('loveMessage');
  const sparkleParticles = document.getElementById('sparkleParticles');
  
  // Fase 1: Semilla cae (después de 500ms)
  setTimeout(() => {
    seedContainer.classList.add('falling');
  }, 500);
  
  // Fase 2: Semilla desaparece y árbol crece (después de 2.5s)
  setTimeout(() => {
    seedContainer.classList.add('planted');
    treeContainer.classList.add('growing');
    createSparkles(sparkleParticles);
  }, 2500);
  
  // Fase 3: Mensaje aparece (después de 5s)
  setTimeout(() => {
    loveMessage.classList.add('visible');
    startLoveCounter();
  }, 5000);
}

// ==================== CONTADOR DE AMOR ====================
function startLoveCounter() {
  function updateCounter() {
    const now = new Date();
    const diff = now - loveStartDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  updateCounter();
  setInterval(updateCounter, 1000);
}

// ==================== PARTÍCULAS DE BRILLO ====================
function createSparkles(container) {
  if (!container) return;
  
  const sparkles = ['✨', '⭐', '💫', '🌟'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = (30 + Math.random() * 40) + '%';
      sparkle.style.bottom = (20 + Math.random() * 30) + '%';
      sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
      
      container.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 2000);
    }, i * 100);
  }
}

// ==================== NAVEGACIÓN ====================
function nextPage() {
  if (currentPage < totalPages) {
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage++;
    document.getElementById(`page${currentPage}`).classList.add("active");
    window.scrollTo(0, 0);
  }
}

function prevPage() {
  if (currentPage > 0) {
    document.getElementById(`page${currentPage}`).classList.remove("active");
    currentPage--;
    document.getElementById(`page${currentPage}`).classList.add("active");
    window.scrollTo(0, 0);
  }
}

function goToPage(pageNum) {
  document.getElementById(`page${currentPage}`).classList.remove("active");
  currentPage = pageNum;
  document.getElementById(`page${currentPage}`).classList.add("active");
  window.scrollTo(0, 0);
}

// ==================== RESPUESTA SÍ ====================
function sayYes() {
  // Ocultar la caja de pregunta
  document.querySelector('.question-box').style.display = 'none';
  // Ocultar navegación
  document.getElementById('nav4').style.display = 'none';
  
  // Mostrar celebración
  const celebration = document.getElementById('celebration');
  celebration.classList.remove('hidden');
  
  // Lanzar confeti
  launchConfetti();
  
  // Reproducir sonido (opcional)
  playSound();
  
  // Inicializar canvas de firma
  initSignatureCanvas();
}

// ==================== BOTÓN "NO" QUE SE MUEVE ====================
let noButtonMoves = 0;
function moveButton() {
  const btn = document.getElementById('noBtn');
  const maxMoves = 5;
  
  if (noButtonMoves < maxMoves) {
    const container = document.querySelector('.answer-buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    // Calcular límites dentro del contenedor
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 20;
    
    // Generar posición aleatoria DENTRO del contenedor
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'absolute';
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.zIndex = '10';
    
    noButtonMoves++;
    
    // Cambiar texto del botón
    const texts = [
      "¿Segura? 🤔",
      "Piénsalo bien 💭",
      "¿En serio? 😢",
      "Dale otra oportunidad 💕",
      "¡Mejor di que sí! 💖"
    ];
    btn.textContent = texts[noButtonMoves - 1] || texts[texts.length - 1];
  } else {
    // Después de varios intentos, el botón desaparece
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
  }
}

// ==================== CONFETI ====================
function launchConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#9333ea', '#a855f7', '#c4b5fd', '#7c3aed', '#ddd6fe', '#e879f9', '#f0abfc'];
  const shapes = ['💜', '💕', '💖', '✨', '🎉', '💗', '💝', '🦋', '⭐'];
  
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
      confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
      
      container.appendChild(confetti);
      
      // Animación de caída
      const duration = Math.random() * 3 + 2;
      const rotation = Math.random() * 720 - 360;
      const xEnd = Math.random() * 200 - 100;
      
      confetti.animate([
        { 
          transform: 'translateY(0) translateX(0) rotate(0deg)',
          opacity: 1 
        },
        { 
          transform: `translateY(100vh) translateX(${xEnd}px) rotate(${rotation}deg)`,
          opacity: 0 
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      // Eliminar después de la animación
      setTimeout(() => confetti.remove(), duration * 1000);
    }, i * 50);
  }
  
  // Segunda oleada de confeti
  setTimeout(() => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.fontSize = (Math.random() * 15 + 8) + 'px';
        confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        
        container.appendChild(confetti);
        
        const duration = Math.random() * 4 + 3;
        confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: duration * 1000,
          easing: 'ease-out'
        });
        
        setTimeout(() => confetti.remove(), duration * 1000);
      }, i * 100);
    }
  }, 2000);
}

// ==================== SONIDO (OPCIONAL) ====================
function playSound() {
  // Crear un sonido de celebración simple usando Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }, index * 150);
    });
  } catch (e) {
    // Audio no soportado, continuar sin sonido
    console.log('Audio no disponible');
  }
}

// ==================== FIRMA DIGITAL ====================
let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initSignatureCanvas() {
  canvas = document.getElementById('signatureCanvas');
  if (!canvas) return;
  
  // Ajustar el tamaño del canvas según su contenedor
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  ctx = canvas.getContext('2d');
  
  // Configurar estilo del trazo
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Limpiar eventos anteriores para evitar duplicados
  canvas.removeEventListener('mousedown', startDrawing);
  canvas.removeEventListener('mousemove', draw);
  canvas.removeEventListener('mouseup', stopDrawing);
  canvas.removeEventListener('mouseout', stopDrawing);
  canvas.removeEventListener('touchstart', handleTouchStart);
  canvas.removeEventListener('touchmove', handleTouchMove);
  canvas.removeEventListener('touchend', stopDrawing);
  
  // Eventos del mouse
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  // Eventos táctiles
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
  canvas.addEventListener('touchend', stopDrawing);
}

function getCanvasCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}

function startDrawing(e) {
  isDrawing = true;
  const coords = getCanvasCoordinates(e);
  lastX = coords.x;
  lastY = coords.y;
  
  // Dibujar un punto inicial
  ctx.beginPath();
  ctx.arc(lastX, lastY, 1, 0, Math.PI * 2);
  ctx.fill();
}

function draw(e) {
  if (!isDrawing) return;
  
  const coords = getCanvasCoordinates(e);
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
  
  lastX = coords.x;
  lastY = coords.y;
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  isDrawing = true;
  lastX = (touch.clientX - rect.left) * scaleX;
  lastY = (touch.clientY - rect.top) * scaleY;
  
  // Dibujar punto inicial
  ctx.beginPath();
  ctx.arc(lastX, lastY, 1, 0, Math.PI * 2);
  ctx.fill();
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!isDrawing) return;
  
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  const x = (touch.clientX - rect.left) * scaleX;
  const y = (touch.clientY - rect.top) * scaleY;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  lastX = x;
  lastY = y;
}

function stopDrawing() {
  isDrawing = false;
}

function clearSignature() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// ==================== GUARDAR CERTIFICADO COMO PDF ====================
async function saveCertificate() {
  const certificate = document.querySelector('.certificate');
  
  if (!certificate) {
    alert('No se encontró el certificado');
    return;
  }
  
  // Mostrar mensaje de carga
  const saveBtn = document.querySelector('.save-btn');
  const originalText = saveBtn.textContent;
  saveBtn.textContent = '⏳ Generando PDF...';
  saveBtn.disabled = true;
  
  try {
    // Clonar el certificado para evitar modificar el original
    const clone = certificate.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '500px';
    clone.style.transform = 'none';
    clone.style.animation = 'none';
    
    // Remover animaciones del clon
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
      el.style.animation = 'none';
      el.style.transform = 'none';
    });
    
    // Copiar el contenido del canvas de firma al clon
    const originalCanvas = document.getElementById('signatureCanvas');
    const cloneCanvas = clone.querySelector('#signatureCanvas');
    if (originalCanvas && cloneCanvas && ctx) {
      const cloneCtx = cloneCanvas.getContext('2d');
      cloneCanvas.width = originalCanvas.width;
      cloneCanvas.height = originalCanvas.height;
      cloneCtx.drawImage(originalCanvas, 0, 0);
    }
    
    document.body.appendChild(clone);
    
    // Esperar un momento para que se renderice
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capturar el certificado clonado como imagen
    const capturedCanvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fffef9',
      logging: false,
      allowTaint: true,
      removeContainer: false
    });
    
    // Remover el clon
    document.body.removeChild(clone);
    
    // Crear PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Calcular dimensiones para centrar en el PDF
    const imgWidth = 170;
    const imgHeight = (capturedCanvas.height * imgWidth) / capturedCanvas.width;
    const x = (210 - imgWidth) / 2; // Centrar horizontalmente (A4 = 210mm)
    const y = 35; // Margen superior
    
    // Agregar fondo decorativo
    pdf.setFillColor(250, 245, 255);
    pdf.rect(0, 0, 210, 297, 'F');
    
    // Agregar título
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(147, 51, 234);
    pdf.text('Recuerdo de San Valentin 2026', 105, 20, { align: 'center' });
    
    // Agregar corazones decorativos como texto
    pdf.setFontSize(12);
    pdf.text('~ Con todo mi amor ~', 105, 28, { align: 'center' });
    
    // Agregar imagen del certificado
    const imgData = capturedCanvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    
    // Agregar pie de página
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Este documento tiene validez sentimental infinita', 105, 280, { align: 'center' });
    pdf.setTextColor(147, 51, 234);
    pdf.text('Antony & Alejandra', 105, 287, { align: 'center' });
    
    // Descargar PDF
    pdf.save('Acta-San-Valentin-2026.pdf');
    
    // Restaurar botón
    saveBtn.textContent = '✅ ¡Descargado!';
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }, 2000);
    
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('💔 Hubo un error al generar el PDF. Intenta tomar una captura de pantalla.');
    saveBtn.textContent = originalText;
    saveBtn.disabled = false;
  }
}

// ==================== CORAZONES FLOTANTES DE FONDO ====================
function createFloatingHearts() {
  const container = document.getElementById('bgHearts');
  if (!container) return;
  
  const hearts = ['💜', '💕', '💖', '💗', '💝', '🦋', '⭐', '✨'];
  
  setInterval(() => {
    if (document.hidden) return; // No crear si la página no es visible
    if (currentPage === 0) return; // No crear en la página de intro
    
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.fontSize = (Math.random() * 1 + 0.8) + 'em';
    
    container.appendChild(heart);
    
    // Eliminar después de la animación
    setTimeout(() => heart.remove(), 15000);
  }, 2000);
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  
  // Precarga de la página
  document.body.classList.add('loaded');
});

// ==================== EFECTOS ADICIONALES ====================

// Efecto de parallax suave en el scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hearts = document.querySelectorAll('.floating-heart');
  hearts.forEach(heart => {
    const speed = 0.5;
    heart.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Detectar cuando el usuario está inactivo para pausar animaciones
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  document.body.classList.remove('inactive');
  inactivityTimer = setTimeout(() => {
    document.body.classList.add('inactive');
  }, 60000); // 1 minuto
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);
resetInactivityTimer();
