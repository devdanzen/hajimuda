import { eq } from 'drizzle-orm';

import { articles } from './db/schema/articles';
import { users } from './db/schema/users';
import { generateSlug, truncateText } from './lib/articles';
import { db } from './lib/db';

import 'dotenv/config';

const sampleArticles = [
  {
    title: 'Panduan Lengkap Persiapan Haji 2024',
    category: 'edukasi' as const,
    image: 'https://picsum.photos/800/450?random=1',
    content: `Persiapan haji merupakan langkah penting yang harus dilakukan dengan matang. Ibadah haji adalah rukun Islam kelima yang wajib dilaksanakan oleh setiap Muslim yang mampu.

## Dokumen Penting

Berikut dokumen-dokumen yang perlu Anda persiapkan:
- Paspor dengan masa berlaku minimal 6 bulan
- Visa haji dari Kerajaan Arab Saudi
- Kartu vaksinasi meningitis dan COVID-19
- Surat keterangan sehat dari dokter

## Persiapan Fisik

Kondisi fisik yang prima sangat penting untuk menjalani ibadah haji:
- Rutin berolahraga minimal 3 bulan sebelum keberangkatan
- Konsumsi makanan bergizi seimbang
- Istirahat yang cukup
- Lakukan pemeriksaan kesehatan menyeluruh

## Persiapan Spiritual

Persiapan rohani tidak kalah pentingnya:
- Pelajari manasik haji dengan seksama
- Perbanyak ibadah dan dzikir
- Mohon maaf kepada keluarga dan kerabat
- Lunasi semua hutang

Semoga persiapan Anda berjalan lancar dan ibadah haji Anda diterima Allah SWT.`,
    published: true,
  },
  {
    title: 'Tips Memilih Paket Umrah yang Tepat',
    category: 'edukasi' as const,
    image: 'https://picsum.photos/800/450?random=2',
    content: `Memilih paket umrah yang tepat adalah kunci kenyamanan ibadah Anda. Berikut panduan lengkap untuk membantu Anda membuat keputusan yang tepat.

## Hal-hal yang Perlu Diperhatikan

### 1. Legalitas Travel
Pastikan travel umrah memiliki:
- Izin resmi dari Kementerian Agama
- PPIU (Penyelenggara Perjalanan Ibadah Umrah) yang valid
- Track record yang baik

### 2. Fasilitas yang Ditawarkan
Perhatikan detail fasilitas:
- Hotel (jarak ke Masjidil Haram dan Masjid Nabawi)
- Transportasi (bus ber-AC)
- Makan 3x sehari
- Pembimbing yang berpengalaman

### 3. Harga dan Pembayaran
- Bandingkan harga dengan fasilitas yang ditawarkan
- Tanyakan apakah ada biaya tambahan
- Sistem pembayaran (tunai/cicilan)

## Tips Tambahan
- Baca testimoni dari jamaah sebelumnya
- Tanyakan program tambahan (city tour, ziarah)
- Pastikan asuransi perjalanan termasuk dalam paket

Pilihlah paket yang sesuai dengan kebutuhan dan kemampuan Anda.`,
    published: true,
  },
  {
    title: 'Teknologi Modern dalam Pelayanan Haji',
    category: 'teknologi' as const,
    image: 'https://picsum.photos/800/450?random=3',
    content: `Era digital telah membawa perubahan signifikan dalam pelayanan ibadah haji. Berbagai teknologi modern kini digunakan untuk meningkatkan kenyamanan dan keamanan jamaah.

## Aplikasi Mobile untuk Jamaah

Pemerintah Saudi telah meluncurkan beberapa aplikasi:
- **Eatmarna**: Untuk booking waktu umrah
- **Tawakkalna**: Aplikasi kesehatan dan status COVID-19
- **Nusuk**: Platform terintegrasi untuk layanan haji dan umrah

## Gelang Pintar (Smart Bracelet)

Jamaah haji kini dilengkapi dengan gelang pintar yang memiliki fitur:
- GPS tracking untuk memantau lokasi
- Informasi medis dan identitas jamaah
- Panic button untuk keadaan darurat
- NFC untuk akses ke berbagai fasilitas

## Sistem Transportasi Modern

- Kereta api Haramain berkecepatan tinggi
- Bus listrik ramah lingkungan
- Sistem pemesanan transportasi online

## Digitalisasi Layanan

- E-visa untuk proses yang lebih cepat
- Pembayaran digital di seluruh fasilitas
- Virtual reality untuk pelatihan manasik

Teknologi ini membantu jamaah fokus pada ibadah tanpa khawatir masalah teknis.`,
    published: true,
  },
  {
    title: 'Update Kuota Haji Indonesia 2024',
    category: 'berita' as const,
    image: 'https://picsum.photos/800/450?random=4',
    content: `Kementerian Agama RI telah mengumumkan kuota haji Indonesia untuk tahun 2024. Berikut informasi lengkap yang perlu Anda ketahui.

## Jumlah Kuota

Indonesia mendapat alokasi kuota sebanyak 221.000 jamaah, terdiri dari:
- Haji Reguler: 203.320 jamaah
- Haji Khusus: 17.680 jamaah

## Distribusi per Provinsi

Kuota terbesar diberikan kepada:
1. Jawa Barat: 42.000 jamaah
2. Jawa Timur: 38.000 jamaah
3. Jawa Tengah: 35.000 jamaah
4. Sumatera Utara: 12.000 jamaah
5. Provinsi lainnya: 94.000 jamaah

## Biaya Haji 2024

- Haji Reguler: Rp 69.190.000 per jamaah
- Sudah termasuk:
  - Tiket pesawat PP
  - Akomodasi di Arab Saudi
  - Makan 3x sehari
  - Transportasi selama di tanah suci
  - Asuransi perjalanan

## Jadwal Keberangkatan

Keberangkatan dimulai pada:
- Gelombang I: 14 Mei 2024
- Gelombang II: 4 Juni 2024

Pendaftaran dapat dilakukan melalui bank penerima setoran haji.`,
    published: true,
  },
  {
    title: 'Kisah Inspiratif: Dari Tukang Becak Hingga Naik Haji',
    category: 'berita' as const,
    image: 'https://picsum.photos/800/450?random=5',
    content: `Pak Ahmad (65), seorang tukang becak dari Yogyakarta, akhirnya berhasil mewujudkan impiannya untuk menunaikan ibadah haji setelah menabung selama 20 tahun.

## Perjuangan Panjang

Setiap hari, Pak Ahmad menyisihkan Rp 10.000 dari hasil mengayuh becaknya. "Saya pasang niat, setiap dapat penumpang, saya sisihkan untuk tabungan haji," ujarnya dengan mata berkaca-kaca.

## Dukungan Keluarga

Istri dan ketiga anaknya selalu mendukung tekad Pak Ahmad:
- Istri membantu dengan berjualan gorengan
- Anak-anak ikut menambah tabungan setelah bekerja
- Tetangga sering memberi pekerjaan tambahan

## Momen Haru

Ketika saldo tabungannya mencapai nominal yang dibutuhkan, Pak Ahmad langsung mendaftar haji. "Saya menangis saat menerima porsi haji. Rasanya seperti mimpi," kenangnya.

## Pesan untuk Generasi Muda

"Jangan pernah menyerah dengan impian. Kalau tukang becak seperti saya bisa, kalian yang muda pasti lebih bisa," pesan Pak Ahmad.

## Keberangkatan

Pak Ahmad dijadwalkan berangkat pada gelombang kedua tahun ini. Warga kampung berencana mengadakan pelepasan besar-besaran.

Kisah Pak Ahmad membuktikan bahwa dengan tekad kuat dan ikhtiar yang sungguh-sungguh, impian menunaikan ibadah haji bisa terwujud.`,
    published: true,
  },
  {
    title: 'Perkembangan Pembangunan Masjidil Haram',
    category: 'berita' as const,
    image: 'https://picsum.photos/800/450?random=6',
    content: `Pemerintah Arab Saudi terus melakukan pengembangan Masjidil Haram untuk meningkatkan kapasitas dan kenyamanan jamaah.

## Proyek Perluasan Terbaru

### Mataf (Area Tawaf)
- Perluasan area tawaf hingga dapat menampung 130.000 jamaah per jam
- Lantai marmer khusus yang tetap dingin di cuaca panas
- Sistem pendingin udara tersembunyi

### Mas'a (Area Sa'i)
- Penambahan jalur sa'i menjadi 4 tingkat
- Eskalator dan lift untuk lansia dan difabel
- Kapasitas meningkat hingga 180.000 jamaah per jam

## Teknologi Canggih

- Sistem audio dengan 6.000 speaker
- 1.200 kamera CCTV untuk keamanan
- WiFi gratis di seluruh area
- Aplikasi panduan digital multibahasa

## Fasilitas Pendukung

- 1.000 toilet dengan sistem pembersihan otomatis
- 5.000 keran air zamzam
- Klinik kesehatan 24 jam
- Area parkir untuk 20.000 kendaraan

## Target Kapasitas

Dengan perluasan ini, Masjidil Haram ditargetkan dapat menampung:
- 2.5 juta jamaah pada waktu bersamaan
- 30 juta jamaah per tahun untuk umrah
- 3 juta jamaah saat musim haji

Pembangunan dijadwalkan selesai pada 2025.`,
    published: true,
  },
  {
    title: 'Panduan Praktis Thawaf untuk Pemula',
    category: 'edukasi' as const,
    image: 'https://picsum.photos/800/450?random=7',
    content: `Thawaf adalah ritual mengelilingi Ka'bah sebanyak 7 kali. Berikut panduan lengkap untuk jamaah yang baru pertama kali.

## Persiapan Sebelum Thawaf

1. **Wudhu** - Pastikan dalam keadaan suci
2. **Pakaian Ihram** - Untuk pria: dua lembar kain putih tanpa jahitan
3. **Niat** - Ucapkan niat thawaf dalam hati

## Tata Cara Thawaf

### Memulai Thawaf
- Mulai dari Hajar Aswad (Batu Hitam)
- Hadapkan badan ke Ka'bah
- Angkat tangan kanan sebagai isyarat
- Ucapkan "Bismillah, Allahu Akbar"

### Selama Thawaf
- Berjalan mengelilingi Ka'bah dengan Ka'bah di sebelah kiri
- Pria disunnahkan melakukan:
  - Idhtiba' (membuka bahu kanan)
  - Raml (jalan cepat) pada 3 putaran pertama
- Berdoa dengan khusyuk

### Rukun Yamani
- Saat melewati Rukun Yamani, usap jika memungkinkan
- Jika ramai, cukup mengangkat tangan

### Mengakhiri Thawaf
- Selesai 7 putaran di Hajar Aswad
- Shalat 2 rakaat di Maqam Ibrahim jika memungkinkan
- Minum air zamzam

## Tips Praktis
- Pilih waktu yang tidak terlalu ramai (setelah subuh atau dhuha)
- Gunakan lantai atas saat sangat padat
- Fokus pada ibadah, bukan selfie
- Ikuti arahan petugas

Semoga thawaf Anda diterima Allah SWT.`,
    published: false,
  },
  {
    title: 'Inovasi Layanan Kesehatan Jamaah Haji',
    category: 'teknologi' as const,
    image: 'https://picsum.photos/800/450?random=8',
    content: `Pelayanan kesehatan jamaah haji terus ditingkatkan dengan berbagai inovasi teknologi terkini.

## Telemedicine untuk Jamaah

Sistem konsultasi jarak jauh memungkinkan:
- Konsultasi dengan dokter spesialis di Indonesia
- Monitoring kondisi kesehatan real-time
- Resep digital yang terintegrasi

## Klinik Kesehatan Indonesia

Fasilitas yang tersedia:
- 10 klinik di Mekkah dan Madinah
- Dokter spesialis 24 jam
- Ambulans khusus jamaah Indonesia
- Obat-obatan sesuai kebiasaan Indonesia

## Sistem Monitoring Kesehatan

### Aplikasi SiskohatKes
- Riwayat kesehatan jamaah
- Reminder minum obat
- Panic button darurat
- Lokasi fasilitas kesehatan terdekat

### Alat Kesehatan Modern
- Portable ECG untuk jantung
- Glucometer untuk diabetes
- Oximeter untuk saturasi oksigen
- Tensimeter digital

## Program Preventif

- Vaksinasi lengkap sebelum keberangkatan
- Edukasi kesehatan intensif
- Senam haji rutin
- Konseling psikologis

## Penanganan Emergency

- Tim reaksi cepat 24/7
- Helikopter medis untuk evakuasi
- Kerjasama dengan RS Arab Saudi
- Asuransi kesehatan comprehensive

Dengan inovasi ini, angka kesakitan jamaah menurun 40% dibanding tahun sebelumnya.`,
    published: false,
  },
];

async function seedArticles() {
  try {
    console.info('Starting article seed...');

    // Get admin user
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'admin@hajimuda.com'))
      .limit(1);

    if (adminUser.length === 0) {
      console.info('Admin user not found. Please run seed.ts first to create admin user.');
      process.exit(1);
    }

    const authorId = adminUser[0].id;
    console.info('Found admin user with ID:', authorId);

    // Insert articles
    for (const article of sampleArticles) {
      const slug = generateSlug(article.title);
      const excerpt = truncateText(article.content, 200);

      console.info(`Creating article: ${article.title}`);

      await db.insert(articles).values({
        title: article.title,
        slug,
        content: article.content,
        excerpt,
        image: article.image,
        category: article.category,
        authorId,
        published: article.published,
      });
    }

    console.info(`Successfully created ${sampleArticles.length} articles!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  }
}

seedArticles();