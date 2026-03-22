// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Xử lý chọn dịch vụ bằng cách click (Giữ nguyên logic cũ)
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
});

// Nút gửi yêu cầu (Giữ nguyên logic cũ)
const bookNowBtn = document.querySelector('#book-now-btn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', () => {
        alert(`Vui lòng nhấn vào biểu tượng Zalo hoặc gọi Hotline ở góc màn hình để gửi yêu cầu cho chúng tôi!`);
    });
}

// Xử lý cuộn mượt cho thanh điều hướng mới
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Câu hỏi thường gặp
const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    question.addEventListener('click', () => {
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        if (answer) {
            answer.classList.toggle('active');
        }
    });
});
