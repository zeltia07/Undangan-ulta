// Nama tamu dari landing page
const landing = document.getElementById('landing');
const invitation = document.getElementById('invitation');
const openBtn = document.getElementById('openInvitation');
const guestNameInput = document.getElementById('guestName');
const forGuest = document.getElementById('forGuest');
const audio = document.getElementById('audio');
const musicToggle = document.getElementById('musicToggle');
const musicPlayer = document.querySelector('.music-player');

// RSVP
const form = document.getElementById('rsvpForm');
const namaInput = document.getElementById('nama');
const ucapanInput = document.getElementById('ucapan');
const rsvpList = document.getElementById('rsvpList');
let daftarHadir = [];

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

// Ucapan & Doa
function getWishes() {
    return JSON.parse(localStorage.getItem('wishes') || '[]');
}
function saveWishes(wishes) {
    localStorage.setItem('wishes', JSON.stringify(wishes));
}
function renderWishes() {
    const wishList = document.getElementById('wishList');
    const wishes = getWishes();
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
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('wishName').value.trim();
        const text = document.getElementById('wishText').value.trim();
        const status = wishForm.status.value;
        if (!name || !text || !status) return;
        const wishes = getWishes();
        const now = new Date();
        const time = now.toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        wishes.unshift({ name, text, status, time });
        saveWishes(wishes);
        renderWishes();
        document.getElementById('wishText').value = '';
        wishForm.status.value = '';
    });
    // Simpan nama tamu ke localStorage
    localStorage.setItem('guestName', guestName);
});

musicToggle.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        musicToggle.textContent = '⏸️ Pause Musik';
    } else {
        audio.pause();
        musicToggle.textContent = '▶️ Play Musik';
    }
});

audio.addEventListener('play', function() {
    musicToggle.textContent = '⏸️ Pause Musik';
});
audio.addEventListener('pause', function() {
    musicToggle.textContent = '▶️ Play Musik';
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
