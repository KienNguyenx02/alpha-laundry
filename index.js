// Xử lý chọn dịch vụ bằng cách click
const serviceCards = document.querySelectorAll('.service-card');
const selectedCountSpan = document.querySelector('#selected-count');
const bookNowBtn = document.querySelector('#book-now-btn');

let selectedServices = 0;

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle class selected
        card.classList.toggle('selected');
        
        // Cập nhật nút bấm
        const btn = card.querySelector('.select-btn');
        if (card.classList.contains('selected')) {
            btn.textContent = 'Đã chọn';
            selectedServices++;
        } else {
            btn.textContent = 'Chọn ngay';
            selectedServices--;
        }
        
        // Cập nhật số lượng hiển thị
        selectedCountSpan.textContent = selectedServices;
    });
});

// Nút gửi yêu cầu
bookNowBtn.addEventListener('click', () => {
    if (selectedServices > 0) {
        alert(`Cảm ơn bạn! Bạn đã chọn ${selectedServices} dịch vụ. Chúng tôi sẽ liên hệ để xác nhận ngay!`);
        // Có thể cuộn xuống phần Liên hệ để khách để lại SĐT
        document.querySelector('#contact-us').scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Vui lòng chọn ít nhất một dịch vụ!');
    }
});

// Xử lý cuộn mượt cho thanh điều hướng
const navLinks = document.querySelector('.topnav').children;

for (const navLink of navLinks) {
    navLink.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = navLink.getAttribute('href');

        if (sectionId && sectionId.startsWith('#')) {
            const target = document.querySelector(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

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
