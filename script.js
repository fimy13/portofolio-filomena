
// ==============================
// 1. MENU NAVIGASI MOBILE
// ==============================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

// Tutup menu setelah pengunjung memilih bagian halaman
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Tutup menu jika tombol Escape ditekan
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// ==============================
// 2. EFEK NAVBAR SAAT SCROLL
// ==============================
const header = document.querySelector(".header");
const backToTop = document.getElementById("backToTop");

function handleScroll() {
  header.classList.toggle("scrolled", window.scrollY > 20);
  backToTop.classList.toggle("visible", window.scrollY > 350);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ==============================
// 3. ANIMASI REVEAL
// Elemen muncul saat masuk layar
// ==============================
const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  // Fallback untuk browser lama atau pengguna yang mengurangi animasi
  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}

// ==============================
// 4. DETAIL PROYEK DALAM DIALOG
// ==============================
const projectDialog = document.getElementById("projectDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const dialogClose = document.getElementById("dialogClose");
const dialogOk = document.getElementById("dialogOk");

document.querySelectorAll(".project-detail").forEach((button) => {
  button.addEventListener("click", () => {
    // Ambil data dari atribut tombol
    dialogTitle.textContent = button.dataset.title;
    dialogDescription.textContent = button.dataset.description;

    // Tampilkan popup jika browser mendukung dialog
    if (typeof projectDialog.showModal === "function") {
      projectDialog.showModal();
    } else {
      alert(
        button.dataset.title + "\n\n" +
        button.dataset.description
      );
    }
  });
});

function closeProjectDialog() {
  if (projectDialog.open) {
    projectDialog.close();
  }
}

dialogClose.addEventListener("click", closeProjectDialog);
dialogOk.addEventListener("click", closeProjectDialog);

// Tutup jika pengguna mengklik area luar dialog
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    closeProjectDialog();
  }
});

// ==============================
// 5. VALIDASI FORMULIR KONTAK
// Form ini belum mengirim email
// ==============================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Pastikan semua data memenuhi syarat
  if (name.length < 2) {
    formStatus.textContent = "Nama harus terdiri dari minimal 2 karakter.";
    formStatus.style.color = "#A33F68";
    document.getElementById("name").focus();
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Periksa kembali format alamat email kamu.";
    formStatus.style.color = "#A33F68";
    document.getElementById("email").focus();
    return;
  }

  if (message.length < 5) {
    formStatus.textContent = "Pesan harus terdiri dari minimal 5 karakter.";
    formStatus.style.color = "#A33F68";
    document.getElementById("message").focus();
    return;
  }

  // Tampilkan konfirmasi demo, tanpa mengirim data ke server
  formStatus.textContent =
    "Terima kasih, " + name +
    "! Formulir berhasil diperiksa. Pesan belum dikirim ke email.";
  formStatus.style.color = "#477B60";

  contactForm.reset();
});

// ==============================
// 6. TAHUN FOOTER OTOMATIS
// ==============================
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// ==============================
// 7. NAVIGASI AKTIF SESUAI BAGIAN
// ==============================
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === "#" + entry.target.id;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}


// ==============================
/* 8. FITUR TAMBAHAN: TEMA, MUSIK, DAN BAHASA
   Ditambahkan di akhir file agar fitur lama tetap dipertahankan. */
// ==============================
(() => {
  const themeToggle = document.getElementById("themeToggle");
  const languageSelect = document.getElementById("languageSelect");
  const musicToggle = document.getElementById("musicToggle");
  const musicStatus = document.getElementById("musicStatus");
  const musicPlayer = document.getElementById("musicPlayer");
  const audio = document.getElementById("portfolioMusic");

  // --- Dark Mode / Light Mode ---
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  function applyTheme(theme, saveChoice = false) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (themeIcon) {
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    if (themeToggle) {
      const label = isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap";
      themeToggle.setAttribute("aria-label", label);
      themeToggle.title = label;
    }
    if (saveChoice) {
      try { localStorage.setItem("filomena-theme", theme); } catch (error) {}
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("filomena-theme"); } catch (error) {}
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  // --- Pemutar musik: lima lagu, hanya mulai setelah pengunjung menekan tombol ---
  // Sesuaikan folder, nama file, dan daftar ekstensi di bawah ini jika perlu.
  // Ekstensi dicoba berurutan sampai file ditemukan (mis. song1.mp3 -> song1.m4a ...).
  const MUSIC_FOLDER = "audio/";
  const MUSIC_TRACKS = ["song1", "song2", "song3", "song4", "song5"];
  const MUSIC_EXTENSIONS = ["mp3", "m4a", "ogg", "wav"];

  const musicPrev = document.getElementById("musicPrev");
  const musicNext = document.getElementById("musicNext");

  const musicText = {
    id: { play: "Putar musik", pause: "Jeda musik", playing: "Musik sedang diputar", paused: "Musik dijeda", unavailable: "Lagu gagal dimuat. Periksa file di folder audio/", prev: "Lagu sebelumnya", next: "Lagu berikutnya" },
    en: { play: "Play music", pause: "Pause music", playing: "Music is playing", paused: "Music is paused", unavailable: "Song failed to load. Check the files in audio/", prev: "Previous song", next: "Next song" }
  };

  let trackIndex = 0;
  let extensionIndex = 0;
  let wantsToPlay = false;

  function currentLanguage() {
    return languageSelect && languageSelect.value === "en" ? "en" : "id";
  }
  function updateMusicLabels(state) {
    if (!musicToggle || !musicStatus) return;
    const words = musicText[currentLanguage()];
    const playing = state === "playing";
    const icon = musicToggle.querySelector("i");
    if (icon) icon.className = playing ? "fa-solid fa-pause" : "fa-solid fa-play";
    const label = musicToggle.querySelector("[data-i18n='playMusic']");
    if (label) label.textContent = playing ? words.pause : words.play;
    const trackInfo = " (" + (trackIndex + 1) + "/" + MUSIC_TRACKS.length + ")";
    musicStatus.textContent = state === "unavailable" ? words.unavailable + trackInfo : (playing ? words.playing : words.paused) + trackInfo;
    musicToggle.setAttribute("aria-pressed", String(playing));
    if (musicPrev) { musicPrev.setAttribute("aria-label", words.prev); musicPrev.title = words.prev; }
    if (musicNext) { musicNext.setAttribute("aria-label", words.next); musicNext.title = words.next; }
    if (musicPlayer) musicPlayer.classList.toggle("is-playing", playing);
  }

  function setTrackSource() {
    audio.src = MUSIC_FOLDER + MUSIC_TRACKS[trackIndex] + "." + MUSIC_EXTENSIONS[extensionIndex];
  }

  async function startPlayback() {
    try {
      await audio.play();
    } catch (error) {
      // AbortError: lagu diganti saat memuat; kegagalan file ditangani oleh event "error"
      if (error && error.name === "NotAllowedError") {
        wantsToPlay = false;
        updateMusicLabels("paused");
      }
    }
  }

  function goToTrack(index, autoplay) {
    trackIndex = (index + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    extensionIndex = 0;
    wantsToPlay = autoplay;
    audio.pause();
    setTrackSource();
    if (autoplay) startPlayback();
    else updateMusicLabels("paused");
  }

  if (musicToggle && audio) {
    // Lagu pertama hanya disiapkan, tidak diputar (preload="none", tanpa autoplay)
    setTrackSource();

    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        wantsToPlay = true;
        startPlayback();
      } else {
        wantsToPlay = false;
        audio.pause();
      }
    });
    if (musicPrev) musicPrev.addEventListener("click", () => goToTrack(trackIndex - 1, wantsToPlay || !audio.paused));
    if (musicNext) musicNext.addEventListener("click", () => goToTrack(trackIndex + 1, wantsToPlay || !audio.paused));

    audio.addEventListener("play", () => updateMusicLabels("playing"));
    audio.addEventListener("pause", () => { if (!audio.ended) updateMusicLabels("paused"); });
    audio.addEventListener("ended", () => goToTrack(trackIndex + 1, true));
    audio.addEventListener("error", () => {
      // Coba ekstensi berikutnya untuk lagu yang sama; jika habis, tampilkan gagal dimuat
      if (extensionIndex < MUSIC_EXTENSIONS.length - 1) {
        extensionIndex += 1;
        setTrackSource();
        if (wantsToPlay) startPlayback();
      } else {
        wantsToPlay = false;
        updateMusicLabels("unavailable");
      }
    });
    updateMusicLabels("paused");
  }

  // --- Terjemahan antarmuka Indonesia / Inggris ---
  // Konten yang tidak tercantum di sini dibiarkan tetap utuh.
  const translations = {
    id: {
      navHome: "Home", navAbout: "About Me", navEducation: "Education",
      navSkills: "Skills", navProjects: "Projects", navHobbies: "Hobbies",
      navContact: "Contact", heroEyebrow: "WELCOME TO MY LITTLE SPACE ✨",
      heroGreeting: "Halo, saya", heroSubtitle: "Informatics Student & Creative Learner",
      heroDescription: "Mahasiswa Teknik Informatika yang senang belajar, berkreasi, dan mengembangkan ide menjadi karya digital. Saya terus mengeksplorasi dunia pemrograman dan teknologi.",
      exploreProjects: "Jelajahi Proyek ↗", meetMe: "Kenali Saya",
      learningStatus: "Sedang belajar dan terus berkembang",
      scrollHint: "Scroll untuk mengenal saya ↓", aboutHeading: "Mengenal",
      aboutIntro: "Teknologi, kreativitas, dan perjalanan belajar saya.",
      hobbiesIntro: "Hal sederhana yang membuat hari-hari saya lebih berwarna.",
      danceTitle: "Menari", cookingTitle: "Memasak",
      playMusic: "Putar musik", musicPaused: "Musik dijeda"
    },
    en: {
      navHome: "Home", navAbout: "About Me", navEducation: "Education",
      navSkills: "Skills", navProjects: "Projects", navHobbies: "Hobbies",
      navContact: "Contact", heroEyebrow: "WELCOME TO MY LITTLE SPACE ✨",
      heroGreeting: "Hello, I'm", heroSubtitle: "Informatics Student & Creative Learner",
      heroDescription: "An Informatics student who enjoys learning, creating, and turning ideas into digital work. I continue exploring programming and technology.",
      exploreProjects: "Explore Projects ↗", meetMe: "Get to Know Me",
      learningStatus: "Learning and growing every day",
      scrollHint: "Scroll to get to know me ↓", aboutHeading: "Meet",
      aboutIntro: "Technology, creativity, and my learning journey.",
      hobbiesIntro: "Little things that make my days more colorful.",
      danceTitle: "Dancing", cookingTitle: "Cooking",
      playMusic: "Play music", musicPaused: "Music is paused"
    }
  };

  function applyLanguage(language, saveChoice = false) {
    const dictionary = translations[language] || translations.id;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key]) element.textContent = dictionary[key];
    });
    if (languageSelect) languageSelect.value = language;
    if (saveChoice) {
      try { localStorage.setItem("filomena-language", language); } catch (error) {}
    }
    if (audio && musicStatus) {
      if (audio.error && extensionIndex >= MUSIC_EXTENSIONS.length - 1) updateMusicLabels("unavailable");
      else updateMusicLabels(audio.paused ? "paused" : "playing");
    }
  }

  let savedLanguage = "id";
  try { savedLanguage = localStorage.getItem("filomena-language") || "id"; } catch (error) {}
  applyLanguage(savedLanguage === "en" ? "en" : "id");

  if (languageSelect) {
    languageSelect.addEventListener("change", () => applyLanguage(languageSelect.value, true));
  }
})();
