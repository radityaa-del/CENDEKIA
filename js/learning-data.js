// Penjelasan variabel learningCourses : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
const learningCourses = [
  {
    id: 'python-dasar',
    title: 'Python Dasar',
    category: 'Programming',
    level: 'Pemula',
    color: 'blue',
    description:
      'Bangun fondasi pemrograman dengan Python melalui latihan yang sederhana dan praktis.',
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'Mulai dengan Python',
        lessons: [
          [
            'Mengenal Python dan pemrograman',
            'Python adalah bahasa yang ramah untuk pemula. Pelajari bagaimana instruksi diubah menjadi program yang dapat dijalankan komputer.',
            'print("Halo, Cendekia!")',
          ],
          [
            'Variabel dan tipe data',
            'Variabel menyimpan informasi yang dapat digunakan kembali. Python mengenali teks, angka, dan nilai logika secara otomatis.',
            'nama = "Alya"\numur = 15\nprint(nama, umur)',
          ],
        ],
      },
      {
        title: 'Logika Dasar',
        lessons: [
          [
            'Kondisi dengan if dan else',
            'Program dapat mengambil keputusan menggunakan kondisi. Gunakan if saat sebuah aksi hanya berjalan jika syarat terpenuhi.',
            'nilai = 85\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Belajar lagi")',
          ],
          [
            'Perulangan sederhana',
            'Perulangan membantu menjalankan instruksi yang sama beberapa kali tanpa menulis kode berulang.',
            'for angka in range(1, 4):\n    print("Latihan", angka)',
          ],
        ],
      },
    ],
  },
  {
    id: 'html-css',
    title: 'HTML dan CSS',
    category: 'Web Development',
    level: 'Pemula',
    color: 'green',
    description: 'Pelajari cara menyusun halaman web yang rapi, responsif, dan mudah dipahami.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'Struktur Halaman',
        lessons: [
          [
            'Kenalan dengan HTML',
            'HTML adalah kerangka halaman web. Elemen seperti heading, paragraf, dan tautan memberi arti pada konten.',
            '<h1>Halo, dunia!</h1>\n<p>Belajar web bersama Cendekia.</p>',
          ],
          [
            'Membuat halaman terstruktur',
            'Gunakan header, main, section, dan footer agar halaman tertata dan lebih mudah diakses.',
            '<main>\n  <section><h2>Tentang saya</h2></section>\n</main>',
          ],
        ],
      },
      {
        title: 'Tampilan dengan CSS',
        lessons: [
          [
            'Warna dan tipografi',
            'CSS mengatur tampilan HTML. Mulai dari warna, ukuran teks, jarak, dan latar belakang.',
            'body {\n  color: #142D4E;\n  background: #F4F7FB;\n}',
          ],
          [
            'Layout responsif',
            'Flexbox dan grid membantu menyusun elemen agar tetap nyaman digunakan di layar kecil maupun besar.',
            '.cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}',
          ],
        ],
      },
    ],
  },
  {
    id: 'javascript-dasar',
    title: 'JavaScript Dasar',
    category: 'Web Development',
    level: 'Pemula',
    color: 'orange',
    description: 'Tambahkan interaksi pada halaman web menggunakan JavaScript vanilla.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'JavaScript di Browser',
        lessons: [
          [
            'Variabel dan fungsi',
            'JavaScript membuat halaman web dapat merespons aksi pengguna melalui variabel dan fungsi.',
            'const sapaan = "Halo";\nfunction tampilkan() {\n  console.log(sapaan);\n}',
          ],
          [
            'Event dan interaksi',
            'Event listener menghubungkan aksi seperti klik dengan perubahan pada halaman.',
            'button.addEventListener("click", () => {\n  message.textContent = "Berhasil!";\n});',
          ],
        ],
      },
    ],
  },
  {
    id: 'algoritma-struktur-data',
    title: 'Algoritma dan Struktur Data',
    category: 'Computer Science',
    level: 'Menengah',
    color: 'navy',
    description: 'Latih cara berpikir sistematis untuk memecahkan masalah secara efisien.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'Berpikir Algoritmis',
        lessons: [
          [
            'Memecah masalah',
            'Algoritma adalah urutan langkah untuk menyelesaikan masalah. Pecah masalah besar menjadi bagian yang lebih kecil.',
            'mulai\nambil_data\nproses_data\ntampilkan_hasil',
          ],
          [
            'Array dan pencarian',
            'Array menyimpan kumpulan data dalam urutan tertentu dan dapat dicari dengan strategi yang sesuai.',
            'buah = ["apel", "mangga", "jeruk"]\nfor item in buah:\n    print(item)',
          ],
        ],
      },
    ],
  },
  {
    id: 'database-dasar',
    title: 'Dasar-Dasar Database',
    category: 'Database',
    level: 'Pemula',
    color: 'purple',
    description: 'Kenali cara data disimpan, dihubungkan, dan dikelola dengan rapi.',
    image:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'Mengenal Data',
        lessons: [
          [
            'Apa itu database?',
            'Database menyimpan data terstruktur agar dapat dicari dan digunakan kembali secara konsisten.',
            'CREATE TABLE siswa (\n  id INTEGER PRIMARY KEY,\n  nama TEXT\n);',
          ],
          [
            'Query pertama',
            'SQL digunakan untuk meminta data dari database. SELECT memilih kolom dan FROM memilih sumber data.',
            'SELECT nama\nFROM siswa\nWHERE aktif = 1;',
          ],
        ],
      },
    ],
  },
  {
    id: 'informatika-dasar',
    title: 'Mengenal Dunia Digital',
    category: 'Informatika Dasar',
    level: 'Pemula',
    color: 'green',
    description: 'Langkah awal memahami komputer, internet, dan cara teknologi bekerja.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    chapters: [
      {
        title: 'Komputer dan Informasi',
        lessons: [
          [
            'Bagian utama komputer',
            'Komputer menerima masukan, mengolah data, menyimpan hasil, dan menampilkannya kembali kepada pengguna.',
            'input → proses → output',
          ],
          [
            'Data dan informasi',
            'Data adalah fakta mentah. Setelah diolah dan diberi konteks, data dapat menjadi informasi yang membantu mengambil keputusan.',
            'data = [80, 90, 100]\nrata_rata = sum(data) / len(data)',
          ],
        ],
      },
      {
        title: 'Internet dengan Aman',
        lessons: [
          [
            'Cara kerja internet',
            'Internet menghubungkan perangkat melalui jaringan. Browser meminta halaman ke server, lalu server mengirimkan konten yang diminta.',
            'browser → request → server\nbrowser ← response ← server',
          ],
          [
            'Menjaga keamanan digital',
            'Gunakan kata sandi yang kuat, periksa alamat situs, dan jangan membagikan informasi pribadi kepada pihak yang tidak dikenal.',
            'berhenti → periksa → pastikan aman',
          ],
        ],
      },
    ],
  },
];

// Penjelasan fungsi getCourse : Mencari kelas berdasarkan ID atau alias dan memilih kelas bawaan jika tidak ditemukan. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function getCourse(courseId) {
  // Penjelasan variabel aliases : Variabel ini menyimpan data, hasil, atau referensi elemen yang dipakai oleh alur berikutnya. Walaupun bentuk atau isinya dapat digunakan lebih dari sekali, identitas variabel tersebut membuat kode lebih mudah dibaca dan ditelusuri.
  const aliases = {
    'web-pertama': 'html-css',
    'logika-programming': 'python-dasar',
    'berpikir-komputer': 'algoritma-struktur-data',
    'javascript-interaktif': 'javascript-dasar',
  };
  return (
    learningCourses.find((course) => course.id === (aliases[courseId] || courseId)) ||
    learningCourses[0]
  );
}

// Penjelasan fungsi getLessonList : Meratakan daftar materi seluruh bab beserta metadata setiap materi. Fungsi ini memproses input atau keadaan halaman yang diterima, mengembalikan atau memperbarui hasil yang dibutuhkan langkah berikutnya, dan dapat dipengaruhi oleh keadaan penyimpanan atau interaksi pengguna.
function getLessonList(course) {
  return course.chapters.flatMap((chapter, chapterIndex) =>
    chapter.lessons.map((lesson, lessonIndex) => ({
      id: `${chapterIndex}-${lessonIndex}`,
      chapterIndex,
      lessonIndex,
      chapterTitle: chapter.title,
      title: lesson[0],
      explanation: lesson[1],
      code: lesson[2],
    })),
  );
}
