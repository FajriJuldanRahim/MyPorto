import { Project, Experience, Certificate, BlogPost, SkillCategory } from './types';

export const PERSONAL_INFO = {
  fullName: 'Fajri Juldan Rahim',
  title: 'HR Recruitment & OD Specialist',
  subTitle: 'HR Recruitment & Organizational Development professional dengan pengalaman mengelola proses recruitment end-to-end, employer branding, dan HR administration di industri manufaktur otomotif. Memiliki minat mendalam pada HR Analytics, Data Science, dan People Analytics.',
  avatar: 'Foto_Fajri.png',
  email: 'fajrijuldanrh@gmail.com',
  github: 'https://github.com/fajrijuldan',
  linkedin: 'https://linkedin.com/in/fajrijuldan',
  whatsapp: 'https://wa.me/6285742705510',
  location: 'Karawang, Jawa Barat',
  stats: {
    projectsCount: 3,
    certsCount: 3,
    techsCount: 15,
    experienceYears: 1,
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'hr_admin',
    title: 'HR & Administrasi',
    iconName: 'Settings',
    skills: [
      { name: 'Recruitment', level: 95 },
      { name: 'Talent Acquisition', level: 92 },
      { name: 'Employer Branding', level: 90 },
      { name: 'HR Administrasi', level: 88 },
    ]
  },
  {
    id: 'software',
    title: 'Software & Tools',
    iconName: 'Database',
    skills: [
      { name: 'Microsoft Office & Spreadsheet', level: 95 },
      { name: 'Power BI', level: 85 },
      { name: 'HRIS Euclid', level: 80 },
      { name: 'Oracle DB', level: 78 },
      { name: 'Visual Studio Code', level: 88 },
    ]
  },
  {
    id: 'technical',
    title: 'Keterampilan Teknis',
    iconName: 'Layout',
    skills: [
      { name: 'Web Development', level: 82 },
      { name: 'Data Science', level: 80 },
      { name: 'Data Analyst', level: 86 },
      { name: 'UI/UX Designer', level: 75 },
    ]
  },
  {
    id: 'languages',
    title: 'Bahasa Pemrograman',
    iconName: 'Code',
    skills: [
      { name: 'Python', level: 78 },
      { name: 'PHP', level: 72 },
      { name: 'CSS & JavaScript', level: 80 },
      { name: 'SQL (MySQL)', level: 82 },
    ]
  },
  {
    id: 'languages_spoken',
    title: 'Bahasa',
    iconName: 'Compass',
    skills: [
      { name: 'Inggris (Intermediate)', level: 75 },
      { name: 'Indonesia (Native)', level: 100 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'employee-workload',
    name: 'Employee Work Load Analysis',
    shortDesc: 'Analisis beban kerja karyawan menggunakan metodologi CRISP-DM dan visualisasi dashboard Matplotlib.',
    description: 'Proyek analisis data komprehensif untuk mengidentifikasi pola distribusi jam kerja karyawan dan faktor-faktor yang memengaruhi beban kerja (workload) di dalam organisasi. Menggunakan metodologi standar industri CRISP-DM.',
    category: 'Data Analytics',
    status: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Pandas', 'Matplotlib', 'CRISP-DM', 'EDA'],
    demoUrl: '',
    githubUrl: 'https://github.com/fajrijuldan/employee-workload-analysis',
    problem: 'Kesulitan dalam mengidentifikasi ketidakseimbangan beban kerja (workload) karyawan secara objektif, yang sering kali berdampak pada kelelahan kerja (burnout) atau ketidakefisienan alokasi sumber daya manusia.',
    goals: [
      'Mengidentifikasi pola distribusi jam kerja karyawan secara akurat.',
      'Menemukan faktor-faktor utama yang memengaruhi beban kerja karyawan.',
      'Membangun visualisasi dashboard yang intuitif untuk mendukung analisis manajemen.'
    ],
    solution: 'Mengembangkan pipeline pengolahan data menggunakan Python dan Pandas untuk membersihkan serta merestrukturisasi log jam kerja. Menerapkan analisis data eksploratif (EDA) untuk menemukan korelasi workload, dan merancang visualisasi representatif dengan Matplotlib.',
    workflow: [
      'Mengumpulkan data aktivitas kerja dan log jam kerja karyawan.',
      'Melakukan pembersihan data (data cleaning) dan penanganan nilai kosong.',
      'Menerapkan metodologi CRISP-DM untuk penentuan model analisis.',
      'Merender chart visualisasi distribusi beban kerja menggunakan Matplotlib.'
    ],
    architecture: 'Python-based script execution with modular data processing using Pandas. Visualizations exported to interactive charts and reports.',
    challenges: 'Menangani data log waktu yang tidak terstruktur dan mendeteksi anomali entri jam kerja yang tidak konsisten.',
    results: 'Berhasil memetakan tingkat kepuasan kerja dan beban kerja secara transparan, memberikan landasan data solid untuk penyesuaian alokasi staf.',
    lessons: 'Analisis data eksploratif yang menyeluruh (EDA) di awal sangat krusial untuk memandu pembuatan hipotesis workload yang tepat.',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'recruitment-db',
    name: 'Recruitment Database Management System',
    shortDesc: 'Sistem manajemen database rekrutmen terstruktur dari UNF hingga 3NF berbasis MySQL dan PHP.',
    description: 'Aplikasi manajemen database rekrutmen kustom untuk mengelola data kandidat pelamar, tahapan seleksi aktif, dan onboarding karyawan baru secara efisien dan aman.',
    category: 'Backend',
    status: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    tags: ['MySQL', 'PHP', 'Database Normalization', '3NF', 'Web App'],
    demoUrl: '',
    githubUrl: 'https://github.com/fajrijuldan/recruitment-db-system',
    problem: 'Data kandidat rekrutmen yang tidak terstruktur, redundansi data yang tinggi, dan lambatnya pencarian riwayat seleksi akibat penyimpanan manual yang tidak tersinkronisasi.',
    goals: [
      'Mendesain database terstruktur dengan normalisasi UNF hingga 3NF.',
      'Mempercepat waktu pencarian data kandidat dalam hitungan milidetik.',
      'Membangun sistem HR Recruitment yang mencakup seluruh tahapan dari aplikasi hingga onboarding.'
    ],
    solution: 'Merancang arsitektur database relasional ternormalisasi (3NF) menggunakan MySQL untuk meminimalkan redundansi. Membangun antarmuka administrasi berbasis PHP untuk mengelola entri data secara dinamis dan aman.',
    workflow: [
      'Melakukan pemetaan kebutuhan relasi data kandidat dan lowongan.',
      'Menerapkan normalisasi database dari bentuk tidak normal (UNF) hingga 3NF.',
      'Membuat tabel MySQL, indeks, dan relasi foreign key.',
      'Mendevelop antarmuka PHP untuk penginputan dan pemantauan status seleksi.'
    ],
    architecture: 'Two-tier relational architecture: MySQL Database Layer connected via PHP PDO to a clean, lightweight web client.',
    challenges: 'Memastikan integritas referensial data ketika kandidat mendaftar ke beberapa lowongan berbeda secara bersamaan.',
    results: 'Menghilangkan redundansi data pelamar hingga 95% dan memangkas waktu pencarian profil kandidat secara signifikan.',
    lessons: 'Perencanaan skema database relasional yang matang sejak awal menghemat banyak waktu pengembangan di masa depan.',
    screenshots: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'recruitment-kpi',
    name: 'Recruitment Dashboard KPI',
    shortDesc: 'Dashboard pemantauan KPI tim HR dan proses rekrutmen berbasis formula Spreadsheet interaktif.',
    description: 'Aplikasi dashboard analitik berbasis Spreadsheet untuk melacak metrik penting rekrutmen seperti manpower request, fulfillment rate, lead time, dan progress hiring secara otomatis.',
    category: 'Data Analytics',
    status: 'Completed',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Spreadsheet', 'KPI Dashboard', 'Data Visualization', 'Pivot Table', 'Automation'],
    demoUrl: '',
    githubUrl: 'https://github.com/fajrijuldan/recruitment-kpi-dashboard',
    problem: 'Tim HR kesulitan memantau produktivitas rekrutmen dan kecepatan pemenuhan tenaga kerja karena data tersebar secara manual di berbagai catatan.',
    goals: [
      'Mengotomatisasi pelaporan metrik rekrutmen harian dan bulanan.',
      'Menyajikan visualisasi KPI tim HR secara real-time.',
      'Mempercepat proses monitoring bagi manajemen senior.'
    ],
    solution: 'Merancang lembar kerja dinamis menggunakan formula Spreadsheet tingkat lanjut, Pivot Table, dan visualisasi grafik terintegrasi. Mengotomatisasi pembaruan grafik KPI seiring penambahan entri log baru.',
    workflow: [
      'Mengumpulkan parameter input manpower request dan log waktu tahapan seleksi.',
      'Menerapkan formula kalkulasi otomatis untuk Lead Time dan Fulfillment Rate.',
      'Membuat visualisasi grafik batang dan garis representatif.',
      'Mempublikasikan dashboard interaktif yang mudah diakses oleh pimpinan.'
    ],
    architecture: 'Data processing engine inside cloud spreadsheets utilizing conditional statements, array formulas, and aggregate Pivot Tables.',
    challenges: 'Menyederhanakan formula yang sangat kompleks agar lembar kerja tetap responsif saat memproses ribuan baris log.',
    results: 'Mempercepat pengambilan keputusan strategis rekrutmen dan menyajikan visibilitas KPI tim HR secara instan dan akurat.',
    lessons: 'Spreadsheet yang dioptimalkan secara mendalam dengan formula terstruktur bisa menjadi alat analitik yang sangat tangguh sebelum beralih ke BI tools komersial.',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'pako-od',
    company: 'Pako Group',
    position: 'HR Staff Organizational Development (OD)',
    period: 'April 2024 - Sekarang',
    description: [
      'Mengelola pembaruan struktur organisasi dari tingkat departemen hingga jajaran Director in Charge (DIC) dan Komisaris.',
      'Bekerja sama dengan departemen terkait untuk memvalidasi tugas, tanggung jawab, dan kompetensi tiap posisi.',
      'Menyusun laporan dan dashboard Organizational Development yang mencakup struktur organisasi, progress KPI, hasil evaluasi pelatihan, dan tingkat kompetensi.'
    ],
    achievement: [
      'Berhasil melakukan digitalisasi pemantauan kompetensi karyawan secara sistematis.',
      'Meningkatkan akurasi penyusunan laporan struktur organisasi dan mempercepat validasi tugas lintas divisi.'
    ],
    tags: ['Organizational Development', 'Competency Mapping', 'Dashboard Reporting', 'ASTRA Otoparts']
  },
  {
    id: 'pako-recruitment',
    company: 'Pako Group',
    position: 'HR Staff Recruitment & Branding',
    period: 'April 2024 - Sekarang',
    description: [
      'Mengelola proses Recruitment end-to-end mulai dari manpower request, sourcing, screening, interview scheduling, offering, hingga onboarding.',
      'Mengelola employer branding melalui LinkedIn, Instagram, dan media internal untuk meningkatkan employer value serta engagement karyawan.',
      'Memonitor engagement dan performa konten untuk meningkatkan jangkauan dan efektivitas branding secara berkelanjutan.',
      'Membuat materi visual & copywriting untuk kebutuhan Recruitment, event HR, dan komunikasi internal.',
      'Meningkatkan efisiensi administrasi HR melalui pengelolaan dan digitalisasi dokumen karyawan secara sistematis.',
      'Menyiapkan dokumen administrasi: undangan interview, psikotest, kontrak kerja, serta rekapitulasi pengeluaran bulanan departemen HRD.'
    ],
    achievement: [
      'Mempercepat Lead Time selection dengan mengelola proses Recruitment end-to-end untuk lebih dari 5000+ kandidat magang, internship, dan Gol. 3 ke atas setiap bulannya.',
      'Berhasil menurunkan standar rata-rata Lead Time recruitment karyawan Gol. 3 dan 4 menjadi 30 hari.',
      'Berhasil menurunkan standar rata-rata Lead Time Recruitment Internship menjadi 20 hari.',
      'Berhasil memproses permintaan pemagangan dengan Lead Time rata-rata 14 hari, memastikan pemenuhan kebutuhan tenaga kerja sesuai jadwal.'
    ],
    tags: ['End-to-End Recruitment', 'Employer Branding', 'Lead Time Optimization', 'Talent Acquisition', 'HR Administration']
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-data-analyst',
    title: 'Sertifikasi Kompetensi Data Analyst',
    issuer: 'InerCorp',
    date: 'Juli 2026',
    credentialId: 'INER-DA-2026',
    credentialUrl: 'https://inercorp.com',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cert-pako-intern',
    title: 'Sertifikasi Pemagangan',
    issuer: 'Pako Group',
    date: 'Oktober 2024',
    credentialId: 'PAKO-INTERN-2024',
    credentialUrl: 'https://pakogroup.com',
    image: 'SERTIFIKAT PEMAGANGAN - FAJRI JULDAN RAHIM.pdf'
  },
  {
    id: 'cert-grafis-dasar',
    title: 'Desainer Grafis Muda Dasar',
    issuer: 'Kemnaker RI',
    date: 'Juni 2023',
    credentialId: '230622EBCE7C50',
    credentialUrl: 'https://kemnaker.go.id',
    image: 'Sertifikat 1909320401-EA3C90AA (1).pdf'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'penerapan-analisis-beban-kerja',
    title: 'Penerapan Analisis Beban Kerja (Workload Analysis) dalam Optimasi Tim SDM',
    description: 'Bagaimana memanfaatkan teknik data-driven dan framework CRISP-DM untuk memetakan beban kerja karyawan secara adil dan produktif.',
    content: `Analisis beban kerja (Workload Analysis) merupakan kunci utama bagi praktisi HR untuk memastikan kesehatan mental karyawan (mencegah burnout) sekaligus memaksimalkan efisiensi organisasi. 

Berikut adalah 3 langkah utama untuk mengoptimalkan alokasi SDM berbasis data:

### 1. Pengumpulan Log Jam Kerja Terstruktur
Gunakan sistem monitoring log waktu atau survei pengisian aktivitas harian yang andal untuk memetakan jam kerja aktual dibanding jam kerja standar kontrak kerja.

### 2. Penerapan Metodologi CRISP-DM
Gunakan model data-driven seperti metodologi CRISP-DM untuk mengelompokkan karyawan berdasarkan pola beban kerja mereka (rendah, optimal, tinggi) guna menghindari bias subjektif.

### 3. Visualisasi Dashboard Interaktif
Menyusun visualisasi interaktif (misalnya menggunakan Matplotlib atau Power BI) sangat mempermudah jajaran manajemen dalam mengambil keputusan rotasi tugas maupun penambahan rekrutmen staf baru.`,
    category: 'HR Analytics',
    date: '18 Juli 2026',
    readTime: '5 menit baca',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    tags: ['HR Analytics', 'CRISP-DM', 'Workload', 'People Analytics']
  },
  {
    id: 'membangun-employer-branding-digital',
    title: 'Membangun Employer Branding yang Kuat di Era Digital: Strategi & Implementasi',
    description: 'Panduan praktis bagi praktisi HR untuk meningkatkan brand value perusahaan lewat media sosial dan meningkatkan konversi kandidat berkualitas.',
    content: `Mendapatkan talenta terbaik di pasar kerja yang kompetitif membutuhkan strategi penjemputan bola yang aktif. Disinilah peran penting dari **Employer Branding**.

Berikut adalah tips mengoptimalkan Employer Branding perusahaan Anda:

### 1. Aktif Memanfaatkan LinkedIn & Instagram
Publikasikan kisah di balik layar karyawan, keberhasilan pencapaian tim, program internship, serta budaya kerja inklusif untuk menarik minat para pencari kerja pasif (passive candidates).

### 2. Mempercepat Lead Time Seleksi
Pengalaman kandidat (candidate experience) yang buruk selama proses seleksi akan menurunkan citra employer brand Anda. Optimalkan lead time dari pendaftaran, screening, wawancara, hingga pengumuman penawaran (offering) agar kandidat merasa dihargai.

### 3. Kolaborasi Visual & Copywriting yang Menarik
Gunakan konten visual yang beresolusi tinggi dan gaya penyampaian pesan (copywriting) yang ramah serta profesional untuk merepresentasikan jati diri korporasi yang modern dan berintegritas.`,
    category: 'Employer Branding',
    date: '28 Juni 2026',
    readTime: '6 menit baca',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    tags: ['Employer Branding', 'Recruitment', 'Talent Acquisition']
  },
  {
    id: 'desain-database-rekrutmen-3nf',
    title: 'Mendesain Database Rekrutmen yang Efisien dengan Normalisasi 3NF',
    description: 'Langkah taktis menyusun database rekrutmen terstruktur untuk meminimalkan redundansi data pelamar dan mempercepat monitoring seleksi.',
    content: `Penyimpanan data kandidat yang berantakan sering membuat tim rekrutmen kehilangan jejak pelamar potensial. Mendesain database relasional yang rapi adalah solusi jangka panjang.

### Mengapa Normalisasi UNF ke 3NF Penting?
Tanpa normalisasi, data pelamar seperti nomor telepon, e-KTP, dan file CV akan terus terduplikasi setiap kali mereka melamar di lowongan yang berbeda. 

### Langkah Normalisasi Skema Database HR:
1. **1NF (First Normal Form)**: Menghilangkan kolom bernilai ganda (multivalued attributes) dan memastikan setiap baris bersifat atomik.
2. **2NF (Second Normal Form)**: Memastikan semua kolom non-key bergantung penuh secara fungsional pada Primary Key.
3. **3NF (Third Normal Form)**: Menghilangkan ketergantungan transitif (transitive dependency) sehingga kolom non-key tidak bergantung pada kolom non-key lainnya.

Dengan skema database rekrutmen terstandarisasi 3NF, query pencarian bakat dapat dijalankan dalam milidetik dan efisiensi penyimpanan server meningkat drastis!`,
    category: 'Web Development',
    date: '10 Juni 2026',
    readTime: '7 menit baca',
    thumbnail: 'https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=800&q=80',
    tags: ['MySQL', 'Normalization', 'Database', 'Recruitment']
  }
];
