// Danh sách dịch vụ để render
const laundryServices = [
    { name: "Quần Jeans", price: "50.000đ", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format" },
    { name: "Áo Sơ Mi", price: "40.000đ", img: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&auto=format" },
    { name: "Áo Khoác", price: "120.000đ", img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format" },
    { name: "Áo Thun", price: "30.000đ", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format" },
    { name: "Váy Đầm", price: "60.000đ", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format" },
    { name: "Chăn Mền", price: "80.000đ", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format" },
    { name: "Giày Thể Thao", price: "70.000đ", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format" },
    { name: "Rèm Cửa", price: "150.000đ", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format" }
];

const servicesGrid = document.getElementById('services-grid');
const serviceSelect = document.getElementById('service-select');
const bookingForm = document.getElementById('booking-form');

let selectedService = "";

// Lấy service từ URL nếu có
const urlParams = new URLSearchParams(window.location.search);
const initialService = urlParams.get('service');

// Hàm render danh sách dịch vụ và nạp dữ liệu vào Select Box
function initPage() {
    servicesGrid.innerHTML = '';
    serviceSelect.innerHTML = '<option value="">-- Chọn dịch vụ --</option>';

    laundryServices.forEach(s => {
        // Render thẻ Grid
        const isActive = s.name === (selectedService || initialService);
        if (isActive) {
            selectedService = s.name;
        }

        const item = document.createElement('div');
        item.className = `service-item ${isActive ? 'active' : ''}`;
        item.setAttribute('data-name', s.name);
        item.innerHTML = `
            <img src="${s.img}" alt="${s.name}">
            <h4>${s.name}</h4>
            <p class="price">${s.price}</p>
        `;
        item.onclick = () => updateSelection(s.name);
        servicesGrid.appendChild(item);

        // Render Option cho Select Box
        const option = document.createElement('option');
        option.value = s.name;
        option.text = s.name;
        if (isActive) option.selected = true;
        serviceSelect.appendChild(option);
    });
}

// Hàm cập nhật khi có thay đổi (từ Grid hoặc từ Select Box)
function updateSelection(name) {
    selectedService = name;
    
    // Cập nhật Select Box
    serviceSelect.value = name;

    // Cập nhật giao diện Grid
    document.querySelectorAll('.service-item').forEach(el => {
        if (el.getAttribute('data-name') === name) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Lắng nghe sự thay đổi từ Select Box
serviceSelect.addEventListener('change', (e) => {
    updateSelection(e.target.value);
});

// Gửi đơn hàng
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!selectedService) {
        alert("Vui lòng chọn một dịch vụ!");
        return;
    }
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, service: selectedService })
        });
        if (response.ok) {
            alert(`Thành công! ThanhTruc sẽ gọi cho ${name} sớm nhất.`);
            window.location.href = 'index.html';
        }
    } catch (err) {
        alert('Lỗi kết nối Server!');
    }
});

initPage();
