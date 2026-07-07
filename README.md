# 天氣查詢 Dashboard

依 `dashboard-ui-iphone17promax.png` 設計的單頁 HTML 天氣查詢工具，整合穿搭與美食推薦區塊。

## 線上版（iPhone / 手機建議）

**https://skytimmy612-dot.github.io/weather-dashboard-app/**

部署完成後，用 iPhone Safari 開啟上述網址即可。HTTPS 環境下定位功能可正常運作。

### iPhone 使用方式

1. Safari 開啟線上版網址
2. 點搜尋列左側定位圖示，允許使用位置
3. （可選）Safari 分享 → **加入主畫面**，像 App 一樣開啟

> **為什麼手機不能開 `http://127.0.0.1:8765`？**  
> `127.0.0.1` 永遠代表「這台裝置自己」。在電腦上指向電腦，在 iPhone 上指向 iPhone，無法連到你電腦上的 `start.bat`。

## 功能

- 查詢全球城市即時天氣（Open-Meteo API，免 API Key）
- 點定位圖示查詢目前位置天氣
- 顯示溫度、天氣描述、濕度
- 中午 / 下午 / 傍晚 / 晚上 四段預報
- 依天氣自動產生穿搭建議
- 附近美食推薦（示範資料，可點擊開啟 Google Maps）
- 記住上次查詢城市

## 電腦本機使用

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

## GitHub Pages 部署

Repo：https://github.com/skytimmy612-dot/weather-dashboard-app

### 推送程式碼

```bash
cd D:\weather-dashboard-app
git remote add origin https://github.com/skytimmy612-dot/weather-dashboard-app.git
git branch -M main
git push -u origin main
```

### 啟用 GitHub Pages

1. 進 repo → **Settings** → **Pages**
2. **Build and deployment** → Source 選 **Deploy from a branch**
3. Branch 選 `main`，資料夾選 **`/ (root)`**
4. 儲存後約 1～2 分鐘，網址為：

**https://skytimmy612-dot.github.io/weather-dashboard-app/**

## 同 WiFi 區網測試（替代方案）

若暫時不想用 GitHub Pages，可讓電腦伺服器綁定區網：

```bash
python -m http.server 8765 --bind 0.0.0.0
```

手機連**同一個 WiFi**，開 `http://192.168.x.x:8765`（電腦的區網 IP）。

限制：通常是 HTTP 不是 HTTPS，iOS 定位可能受限；長期給 iPhone 用建議 GitHub Pages。

## 檔案

| 檔案 | 說明 |
|------|------|
| `index.html` | 頁面結構 |
| `styles.css` | Dashboard UI 樣式 |
| `app.js` | 天氣查詢與畫面更新邏輯 |

## API

- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather](https://open-meteo.com/en/docs)
