# 天氣查詢 Dashboard

依 `dashboard-ui-iphone17promax.png` 設計的單頁 HTML 天氣查詢工具，整合穿搭與美食推薦區塊。

## 功能

- 查詢全球城市即時天氣（Open-Meteo API，免 API Key）
- 顯示溫度、天氣描述、濕度
- 中午 / 下午 / 傍晚 / 晚上 四段預報
- 依天氣自動產生穿搭建議
- 附近美食推薦（示範資料）
- 記住上次查詢城市

## 使用方式

直接用瀏覽器開啟 `index.html` 可能無法載入天氣資料。**建議使用本機伺服器**：

### 方法一（建議）
雙擊 **`start.bat`**，會啟動伺服器並自動開啟瀏覽器：

**http://127.0.0.1:8765**

> 若之前用 8080 連不上，請關閉舊的黑色 cmd 視窗後再執行 start.bat。

### 方法二（免伺服器）
雙擊 **`open.bat`** 直接開啟頁面（多數情況下也可查詢天氣）。

### 方法三（手動）
```bash
cd D:\weather-dashboard-app
python -m http.server 8765 --bind 127.0.0.1
```

瀏覽 **http://127.0.0.1:8765**

在頂部搜尋列輸入城市後按 **查詢**，例如：台北市、高雄、東京。

## 檔案

| 檔案 | 說明 |
|------|------|
| `index.html` | 頁面結構 |
| `styles.css` | Dashboard UI 樣式 |
| `app.js` | 天氣查詢與畫面更新邏輯 |

## API

- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather](https://open-meteo.com/en/docs)
