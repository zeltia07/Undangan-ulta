// Nama tamu dari landing page
const landing = document.getElementById('landing');
const invitation = document.getElementById('invitation');
const openBtn = document.getElementById('openInvitation');
const guestNameInput = document.getElementById('guestName');
const forGuest = document.getElementById('forGuest');
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicPlayerBtn');
const musicReadyIndicator = document.getElementById('musicReadyIndicator');

// RSVP
const form = document.getElementById('rsvpForm');
const namaInput = document.getElementById('nama');
const ucapanInput = document.getElementById('ucapan');
const rsvpList = document.getElementById('rsvpList');
let daftarHadir = [];

// API Base URL
const API_BASE = 'http://localhost:3001/api';

// YouTube Player
let youtubePlayer = null;

// Initialize YouTube Player
function onYouTubeIframeAPIReady() {
    if (MUSIC_CONFIG.source === 'youtube') {
        youtubePlayer = new YT.Player('youtubePlayer', {
            height: '0',
            width: '0',
            videoId: MUSIC_CONFIG.youtubeId,
            playerVars: {
                'autoplay': 1, // Autoplay YouTube
                'controls': 0,
                'disablekb': 1,
                'enablejsapi': 1,
                'fs': 0,
                'iv_load_policy': 3,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    console.log('YouTube player ready');
    // Autoplay YouTube music
    if (MUSIC_CONFIG.source === 'youtube') {
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    // Update UI berdasarkan status YouTube player
    if (event.data === YT.PlayerState.PLAYING) {
        musicToggle.classList.add('playing');
        musicToggle.classList.remove('paused');
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        musicToggle.classList.add('paused');
        musicToggle.classList.remove('playing');
    }
}

// Show music ready indicator
function showMusicReadyIndicator() {
    if (musicReadyIndicator) {
        musicReadyIndicator.style.display = 'flex';
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideMusicReadyIndicator();
        }, 5000);
    }
}

// Hide music ready indicator
function hideMusicReadyIndicator() {
    if (musicReadyIndicator) {
        musicReadyIndicator.style.display = 'none';
    }
}

// Autoplay music function
function autoplayMusic() {
    if (MUSIC_CONFIG.source === 'youtube' && youtubePlayer) {
        // YouTube autoplay sudah dihandle di onPlayerReady
        return;
    } else {
        // Autoplay local/fallback audio
        audio.muted = false; // Unmute audio
        audio.play().catch(error => {
            console.log('Autoplay blocked by browser:', error);
            // Browser mungkin memblokir autoplay, user harus interaksi dulu
            console.log('User needs to interact first to play music');
            // Set flag untuk menandakan musik siap dimulai
            window.musicReadyToPlay = true;
            // Tampilkan indicator
            showMusicReadyIndicator();
        });
    }
}

// Unmute audio when user interacts
function unmuteAudio() {
    if (audio.muted) {
        audio.muted = false;
        console.log('Audio unmuted');
    }
}

// Start music when user interacts
function startMusicOnInteraction() {
    if (window.musicReadyToPlay && audio.paused) {
        audio.play().then(() => {
            console.log('Music started after user interaction');
            window.musicReadyToPlay = false;
            // Sembunyikan indicator
            hideMusicReadyIndicator();
        }).catch(error => {
            console.error('Failed to start music:', error);
        });
    }
}

// Nama tamu otomatis ke undangan dan form
function setGuestName(name) {
    document.getElementById('invitationName').textContent = name;
    document.getElementById('wishName').value = name;
}

// Countdown Timer ke 5 Juli 2025 19:00 WIB
function startCountdown() {
    const eventDate = new Date('2025-07-05T19:00:00+07:00');
    function updateCountdown() {
        const now = new Date();
        let diff = eventDate - now;
        if (diff < 0) diff = 0;
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Music Control Functions
function toggleMusic() {
    if (MUSIC_CONFIG.source === 'youtube' && youtubePlayer) {
        // Gunakan YouTube player
        const state = youtubePlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            youtubePlayer.pauseVideo();
        } else {
            youtubePlayer.playVideo();
        }
    } else {
        // Gunakan audio element (local atau fallback)
        if (audio.paused) {
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                // Jika gagal, coba fallback
                if (MUSIC_CONFIG.source === 'local') {
                    console.log('Trying fallback audio...');
                    MUSIC_CONFIG.source = 'fallback';
                    audio.src = MUSIC_CONFIG.fallbackUrl;
                    audio.play();
                }
            });
            musicToggle.classList.add('playing');
            musicToggle.classList.remove('paused');
        } else {
            audio.pause();
            musicToggle.classList.add('paused');
            musicToggle.classList.remove('playing');
        }
    }
}

// Music event listeners
musicToggle.addEventListener('click', toggleMusic);

// Fallback audio event listeners
audio.addEventListener('play', function() {
    musicToggle.classList.add('playing');
    musicToggle.classList.remove('paused');
});

audio.addEventListener('pause', function() {
    musicToggle.classList.add('paused');
    musicToggle.classList.remove('playing');
});

// Autoplay music when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Delay sedikit untuk memastikan semua element sudah load
    setTimeout(() => {
        autoplayMusic();
    }, 1000);
});

// Handle user interaction for music
document.addEventListener('click', function() {
    // Unmute audio saat user berinteraksi
    unmuteAudio();
    
    // Coba mulai musik jika belum dimulai
    startMusicOnInteraction();
    
    // Jika musik belum dimulai sama sekali, coba mulai
    if (MUSIC_CONFIG.source !== 'youtube' && audio.paused && !window.musicReadyToPlay) {
        autoplayMusic();
    }
}, { once: true }); // Hanya sekali untuk interaksi pertama

// Unmute audio when user interacts with any element
document.addEventListener('click', unmuteAudio);
document.addEventListener('touchstart', unmuteAudio);
document.addEventListener('keydown', unmuteAudio);

// Start music on any user interaction
document.addEventListener('click', startMusicOnInteraction);
document.addEventListener('touchstart', startMusicOnInteraction);
document.addEventListener('keydown', startMusicOnInteraction);

// Ucapan & Doa - Menggunakan API
async function getWishes() {
    try {
        const response = await fetch(`${API_BASE}/guests`);
        const guests = await response.json();
        const allWishes = [];
        guests.forEach(guest => {
            guest.wishes.forEach(wish => {
                allWishes.push({
                    name: guest.name,
                    text: wish.text,
                    status: wish.status,
                    time: new Date(wish.createdAt).toLocaleString('id-ID', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })
                });
            });
        });
        return allWishes;
    } catch (error) {
        console.error('Error fetching wishes:', error);
        return [];
    }
}

async function saveWish(name, text, status) {
    try {
        const response = await fetch(`${API_BASE}/guest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, wish: text, status })
        });
        
        if (response.ok) {
            console.log('Wish saved successfully');
            return true;
        } else {
            console.error('Failed to save wish');
            return false;
        }
    } catch (error) {
        console.error('Error saving wish:', error);
        return false;
    }
}

async function renderWishes() {
    const wishList = document.getElementById('wishList');
    const wishes = await getWishes();
    wishList.innerHTML = wishes.map(w => `
        <div class="wish-item">
            <div class="wish-text">${w.text}</div>
            <div class="wish-meta"><span class="wish-name">${w.name}</span> &middot; <span class="wish-status-${w.status === 'Hadir' ? 'hadir' : 'tidak'}">${w.status}</span></div>
            <div class="wish-date">${w.time}</div>
        </div>
    `).join('');
}

openBtn.addEventListener('click', function() {
    const guestName = guestNameInput.value.trim();
    if (!guestName) {
        guestNameInput.focus();
        guestNameInput.style.border = '2px solid #ff1493';
        return;
    }
    landing.style.display = 'none';
    invitation.style.display = 'flex';
    // Efek confetti meriah
    if (window.confetti) {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });
    }
    // Nama tamu otomatis
    setGuestName(guestName);
    // Countdown
    startCountdown();
    // Render wishes
    renderWishes();
    // Form ucapan
    const wishForm = document.getElementById('wishForm');
    wishForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('wishName').value.trim();
        const text = document.getElementById('wishText').value.trim();
        const status = wishForm.status.value;
        if (!name || !text || !status) return;
        
        // Simpan ke database
        const success = await saveWish(name, text, status);
        if (success) {
            // Render ulang wishes
            await renderWishes();
            document.getElementById('wishText').value = '';
            wishForm.status.value = '';
        }
    });
    // Simpan nama tamu ke localStorage
    localStorage.setItem('guestName', guestName);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = namaInput.value.trim();
    const ucapan = ucapanInput.value.trim();
    if (nama && ucapan) {
        daftarHadir.unshift({ nama, ucapan });
        tampilkanDaftar();
        namaInput.value = '';
        ucapanInput.value = '';
    }
});

function tampilkanDaftar() {
    if (daftarHadir.length === 0) {
        rsvpList.innerHTML = '';
        return;
    }
    rsvpList.innerHTML = '<h5>Ucapan & Kehadiran:</h5>' +
        '<ul>' +
        daftarHadir.map(item => `<li><b>${item.nama}:</b> <span>${item.ucapan}</span></li>`).join('') +
        '</ul>';
}

// Fungsi untuk setup gallery images
function setupGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
    });
}

// Tambahkan event listener untuk gambar galeri saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    setupGalleryImages();
});

// Fungsi untuk menampilkan modal gambar
function showImageModal(src, alt) {
    // Hapus modal yang sudah ada jika ada
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Buat modal baru
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${src}" alt="${alt}" class="modal-image">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listener untuk menutup modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Tutup modal ketika klik di luar gambar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
} 