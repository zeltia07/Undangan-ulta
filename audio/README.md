# 🎵 Panduan File Musik Lokal

## Cara Menambahkan Musik Sendiri

### 1. **Siapkan File Musik**
- Format yang didukung: **MP3**, **WAV**, **OGG**, **M4A**
- Ukuran file: Sebaiknya di bawah 10MB untuk performa optimal
- Nama file: Gunakan nama yang mudah diingat

### 2. **Simpan File di Folder Ini**
```
audio/
├── birthday-music.mp3    ← File utama
├── birthday-music.wav    ← Backup format
├── birthday-music.ogg    ← Backup format
└── README.md
```

### 3. **Update Konfigurasi**
Buka file `music-config.js` dan ubah:
```javascript
const MUSIC_CONFIG = {
    source: 'local',                    // Pilih 'local'
    localFile: 'audio/birthday-music.mp3', // Nama file Anda
    // ...
};
```

### 4. **Format File yang Direkomendasikan**

#### **MP3 (Direkomendasikan)**
- ✅ Kompatibilitas tinggi
- ✅ Ukuran file kecil
- ✅ Kualitas bagus
- **Contoh**: `birthday-music.mp3`

#### **WAV**
- ✅ Kualitas tinggi
- ❌ Ukuran file besar
- **Contoh**: `birthday-music.wav`

#### **OGG**
- ✅ Ukuran file kecil
- ❌ Kompatibilitas terbatas
- **Contoh**: `birthday-music.ogg`

### 5. **Contoh Penggunaan**

#### **File Utama:**
```javascript
localFile: 'audio/happy-birthday.mp3'
```

#### **Multiple Format:**
```javascript
// HTML akan mencoba format secara berurutan
<source src="audio/music.mp3" type="audio/mpeg">
<source src="audio/music.wav" type="audio/wav">
<source src="audio/music.ogg" type="audio/ogg">
```

### 6. **Tips Optimasi**

#### **Kompresi Audio:**
- Gunakan bitrate 128-192 kbps untuk MP3
- Sample rate 44.1 kHz sudah cukup
- Durasi musik sebaiknya 3-5 menit

#### **Nama File:**
- Gunakan huruf kecil
- Hindari spasi (gunakan dash atau underscore)
- Contoh: `birthday-song.mp3`, `happy_birthday.wav`

### 7. **Troubleshooting**

#### **Musik Tidak Muncul:**
1. Periksa nama file di `music-config.js`
2. Pastikan file ada di folder `audio/`
3. Cek format file didukung browser
4. Lihat console browser untuk error

#### **Fallback Otomatis:**
Jika file lokal gagal, sistem akan otomatis menggunakan fallback audio dari internet.

### 8. **Contoh File yang Sudah Disiapkan**

Saat ini belum ada file musik di folder ini. Silakan tambahkan file musik Anda sendiri!

---

**🎉 Selamat! Sekarang Anda bisa menggunakan musik sendiri untuk undangan!** 