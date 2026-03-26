require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Kiểm tra xem các biến môi trường có tồn tại không
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    console.error("❌ LỖI: Thiếu SUPABASE_URL hoặc SUPABASE_SECRET_KEY trong file .env");
    process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function test() {
    console.log("-----------------------------------------");
    console.log("Đang thử kết nối tới Supabase...");
    console.log("URL:", process.env.SUPABASE_URL);
    
    // Thử lấy dữ liệu từ bảng orders
    const { data, error } = await supabase.from('orders').select('*').limit(1);
    
    if (error) {
        console.error("❌ KẾT NỐI THẤT BẠI!");
        console.error("Mã lỗi:", error.code);
        console.error("Thông báo lỗi:", error.message);
        
        if (error.message.includes("Invalid API key")) {
            console.log("\n👉 GỢI Ý: Key 'SUPABASE_SECRET_KEY' trong file .env bị sai định dạng.");
            console.log("Hãy chắc chắn bạn đã dùng 'service_role secret' (chuỗi cực dài bắt đầu bằng eyJ...).");
        }
    } else {
        console.log("✅ KẾT NỐI THÀNH CÔNG!");
        console.log("Đã tìm thấy bảng 'orders' và kết nối ổn định.");
    }
    console.log("-----------------------------------------");
}

test();
