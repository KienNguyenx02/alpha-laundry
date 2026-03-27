const API_URL = 'http://localhost:3000/api/orders';

// Kiểm tra nếu chưa đăng nhập thì đẩy ra trang Login
const token = localStorage.getItem('adminToken');
if (!token) {
    window.location.href = 'login.html';
}

// Hàm lấy danh sách đơn hàng
async function fetchOrders() {
    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('adminToken');
            window.location.href = 'login.html';
            return;
        }

        const orders = await response.json();
        const tableBody = document.getElementById('orders-table-body');
        tableBody.innerHTML = '';

        orders.forEach(order => {
            const date = new Date(order.created_at).toLocaleString('vi-VN');
            tableBody.innerHTML += `
                <tr>
                    <td>${date}</td>
                    <td>${order.name}</td>
                    <td>${order.phone}</td>
                    <td>${order.service}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteOrder('${order.id}')">Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        alert('Lỗi khi tải dữ liệu!');
    }
}

// Hàm xóa đơn hàng
async function deleteOrder(id) {
    if (!confirm('Xóa đơn hàng này?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            fetchOrders();
        } else {
            alert('Lỗi khi xóa!');
        }
    } catch (err) {
        console.error(err);
    }
}

// Nút Đăng xuất
function logout() {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
}

window.onload = fetchOrders;
