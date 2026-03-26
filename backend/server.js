require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(bodyParser.json());

// Middleware kiểm tra Admin Token
const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Truy cập bị từ chối!' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token không hợp lệ!' });
    }
};

// API: POST /api/login - Đăng nhập Admin
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu!' });
});

// API: POST /api/orders - Đặt hàng (Công khai)
app.post('/api/orders', async (req, res) => {
    const { name, phone, service } = req.body;
    const { data, error } = await supabase.from('orders').insert([{ name, phone, service }]).select();
    if (error) {
        console.error('LỖI KHI ĐẶT HÀNG:', error.message);
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
});

// API: GET /api/orders - Lấy đơn hàng (CHỈ ADMIN)
app.get('/api/orders', authenticateAdmin, async (req, res) => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error('LỖI KHI LẤY DỮ LIỆU ADMIN:', error.message); // In lỗi ra Terminal
        return res.status(500).json({ error: error.message });
    }
    console.log('Lấy dữ liệu thành công, số lượng đơn:', data.length);
    res.json(data);
});

// API: DELETE /api/orders/:id - Xóa đơn hàng (CHỈ ADMIN)
app.delete('/api/orders/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Xóa thành công!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
