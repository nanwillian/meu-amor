// ======= EFEITOS INICIAIS =======
document.addEventListener('DOMContentLoaded', () => {
  
  const audio     = document.getElementById('bg-music');
  const playBtn   = document.getElementById('play-btn');
  const progressC = document.querySelector('.progress-container');
  const progress  = document.querySelector('.progress');
  const currentT  = document.querySelector('.time.current');
  const durationT = document.querySelector('.time.duration');

  // Tenta tocar imediatamente; se for bloqueado, tocará no primeiro clique
  audio.volume = 0.2;
  const playAudio = () => {
    audio.play().catch(() => {});
    playBtn.textContent = '⏸️';
  };
  playAudio();
  document.body.addEventListener('click', playAudio, { once: true });

  // Quando metadata carregar, ajusta duração
  audio.addEventListener('loadedmetadata', () => {
    durationT.textContent = formatTime(audio.duration);
  });

  // Toggle play/pause
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸️';
    } else {
      audio.pause();
      playBtn.textContent = '▶️';
    }
  });

  // Atualiza barra e tempo atual
  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.style.width = pct + '%';
    currentT.textContent = formatTime(audio.currentTime);
  });

  // Seek ao clicar na barra
  progressC.addEventListener('click', e => {
    const w = progressC.clientWidth;
    const x = e.offsetX;
    audio.currentTime = (x / w) * audio.duration;
  });

  // Função de formatação
  function formatTime(sec) {
    const m = Math.floor(sec / 60) || 0;
    const s = Math.floor(sec % 60) || 0;
    return `${m}:${s < 10 ? '0'+s : s}`;
  }
    initialBurst();
    updateTimer();
    setInterval(updateTimer, 1000);
    showPhoto(currentIndex);
    showPhoto2(currentIndex2);
});

// ======= TIMER =======
const startDate = new Date(2024, 9, 20, 22, 0, 0);

function updateTimer() {
    const now = new Date();
    let diffMs = now - startDate;
    if (diffMs < 0) {
        document.getElementById("timer").textContent = "Ainda não começou ❤️";
        return;
    }
    const oneSecond = 1000, oneMinute = 60 * oneSecond, oneHour = 60 * oneMinute,
          oneDay = 24 * oneHour, oneMonth = 30.44 * oneDay, oneYear = 365.25 * oneDay;
    const years = Math.floor(diffMs / oneYear); diffMs -= years * oneYear;
    const months = Math.floor(diffMs / oneMonth); diffMs -= months * oneMonth;
    const days = Math.floor(diffMs / oneDay); diffMs -= days * oneDay;
    const hours = Math.floor(diffMs / oneHour); diffMs -= hours * oneHour;
    const minutes = Math.floor(diffMs / oneMinute); diffMs -= minutes * oneMinute;
    const seconds = Math.floor(diffMs / oneSecond);
    const result = years >= 1
      ? `${years} ano${years > 1 ? 's' : ''}, ${months} mês${months !== 1 ? 'es' : ''}, ${days} dia${days !== 1 ? 's' : ''}, ${hours}h ${minutes}min ${seconds}s`
      : `${months} mês${months !== 1 ? 'es' : ''}, ${days} dia${days !== 1 ? 's' : ''}, ${hours}h ${minutes}min ${seconds}s`;
    document.getElementById("timer").textContent = result;
}

// ======= CORAÇÕES =======
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-50px';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    document.querySelector('.hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// ======= BALÕES =======
function createBalloon() {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left = (10 + Math.random() * 80) + 'vw';
    b.style.animationDuration = (5 + Math.random() * 5) + 's';
    document.querySelector('.balloons').appendChild(b);
    setTimeout(() => b.remove(), 10000);
}
for (let i = 0; i < 20; i++) setTimeout(createBalloon, i * 500);

// ======= CONFETES =======
function createConfetti(x, y) {
    const colors = ['#e74c3c','#f1c40f','#2ecc71','#3498db','#9b59b6'];
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random()*colors.length)];
        piece.style.left = x + (Math.random()*100 - 50) + 'px';
        piece.style.top = y + (Math.random()*100 - 50) + 'px';
        piece.style.animationDuration = (2 + Math.random()) + 's';
        document.querySelector('.confetti').appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}
document.body.addEventListener('click', e => createConfetti(e.clientX, e.clientY));

// ======= FOGOS DE ARTIFÍCIO =======
function createFireworksBurst() {
    const count = 20;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.4 + (window.innerHeight * 0.1);
    const colors = ['#fffa65','#ff3864','#32ff7e','#7efff5','#ff7eb9'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'firework-piece';
        const angle = Math.random() * 360 + 'deg';
        const dist = 80 + Math.random() * 80 + 'px';
        piece.style.setProperty('--angle', angle);
        piece.style.setProperty('--distance', dist);
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.background = colors[Math.floor(Math.random()*colors.length)];
        document.querySelector('.fireworks').appendChild(piece);
        setTimeout(() => piece.remove(), 1000);
    }
}
function initialBurst() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createConfetti(x, y);
        }, i * 100);
    }
    for (let i = 0; i < 15; i++) {
        setTimeout(createFireworksBurst, i * 700);
    }
}

// ======= GALERIA PRINCIPAL =======
const photos = [];
for (let i = 1; i <= 10; i++) photos.push(`julia/julia_ (${i}).jpeg`);
shuffle(photos);
let currentIndex = 0;
const galleryImg = document.getElementById('gallery-photo');
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}
function showPhoto(index) {
    galleryImg.style.opacity = 0;
    setTimeout(() => {
        galleryImg.src = photos[index];
        galleryImg.style.opacity = 1;
    }, 250);
}
function nextPhoto() { currentIndex = (currentIndex+1)%photos.length; showPhoto(currentIndex); }
function prevPhoto() { currentIndex = (currentIndex-1+photos.length)%photos.length; showPhoto(currentIndex); }
setInterval(nextPhoto, 5000);

// ======= SEGUNDA GALERIA =======
const photos2 = [];
for (let i = 1; i <= 10; i++) photos2.push(`casal/casal_ (${i}).jpeg`);
shuffle(photos2);
let currentIndex2 = 0;
const galleryImg2 = document.getElementById('gallery-photo-2');
function showPhoto2(index) {
    galleryImg2.style.opacity = 0;
    setTimeout(() => {
        galleryImg2.src = photos2[index];
        galleryImg2.style.opacity = 1;
    }, 250);
}
function nextPhoto2() { currentIndex2 = (currentIndex2+1)%photos2.length; showPhoto2(currentIndex2); }
function prevPhoto2() { currentIndex2 = (currentIndex2-1+photos2.length)%photos2.length; showPhoto2(currentIndex2); }

// ======= BOTÕES DE REVELAÇÃO =======
document.getElementById("reveal-btn").addEventListener("click", () => {
    document.getElementById("secret-section").style.display = "block";
    document.getElementById("reveal-btn").style.display = "none";
    document.getElementById("reveal-friends-btn").style.display = "inline-block";
});
document.getElementById("reveal-friends-btn").addEventListener("click", () => {
    document.getElementById("friends-slider").style.display = "block";
    updateFriendSlide(currentFriend);
});
  
  // ======= SLIDER DOS AMIGOS =======
  const friends = [
    {
      message: "PARABÉNS MEU AMOOOOR! Desejo tudo de melhor, que todos os seus sonhos se realizem! Sempre estarei aqui torcendo por vc! Te amo demais!  obrigado por tanto. ❤️",
      image: "amigos/felipe.jpeg",
      author: "Felipe"
    },
    {
      message: "Feliz aniversário maridaaaa!!! Obrigada por todos os nossos momentos, pelas risadas, pelos choros, pelas fofocas e por sempre estar presente (mesmo de longe) em todos os momentos da minha vida. Não consigo imaginar minha vida sem você! Eu te amo muito! 💕",
      image: "amigos/lais.jpeg",
      author: "Lais"
    },
    {
      message: "Feliz aniversário Juju, já fazem uns 15 anos que eu comemoro a sua vida e a cada ano que passa eu me sinto mais grata por ela. Obrigada por ser a minha melhor amiga e minha irmã, não existe Ana sem a Julinha. Que seus 21 anos sejam maravilhosos como você, te amo!",
      image: "amigos/ana.jpg",
      author: "Ana Tunussi"
    },
    {
      message: "Hoje é o dia da pessoa que ilumina a vida de todos com seu jeitinho único e coração enorme. Sou tão grata por ter você ao meu lado, nas risadas mais bobas e nos momentos mais difíceis, obrigada por tudo que você fez e faz por mim. Que seu novo ciclo venha cheio de amor, sonhos realizados e sorrisos sinceros. Você merece o mundo e eu sempre estarei aqui pra te apoiar! Te amo demais!",
      image: "amigos/julia.jpg",
      author: "Júlia"
    },
    {
      message: "PARABÉNS JULINHA!!!! Não sou bom com texto mas saiba que desejo o melhor de tudo possível pra você eternamente, te amo muito >:D",
      image: "amigos/Thomas.jpg",
      author: "Thomas"
    },
    {
      message: "Julinha, Juba, Maria Dieta... hoje é seu dia especial meu amor!! Sou tão grata por nossos destinos terem se cruzado, você não tem ideia do quão importante você é, do quão brilhante  e genial você é, você iluminou minha vida de maneira surpreendente, na sua dureza encontrei carinho e conforto no momento ideal e espero um dia retribuir isso! Espero que seu novo ciclo seja lindo, seja especial e que te proporcione os melhores momentos! Eu te amo jujuba",
      image: "amigos/anab.jpg",
      author: "Ana Brandão"
    },
    {
      message: "Feliz aniversário, Bê! Que Deus te abençoe, te proteja e te ilumine sempre. Oro todos os dias pela sua vida e sou muito grata por ela. Grata por poder contar com você sempre que preciso, e pela sua amizade. Saiba que pode contar comigo sempre, sempre mesmo! Estarei sempre aqui pra você. Eu te amo muito, Bê.",
      image: "amigos/milena.jpg",
      author: "Bê"
    },
    {
      message: "FELIZ VIDAAA!!!! Parabéns! Muitos anos de vida, que esse novo ciclo seja cheio de alegria, felicidade e realizações! Que nunca te falte motivos pra sorrir e que seu bom humor continue contagiando a todos que estão a sua volta",
      image: "amigos/felipeg.jpg",
      author: "Galego"
    },
  ];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(friends);
  
let currentFriend = 0;
const bg = document.getElementById('friend-bg');
const msg = document.getElementById('friend-message');
const authorElem = document.getElementById('friend-author');
function updateFriendSlide(index) {
    bg.style.backgroundImage = `url('${friends[index].image}')`;
    msg.textContent = friends[index].message;
    authorElem.textContent = friends[index].author;
}
function nextFriend() { currentFriend = (currentFriend+1)%friends.length; updateFriendSlide(currentFriend); }
function prevFriend() { currentFriend = (currentFriend-1+friends.length)%friends.length; updateFriendSlide(currentFriend); }

const galleryGrid = document.querySelector('.gallery-grid');
Array.from(galleryGrid.children).sort(() => Math.random()-0.5)
    .forEach(item => galleryGrid.appendChild(item));

function openFullscreen(img) {
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    lightbox.style.display = 'flex';
}

function closeFullscreen() {
    document.getElementById('lightbox').style.display = 'none';
}

// JS: adicionar a classe e trocar o conteúdo para ícone
document.addEventListener('DOMContentLoaded', () => {

  const letterBtn   = document.getElementById('letter-btn');
  const letterModal = document.getElementById('letter-modal');

  // exibe o botão aos 5s
  setTimeout(() => {
    letterBtn.style.display = 'block';
    letterBtn.classList.add('show');
  }, 6000);

  letterBtn.addEventListener('click', () => {
    // abre o modal
    letterModal.classList.remove('hidden');
    // transforma em botão pequeno no canto
    letterBtn.classList.add('letter-lateral');
    // troca o texto por um envelope
    letterBtn.innerHTML = '✉️';
  });

  letterModal.addEventListener('click', e => {
    if (e.target === letterModal) {
      letterModal.classList.add('hidden');
    }
  });
});
