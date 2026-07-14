# 天氣查詢 Dashboard

依 `dashboard-ui-iphone17promax.png` 設計的單頁 HTML 天氣查詢工具，整合穿搭、美食／景點推薦與旅遊行程摘要。

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

### 天氣

- 查詢全球城市即時天氣（Open-Meteo，免 API Key）
- 定位查詢目前位置天氣
- 顯示溫度、天氣描述、濕度、體感溫度、風向／風速、UV 指數、日出／日落
- **空氣品質**：US AQI、PM2.5 與簡短外出建議（Open-Meteo Air Quality）
- **匯率**：天氣卡上方小卡片，依查詢地國家顯示當地貨幣與新台幣雙向匯率（台灣標示當地為新台幣）
- **24 小時**時段預報（橫向捲動：溫度、天氣圖示、降雨機率）
- **5／7／16 日**每日預報切換（偏好存 localStorage；一次取滿 16 天資料）
- 降雨／帶傘提醒
- 天氣動畫（晴天光暈、雨滴、雪花、雷雨、飄雲）
- 依**查詢地當地時間**切換日間／夜間外觀（國外城市不跟台灣時區）
- 依**體感溫度**與天氣自動產生穿搭建議

### 搜尋與收藏

- 城市搜尋**自動完成**（Open-Meteo + Photon + 可選 Google Places；debounce 下拉建議）
- **最近搜尋**歷史（最多 10 筆，不含已收藏；搜尋框清空後 focus 可點選重查）
- 多城市收藏（最多 5 個；chip 顯示即時溫度與天氣圖示，一鍵切換）
- 記住上次查詢城市
- **收藏店家**（美食／景點，最多 20 間，獨立於城市收藏）

### 美食與景點（需 Google Places API Key）

- 附近 4 顆星以上餐廳／景點推薦
- 美食可篩選「**營業中**」
- 點擊開啟 Google Maps；列表可星號收藏

### 旅遊模式

- 搜尋列輸入如 `7/10-7/15 沖繩` 或 `7/25~/7/27 嘉義`
- 逐日行程摘要：天氣、穿搭、美食、景點
- 行程天數在預報範圍內時，每日預報自動展開
- 超出 Open-Meteo 可預報範圍（自今天起最多 16 天）時顯示明確提示
- 旅遊模式下「分享」可輸出完整行程文字；一般模式分享即時天氣
- **行程匯出**：可複製 Markdown，或匯出 PNG 行程圖

### 其他

- **深色模式**：預設跟隨系統，可手動切換（偏好存 localStorage）
- **下拉重新整理**：頁面頂部下拉可重跑天氣與附近推薦（旅遊模式則重算行程）
- PWA：可加入主畫面、支援離線開啟殼層
- 底部導覽（天氣／穿搭／美食／景點）

## Google Places API Key 設定

美食、景點推薦與（有 Key 時）地名混合搜尋需要 **Google Places API (New)** Key。

### 本機開發

在專案根目錄**手動建立** `config.js`（此檔不會提交到 GitHub）：

```javascript
window.APP_CONFIG = {
  GOOGLE_PLACES_API_KEY: "你的_API_Key",
};
```

> `config.js` 已加入 `.gitignore`，不會被提交到 GitHub。

### Google Cloud 限制（建議）

在 [Google Cloud Console](https://console.cloud.google.com/) → Credentials → 你的 API Key：

**HTTP referrers：**

```text
https://skytimmy612-dot.github.io/*
http://127.0.0.1:8765/*
http://localhost:8765/*
```

**API restrictions：** 只勾選 **Places API (New)**

### GitHub Pages 部署（線上版）

1. Repo → **Settings** → **Secrets and variables** → **Actions**
2. 新增 Secret：`GOOGLE_PLACES_API_KEY`（值為你的 API Key）
3. Repo → **Settings** → **Pages** → Source 選 **GitHub Actions**
4. push 到 `main` 後，Actions 會在 `site/` 資料夾產生 `config.js` 並部署

> 線上版 `config.js` 由 Actions 自動產生，不會出現在 Git 倉庫中。

### 本機測試常見問題

| 錯誤 | 原因 | 解法 |
|------|------|------|
| `ERR_EMPTY_RESPONSE` | 網址少了埠號，或伺服器未啟動 | 用 `http://127.0.0.1:8765/`，雙擊 `start.bat` |
| 美食無法載入 | 沒有 `config.js` | 手動建立 `config.js` 並填入 Key |
| 埠號被占用 | 舊的 cmd 視窗還在跑 | 關閉舊視窗後重開 `start.bat`（會自動清理） |

## 電腦本機使用

直接用瀏覽器開啟 `index.html` 可能無法載入天氣資料。**建議使用本機伺服器**：

### 方法一（建議）

雙擊 **`start.bat`**，會啟動伺服器並自動開啟瀏覽器：

**http://127.0.0.1:8765**

### 方法二（免伺服器）

雙擊 **`open.bat`** 直接開啟頁面（需有 `config.js` 才能載入美食）。

### 方法三（手動）

```bash
cd D:\weather-dashboard-app
python -m http.server 8765 --bind 127.0.0.1
```

瀏覽 **http://127.0.0.1:8765**（一定要含 **:8765**）

## GitHub Pages 部署

Repo：https://github.com/skytimmy612-dot/weather-dashboard-app

```bash
cd D:\weather-dashboard-app
git push origin main
```

線上網址：**https://skytimmy612-dot.github.io/weather-dashboard-app/**

## 檔案

| 檔案 | 說明 |
|------|------|
| `index.html` | 頁面結構 |
| `styles.css` | Dashboard UI 樣式 |
| `app.js` | 天氣查詢、旅遊模式、Places 與畫面邏輯 |
| `sw.js` | Service Worker（PWA） |
| `manifest.json` | PWA manifest |
| `config.js` | 本機 API Key（手動建立，不提交） |
| `config.example.js` | API Key 範例 |
| `start.bat` / `open.bat` | 本機啟動捷徑 |
| `.github/workflows/pages.yml` | GitHub Pages 自動部署 |

## API

| 用途 | 服務 |
|------|------|
| 天氣／地理編碼 | [Open-Meteo Weather](https://open-meteo.com/en/docs)、[Geocoding](https://open-meteo.com/en/docs/geocoding-api) |
| 空氣品質 | [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api) |
| 匯率（相對 TWD） | [ExchangeRate-API Open Access](https://www.exchangerate-api.com/docs/free)（`open.er-api.com`，免 Key） |
| 地名 fallback | [Photon](https://photon.komoot.io/)（OpenStreetMap） |
| 反向地理編碼 | [BigDataCloud](https://www.bigdatacloud.com/docs/api/free-reverse-geocode-to-city-api) |
| 美食／景點／地名輔助 | [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service/overview) |
