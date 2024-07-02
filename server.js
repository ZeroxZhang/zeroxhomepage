const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// 访问计数文件路径
const countFilePath = path.join(__dirname, 'count.json');

// 增加访问量并返回当前访问量
app.get('/api/visit', (req, res) => {
    let count = 0;
    // 读取现有的计数
    if (fs.existsSync(countFilePath)) {
        const data = fs.readFileSync(countFilePath);
        const json = JSON.parse(data);
        count = json.count;
    }

    // 增加访问量
    count += 1;

    // 保存新的计数
    fs.writeFileSync(countFilePath, JSON.stringify({ count }));

    res.json({ count });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});