// ======= EFEITOS INICIAIS =======
document.addEventListener('DOMContentLoaded', () => {
    initialBurst();
    updateTimer();
    setInterval(updateTimer, 1000);
    showPhoto(currentIndex);
    showPhoto2(currentIndex2);
  });
  
  // ======= TIMER =======
  const startDate = new Date(2024, 9, 20, 22, 0, 0); // 20 de outubro às 22h
  
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
    const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6'];
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = x + (Math.random() * 100 - 50) + 'px';
      piece.style.top = y + (Math.random() * 100 - 50) + 'px';
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
    const colors = ['#fffa65', '#ff3864', '#32ff7e', '#7efff5', '#ff7eb9'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'firework-piece';
      const angle = Math.random() * 360 + 'deg';
      const dist = 80 + Math.random() * 80 + 'px';
      piece.style.setProperty('--angle', angle);
      piece.style.setProperty('--distance', dist);
      piece.style.left = x + 'px';
      piece.style.top = y + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
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
  for (let i = 1; i <= 10; i++) {
    photos.push(`julia/julia_ (${i}).jpeg`);
  }
  shuffle(photos);
  
  let currentIndex = 0;
  const galleryImg = document.getElementById('gallery-photo');
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
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
  
  function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
  }
  
  function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto(currentIndex);
  }
  
  setInterval(nextPhoto, 5000);
  
  // ======= SEGUNDA GALERIA =======
  const photos2 = [];
  for (let i = 1; i <= 10; i++) {
    photos2.push(`casal/casal_ (${i}).jpeg`);
  }
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
  
  function nextPhoto2() {
    currentIndex2 = (currentIndex2 + 1) % photos2.length;
    showPhoto2(currentIndex2);
  }
  
  function prevPhoto2() {
    currentIndex2 = (currentIndex2 - 1 + photos2.length) % photos2.length;
    showPhoto2(currentIndex2);
  }
  
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
      image: "amigos/felipe.jpeg"
    },
    {
      message: "Feliz aniversário maridaaaa!!! Obrigada por todos os nossos momentos, pelas risadas, pelos choros, pelas fofocas e por sempre estar presente (mesmo de longe) em todos os momentos da minha vida. Não consigo imaginar minha vida sem você! Eu te amo muito! 💕",
      image: "amigos/lais.jpeg"
    }
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
  
  function updateFriendSlide(index) {
    bg.style.backgroundImage = `url('${friends[index].image}')`;
    msg.textContent = friends[index].message;
  }
  
  function nextFriend() {
    currentFriend = (currentFriend + 1) % friends.length;
    updateFriendSlide(currentFriend);
  }
  
  function prevFriend() {
    currentFriend = (currentFriend - 1 + friends.length) % friends.length;
    updateFriendSlide(currentFriend);
  }
  