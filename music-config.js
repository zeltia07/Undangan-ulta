// Konfigurasi Musik untuk Undangan
// File ini bisa diubah untuk mengganti sumber musik

const MUSIC_CONFIG = {
    // ===== PILIH SUMBER MUSIK =====
    // Pilih: 'youtube', 'local', atau 'fallback'
    source: 'local',
    
    // ===== AUTOPLAY SETTINGS =====
    autoplay: true, // Set true untuk autoplay musik
    
    // ===== YOUTUBE MUSIK =====
    // Extract Video ID dari URL YouTube
    // Contoh: https://youtu.be/iJbyzIMluXw → youtubeId: 'iJbyzIMluXw'
    // Contoh: https://www.youtube.com/watch?v=iJbyzIMluXw → youtubeId: 'iJbyzIMluXw'
    youtubeId: 'vhVBWw6rId0',
    
    // ===== FILE MUSIK LOKAL =====
    // Simpan file musik di folder audio/
    // Format yang didukung: MP3, WAV, OGG, M4A
    localFile: 'audio/musik.mp3',
    
    // ===== FALLBACK AUDIO =====
    // URL file audio langsung (MP3, WAV, dll) dari internet
    fallbackUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    
    // ===== CONTOH SUMBER MUSIK LAIN =====
    // Spotify (perlu embed)
    // spotifyUrl: 'https://open.spotify.com/track/...',
    
    // SoundCloud
    // soundcloudUrl: 'https://soundcloud.com/...',
};

// Fungsi untuk mengekstrak YouTube Video ID
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Fungsi untuk mendapatkan URL musik berdasarkan konfigurasi
function getMusicUrl() {
    switch(MUSIC_CONFIG.source) {
        case 'local':
            return MUSIC_CONFIG.localFile;
        case 'youtube':
            return null; // YouTube menggunakan player terpisah
        case 'fallback':
        default:
            return MUSIC_CONFIG.fallbackUrl;
    }
}

// Contoh penggunaan:
// const videoId = extractYouTubeId('https://youtu.be/iJbyzIMluXw');
// console.log(videoId); // Output: 'iJbyzIMluXw'

// Export untuk digunakan di script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MUSIC_CONFIG, extractYouTubeId, getMusicUrl };
} 