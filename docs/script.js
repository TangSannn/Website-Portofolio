// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// ===== ANIMASI PROGRESS BAR SKILLS =====
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                const progress = progressFill.getAttribute('data-progress');
                
                // Animasi progress bar saat terlihat
                setTimeout(() => {
                    progressFill.style.width = progress + '%';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Jalankan animasi skills
if (document.querySelector('.skills-section')) {
    animateSkills();
}

// ===== VALIDASI FORM =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const layanan = document.getElementById('layanan').value;
        const budget = document.querySelector('input[name="budget"]:checked');
        const deskripsi = document.getElementById('deskripsi').value;
        const timeline = document.getElementById('timeline').value;
        const agreement = document.querySelector('input[name="agreement"]');
        
        // Validasi field wajib
        if (!nama || !email || !layanan || !budget || !deskripsi || !timeline) {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Validasi checkbox persetujuan
        if (!agreement.checked) {
            alert('Anda harus menyetujui persetujuan terlebih dahulu!');
            return;
        }
        
        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Jika validasi berhasil
        alert('Terima kasih! Request Anda telah dikirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        contactForm.reset();
        
        // Log data (untuk testing)
        console.log('Form berhasil dikirim!');
    });
    
    // Validasi nomor telepon (hanya angka)
    const phoneInput = document.getElementById('telepon');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 13) {
                this.value = this.value.slice(0, 13);
            }
        });
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #fff 0%, #b3b3b3 100%);
    color: #0a0a0a;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(scrollBtn);

// Tampilkan tombol saat scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

// Scroll ke atas saat diklik
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});