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
- 顯示溫度、天氣描述、濕度、體感溫度、風速、UV 指數
- 中午 / 下午 / 傍晚 / 晚上 四段預報
- 未來 5 日天氣預報
- 降雨 / 帶傘提醒（依即時天氣與降雨機率）
- 多城市收藏（最多 5 個，快速切換）
- 依天氣自動產生穿搭建議
- 附近美食推薦（Google Places API，4 顆星以上真實餐廳）
- 記住上次查詢城市

## Google Places API Key 設定

美食推薦需要 **Google Places API (New)** Key。

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

> 線上版 `config.js` 由 Actions 自動產生，不會出現在 Git 仓库中。

瀏覽 **http://127.0.0.1:8765**（一定要含 **:8765**，只開 `127.0.0.1` 會失敗）

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

瀏覽 **http://127.0.0.1:8765**

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
| `app.js` | 天氣查詢與畫面更新邏輯 |
| `config.js` | 本機 API Key（手動建立，不提交） |
| `.github/workflows/pages.yml` | GitHub Pages 自動部署 |

## API

- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather](https://open-meteo.com/en/docs)
- [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service/overview)
