const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const PHOTON_API = "https://photon.komoot.io/api/";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const WEATHER_FALLBACK_API = "https://wttr.in";
const AIR_QUALITY_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const FX_API = "https://open.er-api.com/v6/latest/TWD";
const REVERSE_GEO_API = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const PLACES_API = "https://places.googleapis.com/v1/places:searchText";

const MIN_FOOD_RATING = 4.0;
const MIN_FOOD_RATING_COUNT = 5;
const MIN_SIGHT_RATING = 4.0;
const MIN_SIGHT_RATING_COUNT = 5;
const FOOD_SEARCH_RADIUS = 12000;
const PLACES_FILTER_RADIUS = 15000;
const DISTRICT_SEARCH_RADIUS = 15000;
const DISTRICT_FILTER_RADIUS = 15000;
const PLACES_CACHE_TTL_MS = 30 * 60 * 1000;
const GEOCODE_CACHE_TTL_MS = 10 * 60 * 1000;
const PLACES_MAX_RESULTS = 20;

const STORAGE_KEY = "weather-dashboard-city";
const FAVORITES_KEY = "weather-dashboard-favorites";
const PLACE_FAVORITES_KEY = "weather-dashboard-place-favorites";
const FORECAST_DAYS_KEY = "weather-dashboard-forecast-days";
const THEME_KEY = "weather-dashboard-theme";
const HISTORY_KEY = "weather-dashboard-search-history";
const MAX_FAVORITES = 5;
const MAX_PLACE_FAVORITES = 20;
const MAX_HISTORY = 10;
const MAX_FORECAST_DAYS = 16;
const DEFAULT_DAILY_DISPLAY = 5;
const DAILY_DISPLAY_OPTIONS = [5, 7, 16];
const MAX_TRIP_DAYS = 16;
const TRAVEL_DATE_PATTERN =
  /(\d{1,2})\s*[\/／]\s*(\d{1,2})\s*[-–—〜～~－至到]\s*\/?\s*(\d{1,2})\s*[\/／]\s*(\d{1,2})/;
const AUTOCOMPLETE_DEBOUNCE_MS = 300;
const AUTOCOMPLETE_MIN_LEN = 1;
const AUTOCOMPLETE_MAX = 5;

const WEATHER_TEXT = {
  0: "晴朗",
  1: "大致晴朗",
  2: "局部多雲",
  3: "多雲",
  45: "霧",
  48: "霧凇",
  51: "毛毛雨",
  53: "毛毛雨",
  55: "毛毛雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  80: "陣雨",
  81: "陣雨",
  82: "豪雨",
  95: "雷雨",
  96: "雷雨伴冰雹",
  99: "強雷雨伴冰雹",
};

const CITY_ALIASES = {
  台北: "台北市",
  台中: "台中市",
  台南: "台南市",
  新北: "新北市",
  桃園: "桃園市",
  基隆: "基隆市",
  新竹: "新竹市",
  嘉義: "嘉義市",
  彰化: "彰化市",
  屏東: "屏東縣",
  宜蘭: "宜蘭縣",
  花蓮: "花蓮縣",
  台東: "台東縣",
  苗栗: "苗栗縣",
  南投: "南投縣",
  雲林: "雲林縣",
  澎湖: "澎湖縣",
  金門: "金門縣",
  連江: "連江縣",
};

// 中文地名在 Open-Meteo 常查不到，對應英文搜尋詞
const PLACE_ALIASES = {
  冰島: "Iceland",
  首爾: "Seoul",
  韓國: "South Korea",
  日本: "Japan",
  美國: "United States",
  英國: "United Kingdom",
  法國: "France",
  德國: "Germany",
  澳洲: "Australia",
  澳大利亞: "Australia",
  紐西蘭: "New Zealand",
  泰國: "Thailand",
  越南: "Vietnam",
  印尼: "Indonesia",
  印度: "India",
  馬來西亞: "Malaysia",
  新加坡: "Singapore",
  菲律賓: "Philippines",
  加拿大: "Canada",
  河內: "Hanoi",
  胡志明: "Ho Chi Minh City",
  胡志明市: "Ho Chi Minh City",
  杜拜: "Dubai",
  雪梨: "Sydney",
  墨爾本: "Melbourne",
  巴黎: "Paris",
  倫敦: "London",
  紐約: "New York",
  洛杉磯: "Los Angeles",
  舊金山: "San Francisco",
  西雅圖: "Seattle",
  芝加哥: "Chicago",
  夏威夷: "Honolulu",
  溫哥華: "Vancouver",
  多倫多: "Toronto",
  莫斯科: "Moscow",
  柏林: "Berlin",
  羅馬: "Rome",
  馬德里: "Madrid",
  阿姆斯特丹: "Amsterdam",
  雷克雅維克: "Reykjavik",
  沖縄: "Naha",
  沖繩: "Naha",
  冲绳: "Naha",
  那霸: "Naha",
  那霸市: "Naha",
  那覇: "Naha",
  北海道: "Hokkaido",
  京都: "Kyoto",
  大阪: "Osaka",
  福岡: "Fukuoka",
  名古屋: "Nagoya",
  札幌: "Sapporo",
  神戶: "Kobe",
  神戸: "Kobe",
  橫濱: "Yokohama",
  横浜: "Yokohama",
  仙台: "Sendai",
  廣島: "Hiroshima",
  長崎: "Nagasaki",
  奈良: "Nara",
  釜山: "Busan",
  濟州: "Jeju",
  曼谷: "Bangkok",
  清邁: "Chiang Mai",
  峇里島: "Bali",
  峇厘島: "Bali",
  吉隆坡: "Kuala Lumpur",
};

const DEFAULT_CITY = "台北市";

const FALLBACK_CITIES = {
  台北市: { name: "台北市", latitude: 25.033, longitude: 121.5654 },
  台北: { name: "台北市", latitude: 25.033, longitude: 121.5654 },
  基隆市: { name: "基隆市", latitude: 25.1282, longitude: 121.7443 },
  基隆: { name: "基隆市", latitude: 25.1282, longitude: 121.7443 },
  汐止區: { name: "汐止區", latitude: 25.068, longitude: 121.662 },
  汐止: { name: "汐止區", latitude: 25.068, longitude: 121.662 },
  高雄: { name: "高雄", latitude: 22.6273, longitude: 120.3014 },
  台中市: { name: "台中市", latitude: 24.1477, longitude: 120.6736 },
  台南市: { name: "台南市", latitude: 22.9999, longitude: 120.2269 },
};

const OVERSEAS_FALLBACK_CITIES = {
  那霸: { name: "那霸", latitude: 26.2124, longitude: 127.6809, region: "日本・沖繩", countryCode: "JP" },
  那覇: { name: "那霸", latitude: 26.2124, longitude: 127.6809, region: "日本・沖繩", countryCode: "JP" },
  Naha: { name: "那霸", latitude: 26.2124, longitude: 127.6809, region: "日本・沖繩", countryCode: "JP" },
  沖繩: { name: "那霸", latitude: 26.2124, longitude: 127.6809, region: "日本・沖繩", countryCode: "JP" },
  沖縄: { name: "那霸", latitude: 26.2124, longitude: 127.6809, region: "日本・沖繩", countryCode: "JP" },
};

/** ISO 3166-1 alpha-2 → ISO 4217 */
const COUNTRY_CURRENCY = {
  TW: "TWD",
  JP: "JPY",
  US: "USD",
  CN: "CNY",
  HK: "HKD",
  MO: "MOP",
  KR: "KRW",
  GB: "GBP",
  AU: "AUD",
  NZ: "NZD",
  CA: "CAD",
  SG: "SGD",
  MY: "MYR",
  TH: "THB",
  VN: "VND",
  PH: "PHP",
  ID: "IDR",
  IN: "INR",
  AE: "AED",
  SA: "SAR",
  TR: "TRY",
  RU: "RUB",
  BR: "BRL",
  MX: "MXN",
  CH: "CHF",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  CZ: "CZK",
  HU: "HUF",
  IS: "ISK",
  ZA: "ZAR",
  AT: "EUR",
  BE: "EUR",
  DE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LU: "EUR",
  NL: "EUR",
  PT: "EUR",
  SK: "EUR",
  SI: "EUR",
  EE: "EUR",
  LV: "EUR",
  LT: "EUR",
  MT: "EUR",
  CY: "EUR",
  HR: "EUR",
};

const OKINAWA_SEARCH_TERMS = new Set([
  "Naha",
  "那霸",
  "那覇",
  "沖繩",
  "沖縄",
  "冲绳",
  "Okinawa",
]);

const $ = (id) => document.getElementById(id);

const els = {
  cityInput: $("cityInput"),
  citySuggestions: $("citySuggestions"),
  searchForm: $("searchForm"),
  searchHint: $("searchHint"),
  currentTemp: $("currentTemp"),
  weatherDesc: $("weatherDesc"),
  weatherExtras: $("weatherExtras"),
  weatherAqi: $("weatherAqi"),
  weatherRate: $("weatherRate"),
  rateCard: $("rateCard"),
  weatherSun: $("weatherSun"),
  weatherIcon: $("weatherIcon"),
  weatherFx: $("weatherFx"),
  shareBtn: $("shareBtn"),
  rainAlert: $("rainAlert"),
  favoriteBtn: $("favoriteBtn"),
  themeBtn: $("themeBtn"),
  favoriteChips: $("favoriteChips"),
  hourlyForecast: $("hourlyForecast"),
  dailyForecast: $("dailyForecast"),
  dailyTitle: $("dailyTitle"),
  forecastToggle: document.querySelector(".forecast-toggle"),
  outfitGrid: $("outfitGrid"),
  foodList: $("foodList"),
  viewAllFood: $("viewAllFood"),
  openNowFood: $("openNowFood"),
  sightList: $("sightList"),
  viewAllSights: $("viewAllSights"),
  placeFavoritesCard: $("placeFavoritesCard"),
  placeFavoritesList: $("placeFavoritesList"),
  loading: $("loading"),
  error: $("error"),
  pullRefresh: $("pullRefresh"),
  travelSummary: $("travelSummary"),
  travelDays: $("travelDays"),
  travelTitle: $("travelTitle"),
  exportMarkdownBtn: $("exportMarkdownBtn"),
  exportImageBtn: $("exportImageBtn"),
  locateBtn: $("locateBtn"),
  navBtns: document.querySelectorAll(".nav-btn"),
  cards: {
    weather: document.querySelector(".card-weather"),
    outfit: document.querySelector(".card-outfit"),
    food: document.querySelector(".card-food"),
    sights: document.querySelector(".card-sights"),
  },
};

let foodExpanded = false;
let foodItems = [];
let displayedFoodItems = [];
let foodOpenNowOnly = false;
let sightExpanded = false;
let sightItems = [];
let displayedSightItems = [];
let placesLoadToken = 0;
let placesCache = { key: "", food: [], sights: [], expiresAt: 0 };
let geocodeCache = { key: "", suggestions: [], expiresAt: 0 };
let travelFoodItems = [];
let travelSightItems = [];
let travelShareContext = null;
let dailyDisplayDays = DEFAULT_DAILY_DISPLAY;
let currentWeatherDaily = null;
let travelDailyOverride = null;
let currentCity = { ...FALLBACK_CITIES[DEFAULT_CITY] };
let autocompleteItems = [];
let autocompleteActiveIndex = -1;
let autocompleteToken = 0;
let autocompleteTimer = null;
let autocompleteBlurTimer = null;
let pullRefreshing = false;
let airQualityToken = 0;
let favoritesSnapToken = 0;
let exchangeRateToken = 0;
let twdRatesCache = { rates: null, fetchedAt: 0 };
const TWD_RATES_TTL_MS = 6 * 60 * 60 * 1000;

const PULL_THRESHOLD = 72;
const PULL_MAX = 120;
const PULL_RESISTANCE = 0.45;
const PULL_IGNORE_SELECTOR = ".hourly, .daily.is-scroll, .favorite-chips, .city-suggestions";

function setLoading(on, message) {
  if (on) {
    els.loading.textContent =
      message ?? (pullRefreshing ? "更新中…" : "查詢天氣中…");
  }
  els.loading.classList.toggle("hidden", !on);
  if (els.locateBtn) els.locateBtn.disabled = on;
}

function setError(message = "") {
  if (!message) {
    els.error.classList.add("hidden");
    els.error.textContent = "";
    return;
  }
  els.error.textContent = message;
  els.error.classList.remove("hidden");
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark") return raw;
  } catch {
    // ignore
  }
  return null;
}

function resolveTheme() {
  return getSavedTheme() ?? getSystemTheme();
}

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = next;

  const themeColor = next === "dark" ? "#1a2a3d" : "#d6e6f8";
  const meta = document.getElementById("themeColorMeta");
  if (meta) meta.setAttribute("content", themeColor);

  const statusBar = document.getElementById("statusBarMeta");
  if (statusBar) {
    statusBar.setAttribute("content", next === "dark" ? "black-translucent" : "default");
  }

  if (els.themeBtn) {
    const label = next === "dark" ? "切換淺色模式" : "切換深色模式";
    els.themeBtn.setAttribute("aria-label", label);
    els.themeBtn.title = label;
  }
}

function toggleTheme() {
  const next = resolveTheme() === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // ignore
  }
  applyTheme(next);
}

function initTheme() {
  applyTheme(resolveTheme());

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (getSavedTheme() == null) applyTheme(getSystemTheme());
  };
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onSystemChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onSystemChange);
  }
}

function weatherLabel(code) {
  return WEATHER_TEXT[code] ?? "多雲";
}

function isRainy(code) {
  return [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
}

function isSnowy(code) {
  return [71, 73, 75, 77, 85, 86].includes(code);
}

function weatherFxType(code) {
  if ([95, 96, 99].includes(code)) return "thunder";
  if (isSnowy(code)) return "snow";
  if (isRainy(code)) return "rain";
  if (code <= 1) return "clear";
  if ([2, 3, 45, 48].includes(code)) return "cloud";
  return "none";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function localHourFromIso(iso) {
  const match = String(iso ?? "").match(/T(\d{2})/);
  if (match) return Number(match[1]);
  return new Date().getHours();
}

function weatherIsNight(weather) {
  const localHour = localHourFromIso(weather?.current?.time);
  const isDay = weather?.current?.is_day;
  // Open-Meteo is_day follows sunrise/sunset; also treat 19:00–05:59 as night for UI.
  if (isDay === 0 || isDay === false) return true;
  if (hourIsNight(localHour)) return true;
  return false;
}

function renderWeatherFx(code, isNight = hourIsNight(new Date().getHours())) {
  if (!els.weatherFx) return;

  const type = weatherFxType(code);
  let className = `weather-fx fx-${type}`;
  if (type === "clear" && isNight) {
    className += " fx-night";
  }

  els.weatherFx.className = className;
  els.weatherFx.innerHTML = "";

  if (type === "none") return;
  if (prefersReducedMotion() && type !== "clear" && type !== "cloud") return;

  if (type === "rain" || type === "thunder") {
    const count = type === "thunder" ? 28 : 24;
    els.weatherFx.innerHTML = Array.from({ length: count }, () => {
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = 0.5 + Math.random() * 0.6;
      return `<span class="fx-drop" style="left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s"></span>`;
    }).join("");
  }

  if (type === "snow") {
    els.weatherFx.innerHTML = Array.from({ length: 16 }, () => {
      const left = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = 3 + Math.random() * 4;
      const size = 3 + Math.random() * 5;
      return `<span class="fx-flake" style="left:${left}%;animation-delay:${delay}s;animation-duration:${duration}s;width:${size}px;height:${size}px"></span>`;
    }).join("");
  }

  if (type === "cloud") {
    els.weatherFx.innerHTML = Array.from({ length: 3 }, (_, i) => {
      const top = 10 + i * 22 + Math.random() * 8;
      const delay = -(Math.random() * 12);
      const duration = 18 + Math.random() * 12;
      const scale = 0.8 + Math.random() * 0.6;
      return `<span class="fx-cloud" style="top:${top}%;animation-delay:${delay}s;animation-duration:${duration}s;transform:scale(${scale})"></span>`;
    }).join("");
  }
}

function isHot(temp) {
  return temp >= 28;
}

function isCold(temp) {
  return temp < 18;
}

function uvLevelLabel(uv) {
  if (uv <= 2) return "低";
  if (uv <= 5) return "中等";
  if (uv <= 7) return "高";
  if (uv <= 10) return "很高";
  return "極高";
}

function windDirectionLabel(degrees) {
  if (degrees == null || Number.isNaN(Number(degrees))) return "";
  const dirs = ["北", "東北", "東", "東南", "南", "西南", "西", "西北"];
  const idx = Math.round(((Number(degrees) % 360) + 360) % 360 / 45) % 8;
  return dirs[idx];
}

function usAqiLabel(aqi) {
  if (aqi == null || Number.isNaN(Number(aqi))) return "";
  const n = Number(aqi);
  if (n <= 50) return "良好";
  if (n <= 100) return "普通";
  if (n <= 150) return "對敏感族群不健康";
  if (n <= 200) return "不健康";
  if (n <= 300) return "非常不健康";
  return "危害";
}

function aqiAdvice(aqi) {
  if (aqi == null || Number.isNaN(Number(aqi))) return "";
  const n = Number(aqi);
  if (n <= 50) return "適合戶外活動";
  if (n <= 100) return "一般民眾可正常活動";
  if (n <= 150) return "敏感族群外出請留意";
  if (n <= 200) return "建議減少長時間戶外活動";
  if (n <= 300) return "避免戶外劇烈活動";
  return "請儘量待在室內";
}

function clearAirQuality() {
  if (!els.weatherAqi) return;
  els.weatherAqi.textContent = "";
  els.weatherAqi.classList.add("hidden");
}

async function fetchAirQuality(latitude, longitude) {
  const url = new URL(AIR_QUALITY_API);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("current", "pm2_5,us_aqi");
  url.searchParams.set("timezone", "auto");

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error("空氣品質服務暫時無法使用");
  return res.json();
}

async function loadAirQuality(latitude, longitude) {
  if (!els.weatherAqi || latitude == null || longitude == null) {
    clearAirQuality();
    return;
  }

  const token = ++airQualityToken;
  try {
    const data = await fetchAirQuality(latitude, longitude);
    if (token !== airQualityToken) return;

    const aqi = data?.current?.us_aqi;
    const pm25 = data?.current?.pm2_5;
    if (aqi == null && pm25 == null) {
      clearAirQuality();
      return;
    }

    const parts = [];
    if (aqi != null) {
      const label = usAqiLabel(aqi);
      parts.push(`空氣品質 ${Math.round(aqi)}${label ? `（${label}）` : ""}`);
    }
    if (pm25 != null) parts.push(`PM2.5 ${Math.round(pm25)}`);
    const advice = aqiAdvice(aqi);
    if (advice) parts.push(advice);

    els.weatherAqi.textContent = parts.join(" · ");
    els.weatherAqi.classList.remove("hidden");
  } catch {
    if (token !== airQualityToken) return;
    clearAirQuality();
  }
}

function clearExchangeRate() {
  if (els.weatherRate) els.weatherRate.textContent = "";
  if (els.rateCard) els.rateCard.classList.add("hidden");
}

function showExchangeRate(text) {
  if (!els.weatherRate || !els.rateCard) return;
  els.weatherRate.textContent = text;
  els.rateCard.classList.remove("hidden");
}

function currencyForCountry(countryCode) {
  if (!countryCode) return null;
  return COUNTRY_CURRENCY[String(countryCode).toUpperCase()] ?? null;
}

function countryDisplayName(countryCode) {
  const code = String(countryCode || "").toUpperCase();
  if (!code) return "";
  try {
    const name = new Intl.DisplayNames(["zh-Hant"], { type: "region" }).of(code);
    return name || code;
  } catch {
    return code;
  }
}

function formatFxNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(2);
  if (n >= 1) return n.toFixed(2);
  if (n >= 0.1) return n.toFixed(3);
  return n.toFixed(4);
}

function normalizeCountryCode(raw) {
  if (!raw) return "";
  const code = String(raw).trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : "";
}

async function resolveCountryCode(city) {
  const fromCity = normalizeCountryCode(city?.countryCode || city?.country_code);
  if (fromCity) return fromCity;

  if (city?.name && isTaiwanCityName(city.name)) return "TW";
  if (city?.latitude != null && city?.longitude != null && isInTaiwan(city.latitude, city.longitude)) {
    return "TW";
  }

  if (city?.latitude == null || city?.longitude == null) return "";

  const geo = await reverseGeocode(city.latitude, city.longitude);
  return normalizeCountryCode(geo?.countryCode);
}

async function fetchTwdRates() {
  const now = Date.now();
  if (twdRatesCache.rates && now - twdRatesCache.fetchedAt < TWD_RATES_TTL_MS) {
    return twdRatesCache.rates;
  }

  const res = await fetchWithTimeout(FX_API);
  if (!res.ok) throw new Error("匯率服務暫時無法使用");
  const data = await res.json();
  if (data?.result !== "success" || !data?.rates) {
    throw new Error("匯率資料無效");
  }

  twdRatesCache = { rates: data.rates, fetchedAt: now };
  return data.rates;
}

function formatFxPair(currency, ratePerTwd) {
  const foreignPerTwd = Number(ratePerTwd);
  if (!Number.isFinite(foreignPerTwd) || foreignPerTwd <= 0) return "";
  const twdPerForeign = 1 / foreignPerTwd;
  return `1 ${currency} ≈ ${formatFxNumber(twdPerForeign)} TWD · 1 TWD ≈ ${formatFxNumber(foreignPerTwd)} ${currency}`;
}

async function loadExchangeRate(city) {
  if (!els.weatherRate || !els.rateCard) return;
  const token = ++exchangeRateToken;

  try {
    const countryCode = await resolveCountryCode(city);
    if (token !== exchangeRateToken) return;

    if (!countryCode) {
      clearExchangeRate();
      return;
    }

    if (city && !city.countryCode) city.countryCode = countryCode;
    if (currentCity) currentCity.countryCode = countryCode;

    const currency = currencyForCountry(countryCode);
    const countryName = countryDisplayName(countryCode);

    if (!currency) {
      clearExchangeRate();
      return;
    }

    if (currency === "TWD") {
      showExchangeRate(`${countryName || "台灣"} · 當地為新台幣`);
      return;
    }

    const rates = await fetchTwdRates();
    if (token !== exchangeRateToken) return;

    const rate = rates[currency];
    const pair = formatFxPair(currency, rate);
    if (!pair) {
      clearExchangeRate();
      return;
    }

    showExchangeRate(`${countryName || currency} · ${pair}`);
  } catch {
    if (token !== exchangeRateToken) return;
    clearExchangeRate();
  }
}

function isSameCity(a, b) {
  return (
    Math.abs(a.latitude - b.latitude) < 0.01 &&
    Math.abs(a.longitude - b.longitude) < 0.01
  );
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveFavorites(list) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

function isFavorite(city) {
  return loadFavorites().some((item) => isSameCity(item, city));
}

function loadSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list.filter(
      (item) =>
        item &&
        typeof item.name === "string" &&
        Number.isFinite(item.latitude) &&
        Number.isFinite(item.longitude)
    );
  } catch {
    return [];
  }
}

function saveSearchHistory(list) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
}

function getHistoryForDisplay() {
  return loadSearchHistory().filter((city) => !isFavorite(city));
}

function pushSearchHistory(city) {
  if (!city?.name || city.latitude == null || city.longitude == null) return;
  if (isFavorite(city)) return;

  const entry = {
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
  };
  const list = loadSearchHistory().filter((item) => !isSameCity(item, entry));
  list.unshift(entry);
  saveSearchHistory(list);
}

function removeSearchHistoryCity(city) {
  if (!city) return;
  const list = loadSearchHistory().filter((item) => !isSameCity(item, city));
  saveSearchHistory(list);
}

function clearSearchHistory() {
  saveSearchHistory([]);
}

function showSearchHistorySuggestions() {
  if (!els.citySuggestions) return;

  const list = getHistoryForDisplay();
  autocompleteItems = [];
  autocompleteActiveIndex = -1;

  if (!list.length) {
    hideCitySuggestions();
    return;
  }

  const rows = list
    .map(
      (city, index) => `
      <li
        class="city-suggestion-item history-item"
        role="option"
        aria-selected="false"
        data-history-index="${index}"
        id="cityHistory-${index}"
      >
        <span class="city-suggestion-label">${city.name}</span>
        <button
          type="button"
          class="history-remove"
          data-history-remove="${index}"
          aria-label="移除${city.name}搜尋紀錄"
        >×</button>
      </li>`
    )
    .join("");

  els.citySuggestions.innerHTML = `
    <li class="city-suggestion-heading" role="presentation">
      <span>最近搜尋</span>
      <button type="button" class="history-clear" data-history-clear aria-label="清除全部搜尋紀錄">清除</button>
    </li>
    ${rows}`;
  els.citySuggestions.classList.remove("hidden");
  setAutocompleteExpanded(true);
  if (els.cityInput) els.cityInput.removeAttribute("aria-activedescendant");
}

function applySearchHistory(city) {
  if (!city || city.latitude == null || city.longitude == null) return;
  hideCitySuggestions();
  clearTravelSummary();
  querySavedCity(city);
}

function updateFavoriteBtn() {
  if (!els.favoriteBtn) return;
  const favorited = isFavorite(currentCity);
  els.favoriteBtn.classList.toggle("active", favorited);
  els.favoriteBtn.setAttribute(
    "aria-label",
    favorited ? "取消收藏" : "加入收藏"
  );
  els.favoriteBtn.title = favorited ? "取消收藏" : "收藏此城市";
}

function renderFavorites() {
  if (!els.favoriteChips) return;
  const list = loadFavorites();
  if (!list.length) {
    els.favoriteChips.innerHTML = "";
    favoritesSnapToken += 1;
    return;
  }

  els.favoriteChips.innerHTML = list
    .map(
      (city, index) => `
      <div class="favorite-chip${isSameCity(city, currentCity) ? " active" : ""}">
        <button type="button" class="favorite-chip-btn" data-fav-index="${index}">
          <span class="favorite-chip-name">${city.name}</span>
          <span class="favorite-chip-meta">
            <span class="favorite-chip-temp" data-fav-temp="${index}">--°</span>
            <span class="favorite-chip-icon" data-fav-icon="${index}" aria-hidden="true"></span>
          </span>
        </button>
        <button type="button" class="favorite-chip-remove" data-fav-remove="${index}" aria-label="移除${city.name}">×</button>
      </div>`
    )
    .join("");

  fillFavoriteSnapshots(list);
}

async function fillFavoriteSnapshots(list) {
  const token = ++favoritesSnapToken;
  const results = await Promise.all(
    list.map(async (city) => {
      try {
        const weather = await fetchWeather(city.latitude, city.longitude, 1);
        const current = weather?.current;
        if (!current) return null;
        return {
          temp: Math.round(current.temperature_2m),
          code: current.weather_code ?? 3,
          hour: localHourFromIso(current.time),
        };
      } catch {
        return null;
      }
    })
  );

  if (token !== favoritesSnapToken) return;

  results.forEach((snap, index) => {
    const tempEl = els.favoriteChips?.querySelector(`[data-fav-temp="${index}"]`);
    const iconEl = els.favoriteChips?.querySelector(`[data-fav-icon="${index}"]`);
    if (!tempEl || !iconEl || !snap) return;
    tempEl.textContent = `${snap.temp}°`;
    iconEl.innerHTML = iconSvg("mini", snap.code, snap.hour);
  });
}

function toggleFavorite() {
  if (currentCity.latitude == null || currentCity.longitude == null) return;

  let list = loadFavorites();
  const idx = list.findIndex((item) => isSameCity(item, currentCity));

  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= MAX_FAVORITES) {
      setError(`最多收藏 ${MAX_FAVORITES} 個城市`);
      return;
    }
    list.push({
      name: currentCity.name,
      latitude: currentCity.latitude,
      longitude: currentCity.longitude,
    });
  }
  saveFavorites(list);
  updateFavoriteBtn();
  renderFavorites();
  if (idx < 0) removeSearchHistoryCity(currentCity);
  setError("");
}

function loadPlaceFavorites() {
  try {
    const raw = localStorage.getItem(PLACE_FAVORITES_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function savePlaceFavorites(list) {
  localStorage.setItem(PLACE_FAVORITES_KEY, JSON.stringify(list));
}

function isPlaceFavorite(placeId) {
  if (!placeId) return false;
  return loadPlaceFavorites().some((item) => item.id === placeId);
}

function togglePlaceFavorite(place) {
  if (!place?.id) {
    setError("此店家無法收藏（缺少識別碼）");
    setTimeout(() => setError(""), 2500);
    return;
  }

  let list = loadPlaceFavorites();
  const idx = list.findIndex((item) => item.id === place.id);

  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    if (list.length >= MAX_PLACE_FAVORITES) {
      setError(`最多收藏 ${MAX_PLACE_FAVORITES} 間店家`);
      setTimeout(() => setError(""), 2500);
      return;
    }
    list.push({
      id: place.id,
      name: place.name,
      rating: place.rating ?? 0,
      desc: place.desc || "",
      mapsUrl: place.mapsUrl || "",
      kind: place.kind || "food",
      latitude: place.latitude ?? null,
      longitude: place.longitude ?? null,
    });
  }

  savePlaceFavorites(list);
  renderPlaceFavorites();
  renderFoodList(foodItems, foodExpanded);
  renderSightList(sightItems, sightExpanded);
}

function removePlaceFavoriteAt(index) {
  const list = loadPlaceFavorites();
  if (index < 0 || index >= list.length) return;
  list.splice(index, 1);
  savePlaceFavorites(list);
  renderPlaceFavorites();
  renderFoodList(foodItems, foodExpanded);
  renderSightList(sightItems, sightExpanded);
}

function openPlaceFavoriteOnMaps(item) {
  if (!item) return;
  if (item.mapsUrl) {
    window.open(item.mapsUrl, "_blank", "noopener,noreferrer");
    return;
  }
  const query = [item.name, item.desc].filter(Boolean).join(" ");
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function renderPlaceFavorites() {
  if (!els.placeFavoritesCard || !els.placeFavoritesList) return;

  const list = loadPlaceFavorites();
  if (!list.length) {
    els.placeFavoritesCard.classList.add("hidden");
    els.placeFavoritesList.innerHTML = "";
    return;
  }

  els.placeFavoritesCard.classList.remove("hidden");
  els.placeFavoritesList.innerHTML = list
    .map(
      (item, index) => `
      <li
        class="place-fav-item"
        role="button"
        tabindex="0"
        data-place-fav-index="${index}"
        aria-label="在 Google Maps 開啟${item.name}"
      >
        ${iconSvg(item.kind === "sight" ? "landmark" : "bowl")}
        <div>
          <h3>${item.name}</h3>
          <p><span class="place-fav-kind">${item.kind === "sight" ? "景點" : "美食"}</span>${
            item.desc ? ` · ${item.desc}` : ""
          }</p>
        </div>
        <span class="rating">★ ${(item.rating ?? 0).toFixed(1)}</span>
        <button
          type="button"
          class="place-fav-remove"
          data-place-fav-remove="${index}"
          aria-label="取消收藏${item.name}"
        >×</button>
      </li>`
    )
    .join("");
}

function removeFavoriteAt(index) {
  const list = loadFavorites();
  if (index < 0 || index >= list.length) return;
  list.splice(index, 1);
  saveFavorites(list);
  updateFavoriteBtn();
  renderFavorites();
}

function buildRainAlert(weather) {
  const current = weather.current;
  if (isRainy(current.weather_code)) {
    return "目前降雨中，記得帶傘";
  }

  const hourly = weather.hourly;
  if (hourly?.precipitation_probability?.length) {
    let maxProb = 0;
    for (const hour of [12, 15, 18]) {
      const idx = nearestHourlyIndex(hourly.time, hour);
      const prob = hourly.precipitation_probability[idx] ?? 0;
      if (prob > maxProb) maxProb = prob;
    }
    if (maxProb >= 50) {
      return `今天下午可能降雨（最高 ${Math.round(maxProb)}%），建議攜帶雨具`;
    }
  }

  const daily = weather.daily;
  if (daily?.time?.length > 1) {
    const tomorrowProb = daily.precipitation_probability_max?.[1] ?? 0;
    const tomorrowCode = daily.weather_code?.[1];
    if (tomorrowProb >= 50 || isRainy(tomorrowCode)) {
      return "明天可能降雨，出門請備雨具";
    }
  }

  return null;
}

function renderRainAlert(weather) {
  const message = buildRainAlert(weather);
  if (!message) {
    els.rainAlert.classList.add("hidden");
    els.rainAlert.innerHTML = "";
    return;
  }

  els.rainAlert.innerHTML = `<span class="rain-alert-icon" aria-hidden="true">${iconSvg("umbrella")}</span><span>${message}</span>`;
  els.rainAlert.classList.remove("hidden");
}

function renderWeatherExtras(current) {
  const feels = Math.round(current.apparent_temperature ?? current.temperature_2m);
  const wind = Math.round(current.wind_speed_10m ?? 0);
  const windDir = windDirectionLabel(current.wind_direction_10m);
  const uv = Math.round(current.uv_index ?? 0);
  const windText = windDir ? `${windDir}風 ${wind} km/h` : `風速 ${wind} km/h`;
  els.weatherExtras.textContent = `體感 ${feels}°C · ${windText} · UV ${uv}（${uvLevelLabel(uv)}）`;
}

function formatClockTime(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function renderSun(daily) {
  if (!els.weatherSun) return;
  const sunrise = formatClockTime(daily?.sunrise?.[0]);
  const sunset = formatClockTime(daily?.sunset?.[0]);
  if (!sunrise || !sunset) {
    els.weatherSun.textContent = "";
    return;
  }
  els.weatherSun.textContent = `日出 ${sunrise} · 日落 ${sunset}`;
}

function buildTravelShareText(ctx) {
  const lines = [`${ctx.cityName}旅遊行程 ${ctx.dateRange}`, ""];

  for (const day of ctx.tripDays) {
    lines.push(day.dateLabel);
    if (day.outOfRange) {
      const cutoff = ctx.forecastLastDate
        ? formatForecastCutoffLabel(ctx.forecastLastDate)
        : `${MAX_FORECAST_DAYS} 天`;
      lines.push(`超出預報範圍（可預報至 ${cutoff}）`);
      lines.push("");
      continue;
    }

    lines.push(`天氣：${day.label} · ${day.maxTemp}° / ${day.minTemp}°`);
    if (day.outfit?.length) {
      lines.push(`穿搭：${day.outfit.map((item) => item.label).join("、")}`);
    }
    if (day.restaurant) {
      lines.push(`美食：${day.restaurant.name} ★${day.restaurant.rating.toFixed(1)}`);
    }
    if (day.sight) {
      lines.push(`景點：${day.sight.name} ★${day.sight.rating.toFixed(1)}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

function buildTravelMarkdown(ctx) {
  const lines = [`# ${ctx.cityName} 行程（${ctx.dateRange}）`, ""];

  for (const day of ctx.tripDays) {
    lines.push(`## ${day.dateLabel}`);
    if (day.outOfRange) {
      const cutoff = ctx.forecastLastDate
        ? formatForecastCutoffLabel(ctx.forecastLastDate)
        : `${MAX_FORECAST_DAYS} 天`;
      lines.push(`- 超出預報範圍（可預報至 ${cutoff}）`);
      lines.push("");
      continue;
    }

    lines.push(`- 天氣：${day.label} · ${day.maxTemp}° / ${day.minTemp}°`);
    if (day.precipMax >= 50 || isRainy(day.code)) {
      lines.push("- 建議攜帶雨具");
    }
    if (day.outfit?.length) {
      lines.push(`- 穿搭：${day.outfit.map((item) => item.label).join("、")}`);
    }
    if (day.restaurant) {
      lines.push(`- 美食：${day.restaurant.name} ★${day.restaurant.rating.toFixed(1)}`);
    }
    if (day.sight) {
      lines.push(`- 景點：${day.sight.name} ★${day.sight.rating.toFixed(1)}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}

async function copyTravelMarkdown() {
  if (!travelShareContext) {
    setError("請先查詢旅遊行程");
    setTimeout(() => setError(""), 2500);
    return;
  }

  const markdown = buildTravelMarkdown(travelShareContext);
  try {
    await navigator.clipboard.writeText(markdown);
    setError("已複製 Markdown");
    setTimeout(() => setError(""), 2500);
  } catch {
    setError("無法複製到剪貼簿");
    setTimeout(() => setError(""), 2500);
  }
}

function canvasFitText(g, text, maxWidth) {
  const str = String(text ?? "");
  if (g.measureText(str).width <= maxWidth) return str;
  let out = str;
  while (out.length > 1 && g.measureText(`${out}…`).width > maxWidth) {
    out = out.slice(0, -1);
  }
  return `${out}…`;
}

function buildTravelExportCanvas(ctx) {
  const isDark = document.documentElement.dataset.theme === "dark";
  const width = 720;
  const pad = 36;
  const dayGap = 16;
  const lineH = 26;
  const titleH = 44;
  const subtitleH = 28;
  const dayTitleH = 32;
  const dayPad = 20;
  const textMax = width - pad * 2 - dayPad * 2;

  const dayBlocks = ctx.tripDays.map((day) => {
    const lines = [];
    if (day.outOfRange) {
      const cutoff = ctx.forecastLastDate
        ? formatForecastCutoffLabel(ctx.forecastLastDate)
        : `${MAX_FORECAST_DAYS} 天`;
      lines.push(`超出預報範圍（可預報至 ${cutoff}）`);
    } else {
      lines.push(`天氣：${day.label} · ${day.maxTemp}° / ${day.minTemp}°`);
      if (day.precipMax >= 50 || isRainy(day.code)) lines.push("建議攜帶雨具");
      if (day.outfit?.length) {
        lines.push(`穿搭：${day.outfit.map((item) => item.label).join("、")}`);
      }
      if (day.restaurant) {
        lines.push(`美食：${day.restaurant.name} ★${day.restaurant.rating.toFixed(1)}`);
      }
      if (day.sight) {
        lines.push(`景點：${day.sight.name} ★${day.sight.rating.toFixed(1)}`);
      }
    }
    const height = dayPad * 2 + dayTitleH + lines.length * lineH;
    return { dateLabel: day.dateLabel, lines, height, muted: Boolean(day.outOfRange) };
  });

  const contentH = dayBlocks.reduce((sum, block, i) => sum + block.height + (i ? dayGap : 0), 0);
  const height = pad * 2 + titleH + subtitleH + 20 + contentH;

  const canvas = document.createElement("canvas");
  const scale = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const g = canvas.getContext("2d");
  if (!g) throw new Error("無法產生圖片");
  g.scale(scale, scale);

  const bg = isDark ? "#12151a" : "#f5f5f3";
  const card = isDark ? "#1c2128" : "#ffffff";
  const text = isDark ? "#e8eaed" : "#1e1e1e";
  const muted = isDark ? "#a8adb5" : "#5a5a5a";
  const accent = isDark ? "#c4a484" : "#785032";

  g.fillStyle = bg;
  g.fillRect(0, 0, width, height);

  g.fillStyle = text;
  g.font = "700 28px \"Microsoft JhengHei\", \"PingFang TC\", sans-serif";
  g.fillText(canvasFitText(g, `${ctx.cityName} 旅遊行程`, width - pad * 2), pad, pad + 28);

  g.fillStyle = accent;
  g.font = "500 18px \"Microsoft JhengHei\", \"PingFang TC\", sans-serif";
  g.fillText(ctx.dateRange, pad, pad + titleH + 8);

  let y = pad + titleH + subtitleH + 20;
  for (const block of dayBlocks) {
    g.fillStyle = card;
    g.beginPath();
    const r = 14;
    const x = pad;
    const w = width - pad * 2;
    const h = block.height;
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
    g.fill();

    g.fillStyle = text;
    g.font = "700 18px \"Microsoft JhengHei\", \"PingFang TC\", sans-serif";
    g.fillText(canvasFitText(g, block.dateLabel, textMax), x + dayPad, y + dayPad + 18);

    g.fillStyle = muted;
    g.font = "400 15px \"Microsoft JhengHei\", \"PingFang TC\", sans-serif";
    block.lines.forEach((line, i) => {
      g.fillText(
        canvasFitText(g, line, textMax),
        x + dayPad,
        y + dayPad + dayTitleH + (i + 1) * lineH - 6
      );
    });

    y += block.height + dayGap;
  }

  g.fillStyle = muted;
  g.font = "400 12px \"Microsoft JhengHei\", \"PingFang TC\", sans-serif";
  g.fillText("天氣查詢 Dashboard", pad, height - 14);

  return canvas;
}

function sanitizeDownloadName(name) {
  return String(name || "行程")
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 40);
}

async function exportTravelImage() {
  if (!travelShareContext) {
    setError("請先查詢旅遊行程");
    setTimeout(() => setError(""), 2500);
    return;
  }

  try {
    const canvas = buildTravelExportCanvas(travelShareContext);
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => {
        if (result) resolve(result);
        else reject(new Error("無法產生圖片"));
      }, "image/png");
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizeDownloadName(travelShareContext.cityName)}-行程.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    setError("已下載行程圖片");
    setTimeout(() => setError(""), 2500);
  } catch {
    setError("無法匯出圖片");
    setTimeout(() => setError(""), 2500);
  }
}

function buildShareText() {
  if (travelShareContext) return buildTravelShareText(travelShareContext);

  const parts = [];
  parts.push(`${currentCity.name} ${els.currentTemp.textContent}`);
  if (els.weatherDesc.textContent) parts.push(els.weatherDesc.textContent);
  if (els.weatherExtras.textContent) parts.push(els.weatherExtras.textContent);
  if (els.weatherSun.textContent) parts.push(els.weatherSun.textContent);
  return parts.join("\n");
}

async function shareWeather() {
  const text = buildShareText();
  const title = travelShareContext
    ? `${travelShareContext.cityName} 旅遊行程`
    : "天氣查詢";
  const shareData = { title, text, url: location.href };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // 使用者取消分享，忽略
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${location.href}`);
    setError("已複製天氣資訊到剪貼簿");
    setTimeout(() => setError(""), 2500);
  } catch {
    setError("此裝置不支援分享功能");
    setTimeout(() => setError(""), 2500);
  }
}

function clearWeatherOnError() {
  els.weatherDesc.textContent = "查詢失敗，請重新搜尋";
  els.currentTemp.textContent = "--°C";
  els.weatherExtras.textContent = "";
  clearAirQuality();
  clearExchangeRate();
  if (els.weatherSun) els.weatherSun.textContent = "";
  els.weatherIcon.innerHTML = iconSvg("cloud");
  els.hourlyForecast.innerHTML = "";
  els.dailyForecast.innerHTML = "";
  els.dailyForecast.classList.remove("is-scroll");
  currentWeatherDaily = null;
  els.rainAlert.classList.add("hidden");
  els.rainAlert.innerHTML = "";
  if (els.weatherFx) {
    els.weatherFx.className = "weather-fx";
    els.weatherFx.innerHTML = "";
  }
  els.cards?.weather?.classList.remove("is-night");
}

function iconSvg(type, code = 0, hour = 12) {
  const rainy = isRainy(code);
  const map = {
    sun: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="12" fill="#f5b942"/><g stroke="#f5b942" stroke-width="3" stroke-linecap="round"><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/><line x1="15" y1="15" x2="19" y2="19"/><line x1="45" y1="45" x2="49" y2="49"/><line x1="45" y1="19" x2="49" y2="15"/><line x1="15" y1="49" x2="19" y2="45"/></g></svg>`,
    cloud: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 42h34a14 14 0 0 0-2-27.8A18 18 0 0 0 20 24a12 12 0 0 0-2 18z" fill="#8ea3b8"/></svg>`,
    rain: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 36h36a12 12 0 0 0-1.8-23.9A16 16 0 0 0 18 22a10 10 0 0 0-2 14z" fill="#5f7388"/><path d="M22 44l-4 10M32 44l-4 10M42 44l-4 10" stroke="#5b9bd5" stroke-width="3" stroke-linecap="round"/></svg>`,
    storm: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 34h36a12 12 0 0 0-1.8-23.9A16 16 0 0 0 18 20a10 10 0 0 0-2 14z" fill="#5f7388"/><path d="M22 44l-4 10M32 44l-4 10M42 44l-4 10" stroke="#5b9bd5" stroke-width="3" stroke-linecap="round"/><path d="M40 30l-8 14h6l-4 10" fill="#f5c542"/></svg>`,
    moon: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M38 10a18 18 0 1 0 16 28A14 14 0 0 1 38 10z" fill="#b7bfd0"/></svg>`,
    shirt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3l4 3v2h-2v12H6V8H4V6l4-3 4 3 4-3z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    umbrella: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a7 7 0 0 1 7 7H5a7 7 0 0 1 7-7zm0 10v7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    shoe: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15c2-1 4-1 6 0l2 2h8v3H4v-5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    jacket: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l4 3 4-3 4 3v2h-2v12H6V9H4V7l4-3z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    bowl: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v2c0 4-3 7-8 7s-8-3-8-7v-2z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    salad: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="13" rx="8" ry="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 10l4-4 4 4" fill="none" stroke="#6aa84f" stroke-width="1.6"/></svg>`,
    coffee: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h10v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8zm10 2h2a3 3 0 0 1 0 6h-2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
    park: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1 3-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    museum: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V9l8-4 8 4v12M4 21h16M9 21v-6h6v6M8 9h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    landmark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2 5h5l-4 3 1.5 5L12 13l-4.5 2L9 10 5 7h5l2-5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    camera: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`,
  };

  if (type === "main") {
    if ([95, 96, 99].includes(code)) return map.storm;
    if (rainy) return map.storm;
    if (code <= 1) return hourIsNight(hour) ? map.moon : map.sun;
    if (code <= 3) return map.cloud;
    return map.cloud;
  }

  if (type === "mini") {
    if (hourIsNight(hour)) return map.moon;
    if (rainy) return map.rain;
    if (code <= 1) return map.sun;
    return map.cloud;
  }

  return map[type] ?? map.cloud;
}

function hourIsNight(hour) {
  return hour >= 19 || hour < 6;
}

function isTaiwanCityName(name) {
  if (CITY_ALIASES[name] || FALLBACK_CITIES[name]) return true;
  if (/[市縣區]$/.test(name)) return true;
  return Object.values(CITY_ALIASES).includes(name);
}

function isDistrictName(name) {
  return /區$/.test(String(name ?? "").trim());
}

function getPlacesSearchRadius(cityName = "") {
  return isDistrictName(cityName) ? DISTRICT_SEARCH_RADIUS : FOOD_SEARCH_RADIUS;
}

function getPlacesFilterRadius(cityName = "") {
  return isDistrictName(cityName) ? DISTRICT_FILTER_RADIUS : PLACES_FILTER_RADIUS;
}

function citySearchVariants(name) {
  const trimmed = name.trim();
  const variants = new Set();

  if (trimmed) variants.add(trimmed);
  if (CITY_ALIASES[trimmed]) variants.add(CITY_ALIASES[trimmed]);
  if (PLACE_ALIASES[trimmed]) variants.add(PLACE_ALIASES[trimmed]);

  if (isTaiwanCityName(trimmed)) {
    if (!/[市縣]$/.test(trimmed)) {
      variants.add(`${trimmed}市`);
      variants.add(`${trimmed}縣`);
    } else {
      variants.add(trimmed.slice(0, -1));
    }
  }

  return [...variants];
}

function pickBestResult(results, query) {
  const exact = results.find((item) => item.name === query);
  if (exact) return exact;

  const preferred = results.filter((item) =>
    ["PPLC", "PPL", "PPLA", "PPLA2", "PCLI", "ADM1"].includes(item.feature_code)
  );
  let pool = preferred.length ? preferred : results;

  if (isTaiwanCityName(query)) {
    const inTaiwan = pool.filter(
      (item) =>
        item.country_code === "TW" || isInTaiwan(item.latitude, item.longitude)
    );
    if (inTaiwan.length) pool = inTaiwan;
  }

  return [...pool].sort((a, b) => (b.population ?? 0) - (a.population ?? 0))[0];
}

function resolveDisplayName(userInput, result, matchedVariant) {
  const trimmed = userInput.trim();
  if (PLACE_ALIASES[trimmed] && matchedVariant === PLACE_ALIASES[trimmed]) {
    return trimmed;
  }
  return result.name || trimmed;
}

const PHOTON_PREFERRED_TYPES = new Set([
  "city",
  "town",
  "village",
  "suburb",
  "district",
  "state",
  "county",
  "municipality",
]);

const PHOTON_EXCLUDED_TYPES = new Set(["house", "station", "building"]);

function buildPhotonName(props) {
  const parts = [props.name];
  if (props.city && props.city !== props.name) parts.push(props.city);
  else if (props.state && props.state !== props.name) parts.push(props.state);
  return parts.join(", ");
}

function normalizePlaceName(name) {
  return String(name ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/臺/g, "台")
    .replace(/覇/g, "霸");
}

function isOkinawaSearchTerm(name) {
  return citySearchVariants(name).some((variant) => OKINAWA_SEARCH_TERMS.has(variant));
}

function placeNameMatchesQuery(displayName, query) {
  const queryNorm = normalizePlaceName(query);
  const primary = normalizePlaceName(String(displayName ?? "").split(",")[0]);
  const full = normalizePlaceName(displayName);
  return (
    primary === queryNorm ||
    full === queryNorm ||
    primary.includes(queryNorm) ||
    queryNorm.includes(primary)
  );
}

function getPlacesGeocodeRegionCode(name) {
  if (isTaiwanCityName(name)) return "TW";
  if (isOkinawaSearchTerm(name)) return "JP";
  return null;
}

function lookupOverseasFallback(name) {
  for (const variant of citySearchVariants(name)) {
    if (OVERSEAS_FALLBACK_CITIES[variant]) return { ...OVERSEAS_FALLBACK_CITIES[variant] };
  }
  return null;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pickBestPhoton(results, query, bias) {
  if (!results.length) return null;

  const preferred = results.filter((item) => {
    const osmValue = item.props?.osm_value ?? "";
    const type = item.props?.type ?? "";
    if (PHOTON_EXCLUDED_TYPES.has(osmValue)) return false;
    return PHOTON_PREFERRED_TYPES.has(osmValue) || PHOTON_PREFERRED_TYPES.has(type);
  });

  let pool = preferred.length
    ? preferred
    : results.filter((item) => !PHOTON_EXCLUDED_TYPES.has(item.props?.osm_value ?? ""));

  if (!pool.length) return results[0];

  if (isTaiwanCityName(query)) {
    const inTaiwan = pool.filter((item) => isInTaiwan(item.latitude, item.longitude));
    if (inTaiwan.length) pool = inTaiwan;
  }

  const queryNorm = normalizePlaceName(query);
  const exact = pool.find(
    (item) =>
      normalizePlaceName(item.props?.name) === queryNorm ||
      normalizePlaceName(item.name.split(",")[0]) === queryNorm ||
      placeNameMatchesQuery(item.name, query)
  );
  if (exact) return exact;

  if (bias?.latitude != null && bias?.longitude != null && shouldFilterTaiwanSuggestions(query)) {
    return [...pool].sort(
      (a, b) =>
        haversineKm(bias.latitude, bias.longitude, a.latitude, a.longitude) -
        haversineKm(bias.latitude, bias.longitude, b.latitude, b.longitude)
    )[0];
  }

  return pool[0];
}

async function photonGeocode(name, bias) {
  const url = new URL(PHOTON_API);
  url.searchParams.set("q", name);
  url.searchParams.set("limit", "8");
  url.searchParams.set("lang", "default");
  if (bias?.latitude != null && bias?.longitude != null) {
    url.searchParams.set("lat", String(bias.latitude));
    url.searchParams.set("lon", String(bias.longitude));
  }

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error("地理編碼服務暫時無法使用");
  const data = await res.json();
  return (data.features ?? []).map((feature) => ({
    name: buildPhotonName(feature.properties),
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
    props: feature.properties,
  }));
}

const PLACES_GEO_PREFERRED_TYPES = new Set([
  "locality",
  "administrative_area_level_1",
  "administrative_area_level_2",
  "administrative_area_level_3",
  "sublocality",
  "sublocality_level_1",
  "neighborhood",
  "country",
]);

const PLACES_GEO_EXCLUDED_TYPES = new Set([
  "restaurant",
  "tourist_attraction",
  "cafe",
  "bar",
  "store",
  "lodging",
  "shopping_mall",
]);

function isInTaiwan(latitude, longitude) {
  return latitude >= 21.5 && latitude <= 26.5 && longitude >= 119 && longitude <= 122.5;
}

function buildPlacesSearchOptions(latitude, longitude, extra = {}, cityName = "") {
  // Text Search 的 locationRestriction 只支援矩形，圓形只能用 locationBias
  const radius = getPlacesSearchRadius(cityName);
  const options = {
    languageCode: "zh-TW",
    rankPreference: "RELEVANCE",
    locationBias: {
      circle: {
        center: { latitude, longitude },
        radius,
      },
    },
    ...extra,
  };
  if (isInTaiwan(latitude, longitude)) {
    options.regionCode = "TW";
  }
  return options;
}

function filterPlacesWithinRadius(
  places,
  originLat,
  originLng,
  cityName = "",
  maxMeters = null
) {
  const limit = maxMeters ?? getPlacesFilterRadius(cityName);
  return places.filter((place) => {
    const lat = place.location?.latitude;
    const lng = place.location?.longitude;
    if (lat == null || lng == null) return false;
    return haversineDistance(originLat, originLng, lat, lng) <= limit;
  });
}
function pickBestPlacesGeocode(results, query, bias) {
  if (!results.length) return null;

  const preferred = results.filter((item) => {
    const type = String(item.primaryType ?? "").toLowerCase();
    if (PLACES_GEO_EXCLUDED_TYPES.has(type)) return false;
    return (
      PLACES_GEO_PREFERRED_TYPES.has(type) ||
      type.includes("locality") ||
      type.includes("administrative") ||
      type.includes("sublocality") ||
      type === "city" ||
      type === "district" ||
      type === "town"
    );
  });

  let pool = preferred.length
    ? preferred
    : results.filter(
        (item) => !PLACES_GEO_EXCLUDED_TYPES.has(String(item.primaryType ?? "").toLowerCase())
      );

  if (!pool.length) return null;

  if (isTaiwanCityName(query)) {
    const inTaiwan = pool.filter((item) => isInTaiwan(item.latitude, item.longitude));
    if (inTaiwan.length) pool = inTaiwan;
  } else if (bias?.latitude != null && bias?.longitude != null && isTaiwanCityName(bias.name ?? "")) {
    pool = [...pool].sort(
      (a, b) =>
        haversineKm(bias.latitude, bias.longitude, a.latitude, a.longitude) -
        haversineKm(bias.latitude, bias.longitude, b.latitude, b.longitude)
    );
  }

  const queryNorm = normalizePlaceName(query);
  const exact = pool.find((item) => {
    const displayName = item.displayName ?? item.name ?? "";
    return placeNameMatchesQuery(displayName, query);
  });
  if (exact) return exact;

  const partial = pool.find((item) => {
    const primary = normalizePlaceName((item.displayName ?? item.name ?? "").split(",")[0]);
    return primary.includes(queryNorm) || queryNorm.includes(primary);
  });
  if (partial) return partial;

  return pool[0];
}

async function geocodeByPlaces(name) {
  const apiKey = getPlacesApiKey();
  if (!apiKey) throw new Error("NO_API_KEY");

  const regionCode = getPlacesGeocodeRegionCode(name);
  const body = {
    textQuery: name,
    maxResultCount: 5,
    ...(regionCode ? { regionCode } : {}),
  };

  const res = await fetchWithOptions(PLACES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.location,places.primaryType",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const errData = await res.json();
      detail = errData?.error?.message || errData?.error?.status || "";
    } catch {
      // ignore parse error
    }
    console.error("Places geocode 錯誤", res.status, detail);
    throw new Error("PLACES_API_ERROR");
  }

  const data = await res.json();
  return (data.places ?? [])
    .map((place) => ({
      displayName: place.displayName?.text || "",
      name: place.displayName?.text || "",
      latitude: place.location?.latitude,
      longitude: place.location?.longitude,
      primaryType: place.primaryType || "",
    }))
    .filter((item) => item.latitude != null && item.longitude != null);
}

async function geocodeByName(name, language = "zh") {
  const url = new URL(GEO_API);
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", language);
  url.searchParams.set("format", "json");

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error("地理編碼服務暫時無法使用");
  const data = await res.json();
  return data.results ?? [];
}

async function fetchWithTimeout(url, ms = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithOptions(url, options = {}, ms = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function extractAutocompleteTerm(input) {
  const trimmed = String(input ?? "").trim();
  if (!trimmed) return { term: "", travel: null };

  const match = trimmed.match(TRAVEL_DATE_PATTERN);
  if (!match) return { term: trimmed, travel: null };

  const matchStr = match[0];
  const idx = trimmed.indexOf(matchStr);
  let cityPart = trimmed.replace(matchStr, "").replace(/\s+/g, " ").trim();
  let layout = "after";

  if (!cityPart && idx > 0) {
    cityPart = trimmed.slice(0, idx).replace(/\s+/g, " ").trim();
    layout = "before";
  }

  return {
    term: cityPart,
    travel: { matchStr, layout },
  };
}

function rebuildInputFromSuggestion(label, travel) {
  if (!travel) return label;
  if (travel.layout === "after") return `${travel.matchStr} ${label}`.trim();
  return `${label} ${travel.matchStr}`.trim();
}

function shouldFilterTaiwanSuggestions(term) {
  return isTaiwanCityName(term) || /[市縣區]/.test(term);
}

function mergeCitySuggestions(meteoResults, photonResults, term, placesResults = []) {
  const termNorm = normalizePlaceName(term);
  const filterTaiwan = shouldFilterTaiwanSuggestions(term);
  const seen = new Set();
  const items = [];

  const add = (item) => {
    const key = normalizePlaceName(item.label);
    if (!key || seen.has(key)) return;
    seen.add(key);
    items.push(item);
  };

  for (const result of meteoResults) {
    if (
      filterTaiwan &&
      result.country_code !== "TW" &&
      !isInTaiwan(result.latitude, result.longitude)
    ) {
      continue;
    }
    const sublabel = [result.admin1, result.country_code].filter(Boolean).join(" · ");
    add({
      label: result.name,
      sublabel,
      latitude: result.latitude,
      longitude: result.longitude,
      population: result.population ?? 0,
    });
  }

  for (const result of photonResults) {
    if (filterTaiwan && !isInTaiwan(result.latitude, result.longitude)) continue;
    const props = result.props ?? {};
    const primary = String(result.name).split(",")[0].trim() || result.name;
    const secondary =
      String(result.name).includes(",")
        ? String(result.name).split(",").slice(1).join(",").trim()
        : props.state || props.country || "";
    add({
      label: primary,
      sublabel: secondary,
      latitude: result.latitude,
      longitude: result.longitude,
      population: 0,
    });
  }

  for (const result of placesResults) {
    add({
      label: result.label,
      sublabel: result.sublabel || "",
      latitude: result.latitude,
      longitude: result.longitude,
      population: result.population ?? 50000,
    });
  }

  for (const [name, data] of Object.entries(FALLBACK_CITIES)) {
    const nameNorm = normalizePlaceName(name);
    if (nameNorm.includes(termNorm) || termNorm.includes(nameNorm)) {
      add({
        label: data.name,
        sublabel: "台灣",
        latitude: data.latitude,
        longitude: data.longitude,
        population: 999999,
      });
    }
  }

  for (const [name, data] of Object.entries(OVERSEAS_FALLBACK_CITIES)) {
    const nameNorm = normalizePlaceName(name);
    if (nameNorm.includes(termNorm) || termNorm.includes(nameNorm)) {
      add({
        label: data.name,
        sublabel: data.region,
        latitude: data.latitude,
        longitude: data.longitude,
        population: 500000,
      });
    }
  }

  items.sort((a, b) => {
    const aNorm = normalizePlaceName(a.label);
    const bNorm = normalizePlaceName(b.label);
    const aExact = aNorm === termNorm ? 1 : 0;
    const bExact = bNorm === termNorm ? 1 : 0;
    if (bExact !== aExact) return bExact - aExact;
    const aStarts = aNorm.startsWith(termNorm) ? 1 : 0;
    const bStarts = bNorm.startsWith(termNorm) ? 1 : 0;
    if (bStarts !== aStarts) return bStarts - aStarts;
    if (b.population !== a.population) return b.population - a.population;
    if (
      filterTaiwan &&
      currentCity?.latitude != null &&
      currentCity?.longitude != null
    ) {
      return (
        haversineKm(currentCity.latitude, currentCity.longitude, a.latitude, a.longitude) -
        haversineKm(currentCity.latitude, currentCity.longitude, b.latitude, b.longitude)
      );
    }
    return 0;
  });

  return items.slice(0, AUTOCOMPLETE_MAX);
}

function mapPlacesToSuggestions(results) {
  const seen = new Set();
  const items = [];

  for (const place of results) {
    const displayName = place.displayName || place.name || "";
    const label = displayName.split(",")[0].trim() || displayName;
    const key = normalizePlaceName(label);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const sublabel = displayName.includes(",")
      ? displayName.split(",").slice(1).join(",").trim()
      : "";
    items.push({
      label,
      sublabel,
      latitude: place.latitude,
      longitude: place.longitude,
      population: 50000,
    });
  }

  return items;
}

async function fetchPlacesGeocodeSuggestions(term) {
  const cacheKey = normalizePlaceName(term);
  if (geocodeCache.key === cacheKey && Date.now() < geocodeCache.expiresAt) {
    return geocodeCache.suggestions;
  }

  const variants = [...new Set(citySearchVariants(term))].slice(0, 2);
  const seen = new Set();
  const items = [];

  for (const variant of variants) {
    try {
      const results = await geocodeByPlaces(variant);
      for (const item of mapPlacesToSuggestions(results)) {
        const key = normalizePlaceName(item.label);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        items.push(item);
      }
    } catch {
      // try next variant
    }
  }

  geocodeCache = {
    key: cacheKey,
    suggestions: items,
    expiresAt: Date.now() + GEOCODE_CACHE_TTL_MS,
  };
  return items;
}

async function fetchCitySuggestions(term) {
  const variants = [...new Set(citySearchVariants(term))].slice(0, 3);
  const photonBias = shouldFilterTaiwanSuggestions(term) ? currentCity : null;
  const tasks = [];

  for (const variant of variants) {
    tasks.push(geocodeByName(variant, "zh"));
    tasks.push(geocodeByName(variant, "en"));
    tasks.push(photonGeocode(variant, photonBias));
  }
  if (getPlacesApiKey()) {
    tasks.push(fetchPlacesGeocodeSuggestions(term));
  }

  const settled = await Promise.allSettled(tasks);
  const meteo = [];
  const photon = [];
  let places = [];

  settled.forEach((result, index) => {
    if (result.status !== "fulfilled") return;
    const variantCount = variants.length;
    if (index < variantCount * 2) {
      meteo.push(...result.value);
      return;
    }
    if (index < variantCount * 3) {
      photon.push(...result.value);
      return;
    }
    places = result.value;
  });

  return mergeCitySuggestions(meteo, photon, term, places);
}

function setAutocompleteExpanded(expanded) {
  if (els.cityInput) els.cityInput.setAttribute("aria-expanded", String(expanded));
}

function hideCitySuggestions() {
  if (!els.citySuggestions) return;
  autocompleteItems = [];
  autocompleteActiveIndex = -1;
  els.citySuggestions.classList.add("hidden");
  els.citySuggestions.innerHTML = "";
  setAutocompleteExpanded(false);
}

function renderCitySuggestions(items, activeIndex = -1) {
  if (!els.citySuggestions) return;

  autocompleteItems = items;
  autocompleteActiveIndex = activeIndex;

  if (!items.length) {
    els.citySuggestions.innerHTML =
      '<li class="city-suggestion-status" role="presentation">找不到相符地名</li>';
    els.citySuggestions.classList.remove("hidden");
    setAutocompleteExpanded(true);
    return;
  }

  els.citySuggestions.innerHTML = items
    .map(
      (item, index) => `
      <li
        class="city-suggestion-item${index === activeIndex ? " active" : ""}"
        role="option"
        aria-selected="${index === activeIndex}"
        data-suggestion-index="${index}"
        id="citySuggestion-${index}"
      >
        <span class="city-suggestion-label">${item.label}</span>
        ${item.sublabel ? `<span class="city-suggestion-sublabel">${item.sublabel}</span>` : ""}
      </li>`
    )
    .join("");
  els.citySuggestions.classList.remove("hidden");
  setAutocompleteExpanded(true);

  if (activeIndex >= 0 && els.cityInput) {
    els.cityInput.setAttribute("aria-activedescendant", `citySuggestion-${activeIndex}`);
  } else if (els.cityInput) {
    els.cityInput.removeAttribute("aria-activedescendant");
  }
}

function showAutocompleteLoading() {
  if (!els.citySuggestions) return;
  els.citySuggestions.innerHTML =
    '<li class="city-suggestion-status" role="presentation">搜尋地名中…</li>';
  els.citySuggestions.classList.remove("hidden");
  setAutocompleteExpanded(true);
}

async function refreshCitySuggestions() {
  const parsed = extractAutocompleteTerm(els.cityInput?.value ?? "");
  const term = parsed.term.trim();

  if (term.length < AUTOCOMPLETE_MIN_LEN) {
    showSearchHistorySuggestions();
    return;
  }

  const token = ++autocompleteToken;
  showAutocompleteLoading();

  try {
    const items = await fetchCitySuggestions(term);
    if (token !== autocompleteToken) return;
    renderCitySuggestions(items, -1);
  } catch {
    if (token !== autocompleteToken) return;
    renderCitySuggestions(mergeCitySuggestions([], [], term), -1);
  }
}

function scheduleCitySuggestions() {
  clearTimeout(autocompleteTimer);
  autocompleteTimer = setTimeout(refreshCitySuggestions, AUTOCOMPLETE_DEBOUNCE_MS);
}

function applyCitySuggestion(suggestion) {
  if (!suggestion) return;

  const parsed = extractAutocompleteTerm(els.cityInput.value);
  const inputValue = rebuildInputFromSuggestion(suggestion.label, parsed.travel);
  hideCitySuggestions();
  els.cityInput.value = inputValue;

  const travelQuery = parseTravelQuery(inputValue);
  if (travelQuery) {
    enterTravelMode(travelQuery);
    return;
  }

  clearTravelSummary();
  queryCity(inputValue);
}

function bindAutocompleteEvents() {
  if (!els.cityInput || !els.citySuggestions) return;

  els.cityInput.addEventListener("input", () => {
    scheduleCitySuggestions();
  });

  els.cityInput.addEventListener("focus", () => {
    clearTimeout(autocompleteBlurTimer);
    const parsed = extractAutocompleteTerm(els.cityInput.value);
    if (parsed.term.trim().length >= AUTOCOMPLETE_MIN_LEN) {
      scheduleCitySuggestions();
    } else {
      showSearchHistorySuggestions();
    }
  });

  els.cityInput.addEventListener("blur", () => {
    autocompleteBlurTimer = setTimeout(hideCitySuggestions, 150);
  });

  els.cityInput.addEventListener("keydown", (e) => {
    const visible = !els.citySuggestions.classList.contains("hidden");

    if (e.key === "Escape") {
      if (visible) {
        e.preventDefault();
        hideCitySuggestions();
      }
      return;
    }

    if (!visible || !autocompleteItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next =
        autocompleteActiveIndex < autocompleteItems.length - 1
          ? autocompleteActiveIndex + 1
          : 0;
      renderCitySuggestions(autocompleteItems, next);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next =
        autocompleteActiveIndex > 0
          ? autocompleteActiveIndex - 1
          : autocompleteItems.length - 1;
      renderCitySuggestions(autocompleteItems, next);
      return;
    }

    if (e.key === "Enter" && autocompleteActiveIndex >= 0) {
      e.preventDefault();
      applyCitySuggestion(autocompleteItems[autocompleteActiveIndex]);
    }
  });

  els.citySuggestions.addEventListener("mousedown", (e) => {
    e.preventDefault();

    if (e.target.closest("[data-history-clear]")) {
      clearSearchHistory();
      hideCitySuggestions();
      return;
    }

    const removeBtn = e.target.closest("[data-history-remove]");
    if (removeBtn) {
      const list = getHistoryForDisplay();
      const city = list[Number(removeBtn.dataset.historyRemove)];
      removeSearchHistoryCity(city);
      showSearchHistorySuggestions();
      return;
    }

    const historyRow = e.target.closest("[data-history-index]");
    if (historyRow) {
      const list = getHistoryForDisplay();
      applySearchHistory(list[Number(historyRow.dataset.historyIndex)]);
      return;
    }

    const row = e.target.closest("[data-suggestion-index]");
    if (!row) return;
    applyCitySuggestion(autocompleteItems[Number(row.dataset.suggestionIndex)]);
  });
}

function resolveTaiwanCityCoords(result, query) {
  if (!result || !isTaiwanCityName(query)) return result;
  if (isInTaiwan(result.latitude, result.longitude)) return result;

  for (const variant of citySearchVariants(query)) {
    if (FALLBACK_CITIES[variant]) return { ...FALLBACK_CITIES[variant] };
  }
  return result;
}

async function geocodeCity(name) {
  const variants = citySearchVariants(name);
  const photonBias = shouldFilterTaiwanSuggestions(name) ? currentCity : null;
  const hasPlaces = Boolean(getPlacesApiKey());

  for (const variant of variants) {
    const [meteoZh, meteoEn, photonResult, placesResult] = await Promise.allSettled([
      geocodeByName(variant, "zh"),
      geocodeByName(variant, "en"),
      photonGeocode(variant, photonBias),
      hasPlaces ? geocodeByPlaces(variant) : Promise.resolve([]),
    ]);

    const meteoResults = [];
    if (meteoZh.status === "fulfilled") meteoResults.push(...meteoZh.value);
    if (meteoEn.status === "fulfilled") meteoResults.push(...meteoEn.value);
    if (meteoResults.length) {
      const best = pickBestResult(meteoResults, variant);
      const resolved = resolveTaiwanCityCoords(best, name);
      const countryCode =
        normalizeCountryCode(resolved.country_code || resolved.countryCode) ||
        (isTaiwanCityName(name) || isInTaiwan(resolved.latitude, resolved.longitude)
          ? "TW"
          : "");
      return {
        ...resolved,
        name: resolveDisplayName(name, resolved, variant),
        countryCode,
      };
    }

    if (placesResult.status === "fulfilled" && placesResult.value.length) {
      const best = pickBestPlacesGeocode(
        placesResult.value,
        variant,
        shouldFilterTaiwanSuggestions(name) ? currentCity : null
      );
      if (best) {
        return {
          latitude: best.latitude,
          longitude: best.longitude,
          name: resolveDisplayName(name, best, variant),
          countryCode: isTaiwanCityName(name) || isInTaiwan(best.latitude, best.longitude) ? "TW" : "",
        };
      }
    }

    if (photonResult.status === "fulfilled" && photonResult.value.length) {
      const best = pickBestPhoton(photonResult.value, variant, photonBias);
      if (best) {
        const photonCountry = normalizeCountryCode(
          best.props?.countrycode || best.props?.countryCode
        );
        const resolved = resolveTaiwanCityCoords(
          {
            latitude: best.latitude,
            longitude: best.longitude,
            name: resolveDisplayName(name, best, variant),
            countryCode: photonCountry,
          },
          name
        );
        return {
          ...resolved,
          countryCode:
            normalizeCountryCode(resolved.countryCode) ||
            (isTaiwanCityName(name) || isInTaiwan(resolved.latitude, resolved.longitude)
              ? "TW"
              : photonCountry),
        };
      }
    }
  }

  if (isTaiwanCityName(name)) {
    for (const variant of variants) {
      if (FALLBACK_CITIES[variant]) {
        return { ...FALLBACK_CITIES[variant], countryCode: "TW" };
      }
    }
  }

  const overseasFallback = lookupOverseasFallback(name);
  if (overseasFallback) {
    return {
      ...overseasFallback,
      countryCode: overseasFallback.countryCode || "",
    };
  }

  for (const variant of variants) {
    if (FALLBACK_CITIES[variant]) {
      return { ...FALLBACK_CITIES[variant], countryCode: "TW" };
    }
  }

  throw new Error(
    `找不到「${name}」。台灣城市可試「台北市」；國外地點可輸入英文如 Tokyo、Iceland`
  );
}

async function fetchOpenMeteoWeather(latitude, longitude, days = 5) {
  const url = new URL(WEATHER_API);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,weather_code,apparent_temperature,wind_speed_10m,wind_direction_10m,uv_index,is_day"
  );
  url.searchParams.set("hourly", "temperature_2m,weather_code,precipitation_probability");
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,sunrise,sunset"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", String(Math.min(MAX_FORECAST_DAYS, Math.max(1, days))));

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error("天氣服務暫時無法使用");
  const data = await res.json();
  if (!data?.current) throw new Error("天氣資料無效");
  data._source = "open-meteo";
  return data;
}

/** WorldWeatherOnline weatherCode → approximate WMO code used by this app */
const WWO_TO_WMO = {
  113: 0,
  116: 2,
  119: 3,
  122: 3,
  143: 45,
  176: 61,
  179: 71,
  182: 61,
  185: 51,
  200: 95,
  227: 71,
  230: 75,
  248: 45,
  260: 48,
  263: 51,
  266: 51,
  281: 51,
  284: 55,
  293: 61,
  296: 61,
  299: 63,
  302: 63,
  305: 65,
  308: 65,
  311: 61,
  314: 65,
  317: 61,
  320: 63,
  323: 71,
  326: 71,
  329: 73,
  332: 73,
  335: 75,
  338: 75,
  350: 77,
  353: 80,
  356: 81,
  359: 82,
  362: 80,
  365: 81,
  368: 85,
  371: 86,
  374: 80,
  377: 81,
  386: 95,
  389: 95,
  392: 96,
  395: 96,
};

function mapWwoWeatherCode(code) {
  const n = Number(code);
  if (!Number.isFinite(n)) return 3;
  return WWO_TO_WMO[n] ?? 3;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseWttrHourValue(timeStr) {
  const n = Number(String(timeStr ?? "0").replace(/\D/g, ""));
  if (!Number.isFinite(n)) return 0;
  return Math.floor(n / 100);
}

function parseWttrClockToIso(dateStr, clockStr) {
  if (!dateStr || !clockStr) return "";
  const m = String(clockStr).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return `${dateStr}T12:00`;
  let hour = Number(m[1]) % 12;
  if (/PM/i.test(m[3])) hour += 12;
  const minute = m[2];
  return `${dateStr}T${String(hour).padStart(2, "0")}:${minute}`;
}

function wttrIsDay(current, astronomy) {
  const obs = String(current?.localObsDateTime || current?.observation_time || "");
  const sunrise = astronomy?.sunrise;
  const sunset = astronomy?.sunset;
  if (!obs || !sunrise || !sunset) {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 19 ? 1 : 0;
  }
  const m = obs.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 1;
  let hour = Number(m[1]) % 12;
  if (/PM/i.test(m[3])) hour += 12;
  const toMinutes = (clock) => {
    const cm = String(clock).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!cm) return 0;
    let h = Number(cm[1]) % 12;
    if (/PM/i.test(cm[3])) h += 12;
    return h * 60 + Number(cm[2]);
  };
  const nowMin = hour * 60 + Number(m[2]);
  return nowMin >= toMinutes(sunrise) && nowMin < toMinutes(sunset) ? 1 : 0;
}

function normalizeWttrWeather(data, days = 5) {
  const currentRaw = data?.current_condition?.[0];
  const weatherDays = Array.isArray(data?.weather) ? data.weather : [];
  if (!currentRaw || !weatherDays.length) {
    throw new Error("備援天氣資料無效");
  }

  const today = weatherDays[0];
  const astronomy = today?.astronomy?.[0] || {};
  const dateStr = today?.date || new Date().toISOString().slice(0, 10);
  const obsHour = (() => {
    const m = String(currentRaw.localObsDateTime || "").match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return new Date().getHours();
    let hour = Number(m[1]) % 12;
    if (/PM/i.test(m[3])) hour += 12;
    return hour;
  })();
  const currentTime = `${dateStr}T${String(obsHour).padStart(2, "0")}:00`;

  const current = {
    time: currentTime,
    temperature_2m: Number(currentRaw.temp_C),
    relative_humidity_2m: Number(currentRaw.humidity),
    weather_code: mapWwoWeatherCode(currentRaw.weatherCode),
    apparent_temperature: Number(currentRaw.FeelsLikeC ?? currentRaw.temp_C),
    wind_speed_10m: Number(currentRaw.windspeedKmph),
    wind_direction_10m: Number(currentRaw.winddirDegree),
    uv_index: Number(currentRaw.uvIndex ?? 0),
    is_day: wttrIsDay(currentRaw, astronomy),
  };

  const hourly = {
    time: [],
    temperature_2m: [],
    weather_code: [],
    precipitation_probability: [],
  };

  for (const day of weatherDays) {
    const dayDate = day.date;
    const hours = Array.isArray(day.hourly) ? day.hourly : [];
    for (const slot of hours) {
      const hour = parseWttrHourValue(slot.time);
      const iso = `${dayDate}T${String(hour).padStart(2, "0")}:00`;
      if (dayDate === dateStr && hour < obsHour) continue;
      hourly.time.push(iso);
      hourly.temperature_2m.push(Number(slot.tempC));
      hourly.weather_code.push(mapWwoWeatherCode(slot.weatherCode));
      hourly.precipitation_probability.push(Number(slot.chanceofrain ?? 0));
      if (hourly.time.length >= 48) break;
    }
    if (hourly.time.length >= 48) break;
  }

  if (!hourly.time.length) {
    hourly.time.push(currentTime);
    hourly.temperature_2m.push(current.temperature_2m);
    hourly.weather_code.push(current.weather_code);
    hourly.precipitation_probability.push(0);
  }

  const dailyCount = Math.min(days, weatherDays.length, MAX_FORECAST_DAYS);
  const daily = {
    time: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    weather_code: [],
    precipitation_probability_max: [],
    sunrise: [],
    sunset: [],
  };

  for (let i = 0; i < dailyCount; i += 1) {
    const day = weatherDays[i];
    const hours = Array.isArray(day.hourly) ? day.hourly : [];
    const noon = hours.find((h) => parseWttrHourValue(h.time) === 12) || hours[Math.floor(hours.length / 2)] || {};
    const precipMax = hours.reduce((max, h) => Math.max(max, Number(h.chanceofrain ?? 0)), 0);
    const astro = day.astronomy?.[0] || {};
    daily.time.push(day.date);
    daily.temperature_2m_max.push(Number(day.maxtempC));
    daily.temperature_2m_min.push(Number(day.mintempC));
    daily.weather_code.push(mapWwoWeatherCode(noon.weatherCode ?? currentRaw.weatherCode));
    daily.precipitation_probability_max.push(precipMax);
    daily.sunrise.push(parseWttrClockToIso(day.date, astro.sunrise));
    daily.sunset.push(parseWttrClockToIso(day.date, astro.sunset));
  }

  return {
    latitude: Number(data?.nearest_area?.[0]?.latitude) || undefined,
    longitude: Number(data?.nearest_area?.[0]?.longitude) || undefined,
    current,
    hourly,
    daily,
    _source: "wttr",
  };
}

async function fetchWttrWeather(latitude, longitude, days = 5) {
  const url = `${WEATHER_FALLBACK_API}/${latitude},${longitude}?format=j1&lang=zh`;
  const res = await fetchWithTimeout(url, 15000);
  if (!res.ok) throw new Error("備援天氣服務暫時無法使用");
  const data = await res.json();
  return normalizeWttrWeather(data, days);
}

async function fetchWeather(latitude, longitude, days = 5) {
  try {
    return await fetchOpenMeteoWeather(latitude, longitude, days);
  } catch {
    // retry once
  }

  try {
    await sleep(400);
    return await fetchOpenMeteoWeather(latitude, longitude, days);
  } catch {
    // fall through to wttr
  }

  try {
    return await fetchWttrWeather(latitude, longitude, days);
  } catch {
    throw new Error("天氣服務暫時無法使用");
  }
}

function parseTravelQuery(input) {
  const trimmed = input.trim().normalize("NFKC");
  const match = trimmed.match(TRAVEL_DATE_PATTERN);
  if (!match) return null;

  let city = trimmed.replace(match[0], "").replace(/\s+/g, " ").trim();
  if (!city) {
    const idx = trimmed.indexOf(match[0]);
    if (idx > 0) {
      city = trimmed.slice(0, idx).replace(/\s+/g, " ").trim();
    }
  }
  if (!city) return null;

  const startDate = resolveTripDate(Number(match[1]), Number(match[2]));
  const endDate = resolveTripDate(Number(match[3]), Number(match[4]), startDate);
  if (endDate < startDate) return null;

  return { city, startDate, endDate, rawInput: trimmed };
}

function resolveTripDate(month, day, referenceDate = null) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);

  if (referenceDate) {
    const date = new Date(referenceDate.getFullYear(), month - 1, day, 12, 0, 0, 0);
    if (date < referenceDate) {
      date.setFullYear(referenceDate.getFullYear() + 1);
    }
    return date;
  }

  let year = now.getFullYear();
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (date < today) {
    date.setFullYear(year + 1);
  }
  return date;
}

function buildTripDates(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate && dates.length < MAX_TRIP_DAYS) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function calcForecastDays(endDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const daysFromToday = Math.floor((end.getTime() - today.getTime()) / 86400000) + 1;
  return Math.min(MAX_FORECAST_DAYS, Math.max(5, daysFromToday));
}

function dateToKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getForecastDateBounds(daily) {
  const times = daily?.time ?? [];
  return { first: times[0] ?? null, last: times.at(-1) ?? null };
}

function isDateWithinForecast(date, lastDateStr) {
  if (!lastDateStr) return false;
  return dateToKey(date) <= lastDateStr;
}

function formatForecastCutoffLabel(dateStr) {
  if (!dateStr) return "";
  const [, month, day] = dateStr.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function formatTripDateLabel(date) {
  const md = `${date.getMonth() + 1}/${date.getDate()}`;
  const weekday = date.toLocaleDateString("zh-TW", { weekday: "short" });
  return `${md} (${weekday})`;
}

function buildDailyWeatherMap(daily) {
  const map = new Map();
  if (!daily?.time?.length) return map;

  daily.time.forEach((dateStr, index) => {
    map.set(dateStr, {
      code: daily.weather_code[index],
      max: daily.temperature_2m_max[index],
      min: daily.temperature_2m_min[index],
      precipMax: daily.precipitation_probability_max?.[index] ?? 0,
    });
  });
  return map;
}

function buildTravelOutfitSuggestions(maxTemp, minTemp, code) {
  const items = [...buildOutfitSuggestions(maxTemp, code)];
  if (isCold(minTemp) && !items.some((item) => item.label === "保暖外套")) {
    items.unshift({ label: "保暖外套", icon: "jacket" });
  }
  return items.slice(0, 3);
}

function loadDailyDisplayPreference() {
  try {
    const raw = localStorage.getItem(FORECAST_DAYS_KEY);
    const days = Number(raw);
    if (DAILY_DISPLAY_OPTIONS.includes(days)) {
      dailyDisplayDays = days;
    }
  } catch {
    dailyDisplayDays = DEFAULT_DAILY_DISPLAY;
  }
}

function saveDailyDisplayPreference(days) {
  dailyDisplayDays = days;
  localStorage.setItem(FORECAST_DAYS_KEY, String(days));
}

function getEffectiveDailyDisplayDays() {
  if (travelDailyOverride != null) return travelDailyOverride;
  return dailyDisplayDays;
}

function clearTravelSummary() {
  if (!els.travelSummary) return;
  els.travelSummary.classList.add("hidden");
  if (els.travelDays) els.travelDays.innerHTML = "";
  travelFoodItems = [];
  travelSightItems = [];
  travelShareContext = null;
  travelDailyOverride = null;
  if (currentWeatherDaily) {
    renderDaily(currentWeatherDaily);
  }
}

function renderTravelSummary(
  cityName,
  tripDays,
  { foodError = "", sightError = "", forecastLastDate = "" } = {}
) {
  if (!els.travelSummary || !els.travelDays) return;

  travelFoodItems = [];
  travelSightItems = [];
  if (els.travelTitle) {
    els.travelTitle.textContent = `行程摘要 · ${cityName}`;
  }

  const forecastCutoff = forecastLastDate
    ? formatForecastCutoffLabel(forecastLastDate)
    : `${MAX_FORECAST_DAYS} 天`;

  els.travelDays.innerHTML = tripDays
    .map((day) => {
      if (day.outOfRange) {
        return `
        <article class="travel-day travel-day-muted">
          <h3 class="travel-day-title">${day.dateLabel}</h3>
          <p class="travel-day-note">此日期超出預報範圍（可預報至 ${forecastCutoff}）</p>
        </article>`;
      }

      const rainNote =
        day.precipMax >= 50 || isRainy(day.code)
          ? `<span class="travel-rain-note">建議攜帶雨具</span>`
          : "";

      const outfitHtml = day.outfit
        .map((item) => `<span class="travel-outfit-tag">${item.label}</span>`)
        .join("");

      let foodHtml = "";
      if (day.restaurant) {
        travelFoodItems.push(day.restaurant);
        const foodIndex = travelFoodItems.length - 1;
        foodHtml = `
          <button
            type="button"
            class="travel-place-btn travel-food-btn"
            data-travel-food-index="${foodIndex}"
            aria-label="在 Google Maps 開啟${day.restaurant.name}"
          >
            <span class="travel-place-name">${day.restaurant.name}</span>
            <span class="travel-place-meta">★ ${day.restaurant.rating.toFixed(1)} · ${day.restaurant.desc}</span>
          </button>`;
      } else if (foodError) {
        foodHtml = `<p class="travel-day-note">${foodError}</p>`;
      } else {
        foodHtml = `<p class="travel-day-note">附近暫無 4 顆星以上餐廳</p>`;
      }

      let sightHtml = "";
      if (day.sight) {
        travelSightItems.push(day.sight);
        const sightIndex = travelSightItems.length - 1;
        sightHtml = `
          <button
            type="button"
            class="travel-place-btn travel-sight-btn"
            data-travel-sight-index="${sightIndex}"
            aria-label="在 Google Maps 開啟${day.sight.name}"
          >
            <span class="travel-place-name">${day.sight.name}</span>
            <span class="travel-place-meta">★ ${day.sight.rating.toFixed(1)} · ${day.sight.desc}</span>
          </button>`;
      } else if (sightError) {
        sightHtml = `<p class="travel-day-note">${sightError}</p>`;
      } else {
        sightHtml = `<p class="travel-day-note">附近暫無 4 顆星以上景點</p>`;
      }

      return `
      <article class="travel-day">
        <h3 class="travel-day-title">${day.dateLabel}</h3>
        <div class="travel-row travel-row-weather">
          <div class="travel-weather-icon">${iconSvg("mini", day.code)}</div>
          <div>
            <p class="travel-weather-main">${day.label} · ${day.maxTemp}° / ${day.minTemp}°</p>
            ${rainNote}
          </div>
        </div>
        <div class="travel-row">
          <span class="travel-row-label">穿搭</span>
          <div class="travel-outfit-tags">${outfitHtml}</div>
        </div>
        <div class="travel-row">
          <span class="travel-row-label">美食</span>
          <div class="travel-place-wrap">${foodHtml}</div>
        </div>
        <div class="travel-row">
          <span class="travel-row-label">景點</span>
          <div class="travel-place-wrap">${sightHtml}</div>
        </div>
      </article>`;
    })
    .join("");

  els.travelSummary.classList.remove("hidden");
  els.travelSummary.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function enterTravelMode(parsed) {
  const { city, startDate, endDate, rawInput } = parsed;
  setError("");
  setLoading(true);

  try {
    const geoCity = await geocodeCity(city);
    const tripDates = buildTripDates(startDate, endDate);

    const [weatherResult, placesResult] = await Promise.allSettled([
      fetchWeather(geoCity.latitude, geoCity.longitude, MAX_FORECAST_DAYS),
      fetchNearbyRecommendations(geoCity.latitude, geoCity.longitude, geoCity.name),
    ]);

    if (weatherResult.status === "rejected") {
      throw weatherResult.reason;
    }

    const weather = weatherResult.value;
    let restaurants = [];
    let sights = [];
    let foodError = "";
    let sightError = "";

    if (placesResult.status === "fulfilled") {
      restaurants = placesResult.value.food;
      sights = placesResult.value.sights;
      foodError = placesResult.value.foodError || "";
      sightError = placesResult.value.sightError || "";
    } else if (placesResult.reason?.message === "NO_API_KEY") {
      foodError = "請設定 Google Places API Key 以顯示美食推薦";
      sightError = "請設定 Google Places API Key 以顯示景點推薦";
    } else {
      foodError = "無法載入美食推薦";
      sightError = "無法載入景點推薦";
    }

    renderWeather(geoCity, weather);

    const forecastLastDate = getForecastDateBounds(weather.daily).last;
    const startMd = `${startDate.getMonth() + 1}/${startDate.getDate()}`;
    const endMd = `${endDate.getMonth() + 1}/${endDate.getDate()}`;

    if (!isDateWithinForecast(startDate, forecastLastDate)) {
      const forecastLastLabel = formatForecastCutoffLabel(forecastLastDate);
      setError(
        `行程起始日（${startMd}）超出可預報範圍。Open-Meteo 最多提供自今天起 ${MAX_FORECAST_DAYS} 天，目前可預報至 ${forecastLastLabel}。`
      );
      clearTravelSummary();
      els.searchHint.textContent = `旅遊行程：${geoCity.name}（${startMd}–${endMd}）— 日期超出預報範圍`;
      els.cityInput.value = rawInput;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: geoCity.name,
          latitude: geoCity.latitude,
          longitude: geoCity.longitude,
        })
      );
      return;
    }

    const dailyMap = buildDailyWeatherMap(weather.daily);
    const tripDays = tripDates.map((date, index) => {
      const key = dateToKey(date);
      const wx = dailyMap.get(key);

      if (!wx) {
        return {
          date,
          dateLabel: formatTripDateLabel(date),
          outOfRange: true,
        };
      }

      const maxTemp = Math.round(wx.max);
      const minTemp = Math.round(wx.min);
      return {
        date,
        dateLabel: formatTripDateLabel(date),
        outOfRange: false,
        code: wx.code,
        maxTemp,
        minTemp,
        precipMax: Math.round(wx.precipMax),
        label: weatherLabel(wx.code),
        outfit: buildTravelOutfitSuggestions(maxTemp, minTemp, wx.code),
        restaurant: restaurants.length ? restaurants[index % restaurants.length] : null,
        sight: sights.length ? sights[index % sights.length] : null,
      };
    });

    renderTravelSummary(geoCity.name, tripDays, {
      foodError,
      sightError,
      forecastLastDate,
    });

    travelDailyOverride = Math.min(tripDates.length, MAX_FORECAST_DAYS);
    renderDaily(weather.daily, travelDailyOverride);

    travelShareContext = {
      cityName: geoCity.name,
      dateRange: `${startMd}–${endMd}`,
      tripDays,
      forecastLastDate,
    };

    els.searchHint.textContent = `旅遊行程：${geoCity.name}（${startMd}–${endMd}）`;
    els.cityInput.value = rawInput;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name: geoCity.name,
        latitude: geoCity.latitude,
        longitude: geoCity.longitude,
      })
    );
  } catch (err) {
    setError(err.message || "查詢失敗，請稍後再試");
    clearWeatherOnError();
    clearTravelSummary();
    renderOutfit(25, 3);
    renderFoodList([], false, { message: "無法載入美食推薦" });
    renderSightList([], false, { message: "無法載入旅遊推薦" });
  } finally {
    setLoading(false);
  }
}

async function reverseGeocode(latitude, longitude) {
  const url = new URL(REVERSE_GEO_API);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("localityLanguage", "zh");

  try {
    const res = await fetchWithTimeout(url.toString());
    if (!res.ok) return null;
    const data = await res.json();
    const parts = [];
    if (data.locality) parts.push(data.locality);
    if (data.city && data.city !== data.locality) parts.push(data.city);
    if (!parts.length && data.countryName) parts.push(data.countryName);
    const name = parts.length ? parts.join(", ") : null;
    const countryCode = normalizeCountryCode(data.countryCode || data.country_code);
    if (!name && !countryCode) return null;
    return { name: name || data.countryName || "我的位置", countryCode };
  } catch {
    return null;
  }
}

function geolocationErrorMessage(error) {
  if (error.code === error.PERMISSION_DENIED) {
    return "請允許瀏覽器存取位置，或手動輸入城市";
  }
  if (error.code === error.TIMEOUT) {
    return "無法取得位置，請稍後再試";
  }
  return "無法取得位置，請稍後再試";
}

async function queryByCoords(latitude, longitude) {
  setError("");
  setLoading(true);
  clearTravelSummary();
  try {
    const [weather, placeInfo] = await Promise.all([
      fetchWeather(latitude, longitude, MAX_FORECAST_DAYS),
      reverseGeocode(latitude, longitude),
    ]);
    const city = {
      name: placeInfo?.name ?? "我的位置",
      latitude,
      longitude,
      countryCode: placeInfo?.countryCode || "",
    };
    renderWeather(city, weather);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
  } catch (err) {
    setError(err.message || "查詢失敗，請稍後再試");
    clearWeatherOnError();
    renderOutfit(25, 3);
    renderFoodList([], false, { message: "無法載入美食推薦" });
    renderSightList([], false, { message: "無法載入旅遊推薦" });
  } finally {
    setLoading(false);
  }
}

async function querySavedCity(city) {
  setError("");
  setLoading(true);
  clearTravelSummary();
  try {
    const weather = await fetchWeather(city.latitude, city.longitude, MAX_FORECAST_DAYS);
    renderWeather(city, weather);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
  } catch (err) {
    setError(err.message || "查詢失敗，請稍後再試");
    clearWeatherOnError();
    renderOutfit(25, 3);
    renderFoodList([], false, { message: "無法載入美食推薦" });
    renderSightList([], false, { message: "無法載入旅遊推薦" });
  } finally {
    setLoading(false);
  }
}

async function refreshCurrent() {
  if (pullRefreshing) return;
  pullRefreshing = true;
  setPullRefreshState("refreshing");

  try {
    const travel = parseTravelQuery(els.cityInput.value.trim());
    if (travel) {
      await enterTravelMode(travel);
      return;
    }
    if (currentCity?.latitude == null || currentCity?.longitude == null) return;
    placesCache = { key: "", food: [], sights: [], expiresAt: 0 };
    await querySavedCity(currentCity);
  } finally {
    pullRefreshing = false;
    resetPullRefreshIndicator();
  }
}

function pageScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function setPullRefreshState(state) {
  const el = els.pullRefresh;
  if (!el) return;
  el.classList.toggle("is-visible", state === "pulling" || state === "ready" || state === "refreshing");
  el.classList.toggle("is-ready", state === "ready");
  el.classList.toggle("is-refreshing", state === "refreshing");
  if (state === "refreshing") {
    el.style.transform = `translateY(calc(-100% + ${PULL_THRESHOLD}px))`;
  }
  const label = el.querySelector(".pull-refresh-label");
  if (label) {
    if (state === "ready") label.textContent = "放開更新";
    else if (state === "refreshing") label.textContent = "更新中…";
    else label.textContent = "下拉更新";
  }
  el.setAttribute("aria-hidden", state === "idle" ? "true" : "false");
}

function resetPullRefreshIndicator() {
  const el = els.pullRefresh;
  if (el) el.style.transform = "";
  setPullRefreshState("idle");
}

function updatePullRefreshIndicator(distance) {
  const el = els.pullRefresh;
  if (!el) return;
  const ready = distance >= PULL_THRESHOLD;
  setPullRefreshState(ready ? "ready" : "pulling");
  const offset = Math.min(distance, PULL_MAX);
  el.style.transform = `translateY(calc(-100% + ${offset}px))`;
}

function initPullRefresh() {
  const root = document.querySelector(".phone") || $("app") || document.body;
  if (!root || !els.pullRefresh) return;

  let startY = 0;
  let pulling = false;
  let distance = 0;

  const onStart = (e) => {
    if (pullRefreshing) return;
    if (pageScrollTop() > 0) return;
    const target = e.target;
    if (target?.closest?.(PULL_IGNORE_SELECTOR)) return;
    if (target?.closest?.("input, textarea, button, select, a")) return;
    startY = e.touches[0].clientY;
    pulling = true;
    distance = 0;
  };

  const onMove = (e) => {
    if (!pulling || pullRefreshing) return;
    if (pageScrollTop() > 0) {
      pulling = false;
      distance = 0;
      resetPullRefreshIndicator();
      return;
    }
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) {
      distance = 0;
      resetPullRefreshIndicator();
      return;
    }
    distance = dy * PULL_RESISTANCE;
    if (distance > 8) e.preventDefault();
    updatePullRefreshIndicator(distance);
  };

  const onEnd = () => {
    if (!pulling) return;
    pulling = false;
    if (pullRefreshing) return;
    if (distance >= PULL_THRESHOLD) {
      refreshCurrent();
    } else {
      resetPullRefreshIndicator();
    }
    distance = 0;
  };

  root.addEventListener("touchstart", onStart, { passive: true });
  root.addEventListener("touchmove", onMove, { passive: false });
  root.addEventListener("touchend", onEnd, { passive: true });
  root.addEventListener("touchcancel", onEnd, { passive: true });
}

function queryCurrentLocation() {
  if (!navigator.geolocation) {
    setError("此瀏覽器不支援定位功能");
    return;
  }
  setError("");
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => queryByCoords(pos.coords.latitude, pos.coords.longitude),
    (err) => {
      setLoading(false);
      setError(geolocationErrorMessage(err));
    },
    { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
  );
}

function nearestHourlyIndex(times, targetHour) {
  const target = new Date();
  target.setHours(targetHour, 0, 0, 0);
  let best = 0;
  let bestDiff = Infinity;
  times.forEach((iso, idx) => {
    const diff = Math.abs(new Date(iso).getTime() - target.getTime());
    if (diff < bestDiff) {
      bestDiff = diff;
      best = idx;
    }
  });
  return best;
}

function getPlacesApiKey() {
  const key = window.APP_CONFIG?.GOOGLE_PLACES_API_KEY?.trim();
  if (!key || key.includes("在此填入")) return "";
  return key;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function mapPlaceIcon(primaryType = "") {
  const type = String(primaryType).toLowerCase();
  if (type.includes("coffee") || type.includes("cafe")) return "coffee";
  if (type.includes("salad") || type.includes("vegetarian") || type.includes("health")) {
    return "salad";
  }
  return "bowl";
}

function mapSightIcon(primaryType = "") {
  const type = String(primaryType).toLowerCase();
  if (type.includes("museum") || type.includes("gallery")) return "museum";
  if (type.includes("park") || type.includes("garden") || type.includes("zoo")) return "park";
  if (type.includes("landmark") || type.includes("monument") || type.includes("temple")) {
    return "landmark";
  }
  return "camera";
}

function formatPlaceDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)} 公尺`;
  return `${(meters / 1000).toFixed(1)} 公里`;
}

function formatFoodDistance(meters) {
  return formatPlaceDistance(meters);
}

function normalizePlace(place, originLat, originLng) {
  const lat = place.location?.latitude ?? originLat;
  const lng = place.location?.longitude ?? originLng;
  const desc = place.primaryTypeDisplayName?.text || "餐廳";

  return {
    id: place.id || "",
    name: place.displayName?.text || "未命名餐廳",
    desc,
    icon: mapPlaceIcon(place.primaryType || desc),
    rating: place.rating ?? 0,
    distanceMeters: haversineDistance(originLat, originLng, lat, lng),
    mapsUrl: place.googleMapsUri || "",
    latitude: lat,
    longitude: lng,
    kind: "food",
  };
}

function normalizeSight(place, originLat, originLng) {
  const lat = place.location?.latitude ?? originLat;
  const lng = place.location?.longitude ?? originLng;
  const desc = place.primaryTypeDisplayName?.text || "景點";

  return {
    id: place.id || "",
    name: place.displayName?.text || "未命名景點",
    desc,
    icon: mapSightIcon(place.primaryType || desc),
    rating: place.rating ?? 0,
    distanceMeters: haversineDistance(originLat, originLng, lat, lng),
    mapsUrl: place.googleMapsUri || "",
    latitude: lat,
    longitude: lng,
    kind: "sight",
  };
}

function sortByPopularity(places) {
  return [...places].sort((a, b) => {
    const countDiff = (b.userRatingCount ?? 0) - (a.userRatingCount ?? 0);
    if (countDiff !== 0) return countDiff;
    return (b.rating ?? 0) - (a.rating ?? 0);
  });
}

function buildAreaSearchQuery(cityName, kind = "both") {
  const area = String(cityName || currentCity?.name || "").trim();
  if (!area) {
    if (kind === "food") return "restaurant";
    if (kind === "sight") return "tourist attraction";
    return "restaurants and tourist attractions";
  }
  if (kind === "food") return `${area} 美食推薦`;
  if (kind === "sight") return `${area} 景點 旅遊推薦`;
  return `${area} 美食 景點推薦`;
}

function buildFoodSearchQueries(cityName) {
  const area = String(cityName || currentCity?.name || "").trim();
  if (!area) return ["restaurant"];
  const queries = [`${area} 美食推薦`, `${area} 餐廳`];
  if (area.includes("基隆")) queries.push("基隆廟口夜市");
  return queries;
}

function passesRatingFilter(place, kind = "food") {
  const minRating = kind === "sight" ? MIN_SIGHT_RATING : MIN_FOOD_RATING;
  const minCount = kind === "sight" ? MIN_SIGHT_RATING_COUNT : MIN_FOOD_RATING_COUNT;
  return (place.rating ?? 0) >= minRating && (place.userRatingCount ?? 0) >= minCount;
}

function dedupePlaces(places) {
  const seen = new Set();
  return places.filter((place) => {
    const key = [
      place.id,
      place.displayName?.text,
      place.location?.latitude?.toFixed(4),
      place.location?.longitude?.toFixed(4),
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const FOOD_PLACE_TYPES = new Set([
  "restaurant",
  "cafe",
  "bakery",
  "bar",
  "meal_delivery",
  "meal_takeaway",
  "food",
  "ice_cream_shop",
  "coffee_shop",
  "fast_food_restaurant",
  "brunch_restaurant",
  "night_market",
  "food_court",
  "market",
  "tea_house",
  "asian_restaurant",
  "chinese_restaurant",
  "japanese_restaurant",
  "korean_restaurant",
  "thai_restaurant",
  "vietnamese_restaurant",
  "indian_restaurant",
  "italian_restaurant",
  "seafood_restaurant",
  "steak_house",
  "sushi_restaurant",
  "ramen_restaurant",
  "barbecue_restaurant",
  "dessert_shop",
  "donut_shop",
  "sandwich_shop",
  "hamburger_restaurant",
  "pizza_restaurant",
  "delicatessen_store",
  "noodle_restaurant",
  "breakfast_restaurant",
  "buffet_restaurant",
  "fine_dining_restaurant",
  "pub",
  "wine_bar",
  "cat_cafe",
  "dog_cafe",
  "juice_shop",
  "candy_store",
  "chocolate_shop",
  "confectionery",
  "grocery_store",
  "supermarket",
]);

const NON_FOOD_PLACE_TYPES = new Set([
  "place_of_worship",
  "church",
  "hindu_temple",
  "mosque",
  "synagogue",
  "buddhist_temple",
  "cemetery",
  "school",
  "primary_school",
  "secondary_school",
  "university",
  "hospital",
  "doctor",
  "dentist",
  "pharmacy",
  "veterinary_care",
  "gas_station",
  "parking",
  "bank",
  "atm",
  "post_office",
  "police",
  "fire_station",
  "local_government_office",
  "city_hall",
  "courthouse",
  "library",
  "gym",
  "spa",
  "hair_care",
  "beauty_salon",
  "laundry",
  "car_wash",
  "car_repair",
  "lodging",
  "hotel",
  "motel",
  "real_estate_agency",
  "insurance_agency",
  "lawyer",
  "accounting",
  "store",
  "shopping_mall",
  "department_store",
  "convenience_store",
  "electronics_store",
  "furniture_store",
  "home_goods_store",
  "clothing_store",
  "shoe_store",
  "jewelry_store",
  "pet_store",
  "florist",
  "hardware_store",
  "book_store",
  "sporting_goods_store",
  "bicycle_store",
  "tourist_attraction",
  "museum",
  "park",
  "national_park",
  "state_park",
  "city_park",
  "zoo",
  "amusement_park",
  "art_gallery",
  "aquarium",
  "botanical_garden",
  "historical_landmark",
  "marina",
  "observation_deck",
  "planetarium",
  "performing_arts_theater",
  "cultural_center",
  "stadium",
  "campground",
  "hiking_area",
]);

const NON_FOOD_NAME_KEYWORDS = ["禮拜場所", "宮", "廟", "寺", "祠堂", "陵", "祖師廟", "天公廟"];

const FOOD_DISPLAY_KEYWORDS = [
  "餐廳",
  "小吃",
  "美食",
  "麵食",
  "熟食",
  "咖啡",
  "茶寮",
  "飲料",
  "火鍋",
  "燒肉",
  "拉麵",
  "壽司",
  "早餐",
  "午餐",
  "晚餐",
  "宵夜",
  "甜品",
  "烘焙",
  "牛肉麵",
  "餡餅",
  "越南",
  "日式",
  "中式",
];

function isFoodPlace(place) {
  const type = String(place.primaryType ?? "").toLowerCase();
  const display = place.primaryTypeDisplayName?.text || "";
  const name = place.displayName?.text || "";

  if (NON_FOOD_PLACE_TYPES.has(type)) return false;
  if (
    type.includes("worship") ||
    type.includes("temple") ||
    type.includes("church") ||
    type.includes("cemetery") ||
    type.includes("school") ||
    type.includes("hospital")
  ) {
    return false;
  }

  for (const keyword of NON_FOOD_NAME_KEYWORDS) {
    if (display.includes(keyword) || name.includes(keyword)) return false;
  }

  if (
    FOOD_PLACE_TYPES.has(type) ||
    type.includes("restaurant") ||
    type.includes("cafe") ||
    type.includes("food") ||
    type.includes("bakery") ||
    type.includes("deli")
  ) {
    return true;
  }

  for (const keyword of FOOD_DISPLAY_KEYWORDS) {
    if (display.includes(keyword) || name.includes(keyword)) return true;
  }

  return classifyPlaceKind(type, display) === "food";
}

function isSightPlace(place) {
  const type = String(place.primaryType ?? "").toLowerCase();
  const display = place.primaryTypeDisplayName?.text || "";
  if (isFoodPlace(place)) return false;
  return classifyPlaceKind(type, display) === "sight";
}

const SIGHT_PLACE_TYPES = new Set([
  "tourist_attraction",
  "museum",
  "park",
  "national_park",
  "state_park",
  "city_park",
  "zoo",
  "amusement_park",
  "art_gallery",
  "aquarium",
  "botanical_garden",
  "historical_landmark",
  "marina",
  "observation_deck",
  "planetarium",
  "performing_arts_theater",
  "cultural_center",
  "church",
  "hindu_temple",
  "mosque",
  "synagogue",
  "stadium",
  "campground",
  "hiking_area",
  "night_market",
  "food_court",
  "market",
  "shopping_mall",
]);

function classifyPlaceKind(primaryType = "", typeDisplayName = "") {
  const type = String(primaryType).toLowerCase();
  const display = String(typeDisplayName).toLowerCase();
  if (FOOD_PLACE_TYPES.has(type) || type.includes("restaurant") || type.includes("cafe") || type.includes("food")) {
    return "food";
  }
  if (
    SIGHT_PLACE_TYPES.has(type) ||
    type.includes("tourist") ||
    type.includes("museum") ||
    type.includes("park") ||
    type.includes("landmark")
  ) {
    return "sight";
  }
  if (
    display.includes("觀光") ||
    display.includes("景點") ||
    display.includes("博物館") ||
    display.includes("公園") ||
    display.includes("夜市") ||
    display.includes("廟口") ||
    display.includes("attraction") ||
    display.includes("museum")
  ) {
    return "sight";
  }
  if (
    display.includes("餐廳") ||
    display.includes("小吃") ||
    display.includes("美食") ||
    display.includes("restaurant")
  ) {
    return "food";
  }
  return null;
}

function mapFoodPlaces(places, latitude, longitude, cityName = "") {
  return sortByPopularity(
    filterPlacesWithinRadius(places, latitude, longitude, cityName)
      .filter((place) => passesRatingFilter(place, "food"))
      .filter(isFoodPlace)
  )
    .map((place) => normalizePlace(place, latitude, longitude))
    .slice(0, 10);
}

function mapSightPlaces(places, latitude, longitude, cityName = "") {
  return sortByPopularity(
    filterPlacesWithinRadius(places, latitude, longitude, cityName)
      .filter((place) => passesRatingFilter(place, "sight"))
      .filter(isSightPlace)
  )
    .map((place) => normalizeSight(place, latitude, longitude))
    .slice(0, 10);
}

async function searchFoodOnly(latitude, longitude, cityName = "") {
  const apiKey = getPlacesApiKey();
  if (!apiKey) throw new Error("NO_API_KEY");

  const queries = buildFoodSearchQueries(cityName);
  let merged = [];

  for (const textQuery of queries) {
    const res = await fetchWithOptions(PLACES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.rating,places.location,places.googleMapsUri,places.primaryTypeDisplayName,places.primaryType,places.userRatingCount",
      },
      body: JSON.stringify(
        buildPlacesSearchOptions(
          latitude,
          longitude,
          {
            textQuery,
            includedType: "restaurant",
            strictTypeFiltering: false,
            maxResultCount: PLACES_MAX_RESULTS,
            ...(foodOpenNowOnly ? { openNow: true } : {}),
          },
          cityName
        )
      ),
    });

    if (!res.ok) continue;

    const data = await res.json();
    merged = dedupePlaces([...merged, ...(data.places ?? [])]);
    if (merged.filter(isFoodPlace).length >= 10) break;
  }

  return mapFoodPlaces(merged, latitude, longitude, cityName);
}

async function searchSightsOnly(latitude, longitude, cityName = "") {
  const apiKey = getPlacesApiKey();
  if (!apiKey) throw new Error("NO_API_KEY");

  const res = await fetchWithOptions(PLACES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.rating,places.location,places.googleMapsUri,places.primaryTypeDisplayName,places.primaryType,places.userRatingCount",
    },
    body: JSON.stringify(
      buildPlacesSearchOptions(
        latitude,
        longitude,
        {
          textQuery: buildAreaSearchQuery(cityName, "sight"),
          maxResultCount: PLACES_MAX_RESULTS,
        },
        cityName
      )
    ),
  });

  if (!res.ok) throw new Error("PLACES_API_ERROR");

  const data = await res.json();
  return mapSightPlaces(data.places ?? [], latitude, longitude, cityName);
}

function placesCacheKey(latitude, longitude, cityName = "") {
  const area = String(cityName || currentCity?.name || "").trim();
  const openFlag = foodOpenNowOnly ? "open" : "all";
  return `${area}|${latitude.toFixed(3)},${longitude.toFixed(3)}|${openFlag}`;
}

function getPlacesCache(latitude, longitude, cityName = "") {
  const key = placesCacheKey(latitude, longitude, cityName);
  if (placesCache.key === key && Date.now() < placesCache.expiresAt) {
    return { food: placesCache.food, sights: placesCache.sights };
  }
  return null;
}

function setPlacesCache(latitude, longitude, food, sights, cityName = "") {
  placesCache = {
    key: placesCacheKey(latitude, longitude, cityName),
    food,
    sights,
    expiresAt: Date.now() + PLACES_CACHE_TTL_MS,
  };
}

function resolvePlaceFetchError(err, kind) {
  if (!err) return "";
  if (err.message === "NO_API_KEY") {
    return kind === "food"
      ? "請設定 Google Places API Key 以顯示美食推薦"
      : "請設定 Google Places API Key 以顯示景點推薦";
  }
  return placesErrorMessage(err, kind === "food" ? "美食" : "景點");
}

async function fetchNearbyRecommendations(latitude, longitude, cityName = "") {
  const label = cityName || currentCity?.name || "";
  const cached = getPlacesCache(latitude, longitude, label);
  if (cached) {
    return {
      food: cached.food,
      sights: cached.sights,
      foodError: "",
      sightError: "",
    };
  }

  const [foodResult, sightsResult] = await Promise.allSettled([
    searchFoodOnly(latitude, longitude, label),
    searchSightsOnly(latitude, longitude, label),
  ]);

  const result = {
    food: foodResult.status === "fulfilled" ? foodResult.value : [],
    sights: sightsResult.status === "fulfilled" ? sightsResult.value : [],
    foodError:
      foodResult.status === "rejected" ? resolvePlaceFetchError(foodResult.reason, "food") : "",
    sightError:
      sightsResult.status === "rejected"
        ? resolvePlaceFetchError(sightsResult.reason, "sight")
        : "",
  };

  setPlacesCache(latitude, longitude, result.food, result.sights, label);
  return result;
}

function placesErrorMessage(err, kind) {
  if (err.message === "NO_API_KEY") {
    return `無法載入${kind}，請確認 API Key 設定（本機：config.js；線上：GitHub Secret）`;
  }
  if (err.status === 429) {
    return `${kind}查詢已達 API 用量上限，請稍後再試或檢查 Google Cloud 配額`;
  }
  if (err.status === 403) {
    return `${kind} API 金鑰被拒（請檢查金鑰限制、帳單或是否已啟用 Places API）`;
  }
  return `無法載入${kind}，請稍後再試`;
}

async function loadNearbyPlaces(latitude, longitude) {
  const token = ++placesLoadToken;
  foodExpanded = false;
  sightExpanded = false;
  renderFoodList([], false, { loading: true });
  renderSightList([], false, { loading: true });

  try {
    const { food, sights } = await fetchNearbyRecommendations(
      latitude,
      longitude,
      currentCity?.name || ""
    );
    if (token !== placesLoadToken) return;

    foodItems = food;
    sightItems = sights;

    if (!food.length) {
      renderFoodList([], false, {
        message: foodOpenNowOnly
          ? "附近暫無營業中的 4 顆星以上餐廳"
          : "附近暫無 4 顆星以上餐廳",
      });
    } else {
      renderFoodList(foodItems, false);
    }

    if (!sights.length) {
      renderSightList([], false, { message: "附近暫無 4 顆星以上景點" });
    } else {
      renderSightList(sightItems, false);
    }
  } catch (err) {
    if (token !== placesLoadToken) return;
    foodItems = [];
    sightItems = [];
    const message = placesErrorMessage(err, "美食與旅遊推薦");
    renderFoodList([], false, { message });
    renderSightList([], false, { message });
  }
}

function buildOutfitSuggestions(temp, code) {
  const items = [];
  if (isHot(temp)) items.push({ label: "透氣短袖", icon: "shirt" });
  if (isCold(temp)) items.push({ label: "保暖外套", icon: "jacket" });
  if (isRainy(code)) {
    items.push({ label: "攜帶雨具", icon: "umbrella" });
    items.push({ label: "防水鞋款", icon: "shoe" });
  } else {
    items.push({ label: "舒適鞋款", icon: "shoe" });
  }
  if (items.length < 3) items.unshift({ label: "輕便穿搭", icon: "shirt" });
  return items.slice(0, 3);
}

function renderOutfit(temp, code) {
  const items = buildOutfitSuggestions(temp, code);
  els.outfitGrid.innerHTML = items
    .map(
      (item) => `
      <article class="outfit-item">
        ${iconSvg(item.icon)}
        <p>${item.label}</p>
      </article>`
    )
    .join("");
}

function buildMapsUrl(item) {
  if (item.mapsUrl) return item.mapsUrl;
  const query = `${item.name} ${currentCity.name}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function buildFoodMapsUrl(item) {
  return buildMapsUrl(item);
}

function openFoodOnMaps(item) {
  window.open(buildMapsUrl(item), "_blank", "noopener,noreferrer");
}

function openSightOnMaps(item) {
  window.open(buildMapsUrl(item), "_blank", "noopener,noreferrer");
}

function handleFoodItemAction(row) {
  const index = Number(row.dataset.foodIndex);
  const item = displayedFoodItems[index];
  if (item) openFoodOnMaps(item);
}

function handleSightItemAction(row) {
  const index = Number(row.dataset.sightIndex);
  const item = displayedSightItems[index];
  if (item) openSightOnMaps(item);
}

function placeFavButtonHtml(item) {
  const favorited = isPlaceFavorite(item.id);
  return `
    <button
      type="button"
      class="place-fav-btn${favorited ? " active" : ""}"
      data-place-fav-toggle="1"
      aria-label="${favorited ? "取消收藏" : "收藏"}${item.name}"
      aria-pressed="${favorited}"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.3l-6.2 3.3 1.2-6.9L2 8.7l6.9-1L12 1.5l3.1 6.2 6.9 1-5 5 1.2 6.9z" fill="${
        favorited ? "currentColor" : "none"
      }" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
    </button>`;
}

function renderFoodList(items = foodItems, showAll = foodExpanded, state = {}) {
  foodExpanded = showAll;

  if (state.loading) {
    displayedFoodItems = [];
    els.foodList.innerHTML = `<li class="place-status">載入美食推薦中…</li>`;
    els.viewAllFood.classList.add("hidden");
    return;
  }

  if (state.message) {
    displayedFoodItems = [];
    els.foodList.innerHTML = `<li class="place-status">${state.message}</li>`;
    els.viewAllFood.classList.add("hidden");
    return;
  }

  const picks = showAll ? items : items.slice(0, 3);
  displayedFoodItems = picks;

  if (!picks.length) {
    els.foodList.innerHTML = `<li class="place-status">${
      foodOpenNowOnly ? "附近暫無營業中的 4 顆星以上餐廳" : "附近暫無 4 顆星以上餐廳"
    }</li>`;
    els.viewAllFood.classList.add("hidden");
    return;
  }

  els.viewAllFood.classList.remove("hidden");
  els.foodList.innerHTML = picks
    .map(
      (item, i) => `
      <li
        class="food-item"
        role="button"
        tabindex="0"
        data-food-index="${i}"
        aria-label="在 Google Maps 開啟${item.name}"
      >
        ${iconSvg(item.icon)}
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc} · ${formatPlaceDistance(item.distanceMeters)}</p>
        </div>
        <span class="rating">★ ${item.rating.toFixed(1)}</span>
        ${placeFavButtonHtml(item)}
      </li>`
    )
    .join("");
  els.viewAllFood.textContent = showAll ? "收合" : "查看全部";
  els.viewAllFood.setAttribute("aria-expanded", String(showAll));
  els.viewAllFood.classList.toggle("hidden", items.length <= 3);
}

function renderSightList(items = sightItems, showAll = sightExpanded, state = {}) {
  if (!els.sightList || !els.viewAllSights) return;

  sightExpanded = showAll;

  if (state.loading) {
    displayedSightItems = [];
    els.sightList.innerHTML = `<li class="place-status">載入旅遊推薦中…</li>`;
    els.viewAllSights.classList.add("hidden");
    return;
  }

  if (state.message) {
    displayedSightItems = [];
    els.sightList.innerHTML = `<li class="place-status">${state.message}</li>`;
    els.viewAllSights.classList.add("hidden");
    return;
  }

  const picks = showAll ? items : items.slice(0, 3);
  displayedSightItems = picks;

  if (!picks.length) {
    els.sightList.innerHTML = `<li class="place-status">附近暫無 4 顆星以上景點</li>`;
    els.viewAllSights.classList.add("hidden");
    return;
  }

  els.viewAllSights.classList.remove("hidden");
  els.sightList.innerHTML = picks
    .map(
      (item, i) => `
      <li
        class="sight-item"
        role="button"
        tabindex="0"
        data-sight-index="${i}"
        aria-label="在 Google Maps 開啟${item.name}"
      >
        ${iconSvg(item.icon)}
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc} · ${formatPlaceDistance(item.distanceMeters)}</p>
        </div>
        <span class="rating">★ ${item.rating.toFixed(1)}</span>
        ${placeFavButtonHtml(item)}
      </li>`
    )
    .join("");
  els.viewAllSights.textContent = showAll ? "收合" : "查看全部";
  els.viewAllSights.setAttribute("aria-expanded", String(showAll));
  els.viewAllSights.classList.toggle("hidden", items.length <= 3);
}

function getNextHourlyIndices(hourly, count = 24, referenceIso = null) {
  const times = hourly?.time ?? [];
  if (!times.length) return [];

  let start = 0;
  if (referenceIso) {
    const ref = String(referenceIso).slice(0, 13);
    start = times.findIndex((iso) => String(iso).slice(0, 13) >= ref);
    if (start < 0) start = Math.max(0, times.length - 1);
  } else {
    const now = new Date();
    const currentHour = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      0,
      0,
      0
    );
    start = times.findIndex((iso) => new Date(iso).getTime() >= currentHour.getTime());
    if (start < 0) start = Math.max(0, times.length - 1);
  }

  const indices = [];
  for (let i = start; i < times.length && indices.length < count; i += 1) {
    indices.push(i);
  }
  return indices;
}

function formatHourlyLabel(iso, isFirst) {
  if (isFirst) return "現在";
  const hour = localHourFromIso(iso);
  return `${String(hour).padStart(2, "0")}:00`;
}

function renderHourly(hourly, referenceIso = null) {
  if (!hourly?.time?.length) {
    els.hourlyForecast.innerHTML = "";
    return;
  }

  const indices = getNextHourlyIndices(hourly, 24, referenceIso);
  els.hourlyForecast.innerHTML = indices
    .map((idx, position) => {
      const iso = hourly.time[idx];
      const hour = localHourFromIso(iso);
      const temp = Math.round(hourly.temperature_2m[idx]);
      const code = hourly.weather_code[idx];
      const precip = hourly.precipitation_probability?.[idx];
      const precipHtml =
        precip != null
          ? `<p class="precip">${Math.round(precip)}%</p>`
          : "";
      return `
      <article class="hourly-item">
        <div class="mini-icon">${iconSvg("mini", code, hour)}</div>
        <p class="label">${formatHourlyLabel(iso, position === 0)}</p>
        <p class="value">${temp}°</p>
        ${precipHtml}
      </article>`;
    })
    .join("");
}

function formatDayLabel(dateStr, index, displayDays = DEFAULT_DAILY_DISPLAY) {
  if (index === 0) return "今天";
  if (index === 1) return "明天";
  const date = new Date(`${dateStr}T12:00:00`);
  if (displayDays > 5 && index >= 5) {
    const md = date.toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" });
    const weekday = date.toLocaleDateString("zh-TW", { weekday: "short" });
    return `${md}（${weekday}）`;
  }
  return date.toLocaleDateString("zh-TW", { weekday: "short" });
}

function updateDailyTitle(count) {
  if (!els.dailyTitle) return;
  const icon = els.dailyTitle.querySelector(".title-icon");
  const iconHtml = icon ? icon.outerHTML : "";
  els.dailyTitle.innerHTML = `${iconHtml}未來 ${count} 日預報`;
}

function updateForecastToggleActive(activeDays) {
  if (!els.forecastToggle) return;
  els.forecastToggle.querySelectorAll(".forecast-toggle-btn").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.days) === activeDays);
  });
}

function renderDaily(daily, displayDays = getEffectiveDailyDisplayDays()) {
  currentWeatherDaily = daily;
  if (!daily?.time?.length) {
    els.dailyForecast.innerHTML = "";
    els.dailyForecast.classList.remove("is-scroll");
    return;
  }

  const count = Math.min(displayDays, daily.time.length);
  els.dailyForecast.classList.toggle("is-scroll", displayDays > 5);

  els.dailyForecast.innerHTML = daily.time.slice(0, count).map((dateStr, index) => {
    const code = daily.weather_code[index];
    const maxTemp = Math.round(daily.temperature_2m_max[index]);
    const minTemp = Math.round(daily.temperature_2m_min[index]);
    return `
      <article class="daily-item">
        <p class="label">${formatDayLabel(dateStr, index, displayDays)}</p>
        <div class="mini-icon">${iconSvg("mini", code)}</div>
        <p class="temp-range"><span class="temp-high">${maxTemp}°</span> / <span class="temp-low">${minTemp}°</span></p>
      </article>`;
  }).join("");

  updateDailyTitle(count);
  updateForecastToggleActive(
    DAILY_DISPLAY_OPTIONS.includes(displayDays) ? displayDays : dailyDisplayDays
  );
}

function setSearchHint(cityName, isLive = true, source = "open-meteo") {
  let suffix = "（按查詢取得即時天氣資訊）";
  if (isLive) {
    suffix = source === "wttr" ? "（備援天氣來源）" : "（即時天氣資料）";
  }
  els.searchHint.textContent = `目前顯示：${cityName}${suffix}`;
}

function renderWeather(city, weather) {
  currentCity = {
    name: city.name,
    latitude: city.latitude ?? currentCity.latitude,
    longitude: city.longitude ?? currentCity.longitude,
    countryCode: city.countryCode || city.country_code || currentCity.countryCode || "",
  };

  const current = weather.current;
  const temp = Math.round(current.temperature_2m);
  const humidity = current.relative_humidity_2m;
  const code = current.weather_code;
  const label = weatherLabel(code);
  const isNight = weatherIsNight(weather);
  const localHour = localHourFromIso(current.time);

  els.cityInput.value = city.name;
  setSearchHint(city.name, true, weather._source === "wttr" ? "wttr" : "open-meteo");
  els.currentTemp.textContent = `${temp}°C`;
  els.weatherDesc.textContent = `${label} · 濕度 ${humidity}%`;
  renderWeatherExtras(current);
  els.weatherIcon.innerHTML = iconSvg("main", code, localHour);
  renderWeatherFx(code, isNight);
  els.cards?.weather?.classList.toggle("is-night", isNight);

  renderSun(weather.daily);
  renderHourly(weather.hourly, current.time);
  renderDaily(weather.daily);
  renderRainAlert(weather);
  const feels = Math.round(current.apparent_temperature ?? current.temperature_2m);
  renderOutfit(feels, code);
  loadAirQuality(currentCity.latitude, currentCity.longitude);
  loadExchangeRate(currentCity);
  loadNearbyPlaces(currentCity.latitude, currentCity.longitude);
  updateFavoriteBtn();
  renderFavorites();
  pushSearchHistory(currentCity);
}

async function queryCity(cityName) {
  const travelQuery = parseTravelQuery(cityName);
  if (travelQuery) {
    return enterTravelMode(travelQuery);
  }

  setError("");
  setLoading(true);
  clearTravelSummary();
  try {
    const city = await geocodeCity(cityName);
    const weather = await fetchWeather(city.latitude, city.longitude, MAX_FORECAST_DAYS);
    renderWeather(city, weather);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: city.name, latitude: city.latitude, longitude: city.longitude })
    );
  } catch (err) {
    setError(err.message || "查詢失敗，請稍後再試");
    clearWeatherOnError();
    renderOutfit(25, 3);
    renderFoodList([], false, { message: "無法載入美食推薦" });
    renderSightList([], false, { message: "無法載入旅遊推薦" });
  } finally {
    setLoading(false);
  }
}

function scrollToSection(tab) {
  const target = els.cards[tab];
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setActiveNavTab(tab) {
  els.navBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}

function toggleFoodList() {
  renderFoodList(foodItems, !foodExpanded);
  if (foodExpanded) {
    setActiveNavTab("food");
    scrollToSection("food");
  }
}

function toggleSightList() {
  renderSightList(sightItems, !sightExpanded);
}

function bindEvents() {
  bindAutocompleteEvents();

  els.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideCitySuggestions();
    const input = els.cityInput.value.trim();
    if (!input) return;

    const travelQuery = parseTravelQuery(input);
    if (travelQuery) {
      enterTravelMode(travelQuery);
      return;
    }

    clearTravelSummary();
    queryCity(input);
  });

  els.viewAllFood.addEventListener("click", toggleFoodList);

  if (els.viewAllSights) els.viewAllSights.addEventListener("click", toggleSightList);

  if (els.openNowFood) {
    els.openNowFood.checked = foodOpenNowOnly;
    els.openNowFood.addEventListener("change", () => {
      foodOpenNowOnly = els.openNowFood.checked;
      if (currentCity?.latitude != null && currentCity?.longitude != null) {
        loadNearbyPlaces(currentCity.latitude, currentCity.longitude);
      }
    });
  }

  els.locateBtn.addEventListener("click", queryCurrentLocation);

  if (els.shareBtn) els.shareBtn.addEventListener("click", shareWeather);

  if (els.exportMarkdownBtn) {
    els.exportMarkdownBtn.addEventListener("click", copyTravelMarkdown);
  }
  if (els.exportImageBtn) {
    els.exportImageBtn.addEventListener("click", exportTravelImage);
  }

  els.favoriteBtn.addEventListener("click", toggleFavorite);

  if (els.themeBtn) els.themeBtn.addEventListener("click", toggleTheme);

  els.favoriteChips.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-fav-remove]");
    if (removeBtn) {
      e.stopPropagation();
      removeFavoriteAt(Number(removeBtn.dataset.favRemove));
      return;
    }

    const chipBtn = e.target.closest("[data-fav-index]");
    if (!chipBtn) return;
    const list = loadFavorites();
    const city = list[Number(chipBtn.dataset.favIndex)];
    if (city) querySavedCity(city);
  });

  els.foodList.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-place-fav-toggle]");
    if (favBtn) {
      e.stopPropagation();
      const row = favBtn.closest(".food-item");
      if (!row) return;
      const item = displayedFoodItems[Number(row.dataset.foodIndex)];
      if (item) togglePlaceFavorite(item);
      return;
    }
    const row = e.target.closest(".food-item");
    if (!row) return;
    handleFoodItemAction(row);
  });

  els.foodList.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const favBtn = e.target.closest("[data-place-fav-toggle]");
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      const row = favBtn.closest(".food-item");
      if (!row) return;
      const item = displayedFoodItems[Number(row.dataset.foodIndex)];
      if (item) togglePlaceFavorite(item);
      return;
    }
    const row = e.target.closest(".food-item");
    if (!row) return;
    e.preventDefault();
    handleFoodItemAction(row);
  });

  if (els.sightList) {
    els.sightList.addEventListener("click", (e) => {
      const favBtn = e.target.closest("[data-place-fav-toggle]");
      if (favBtn) {
        e.stopPropagation();
        const row = favBtn.closest(".sight-item");
        if (!row) return;
        const item = displayedSightItems[Number(row.dataset.sightIndex)];
        if (item) togglePlaceFavorite(item);
        return;
      }
      const row = e.target.closest(".sight-item");
      if (!row) return;
      handleSightItemAction(row);
    });

    els.sightList.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const favBtn = e.target.closest("[data-place-fav-toggle]");
      if (favBtn) {
        e.preventDefault();
        e.stopPropagation();
        const row = favBtn.closest(".sight-item");
        if (!row) return;
        const item = displayedSightItems[Number(row.dataset.sightIndex)];
        if (item) togglePlaceFavorite(item);
        return;
      }
      const row = e.target.closest(".sight-item");
      if (!row) return;
      e.preventDefault();
      handleSightItemAction(row);
    });
  }

  if (els.placeFavoritesList) {
    els.placeFavoritesList.addEventListener("click", (e) => {
      const removeBtn = e.target.closest("[data-place-fav-remove]");
      if (removeBtn) {
        e.stopPropagation();
        removePlaceFavoriteAt(Number(removeBtn.dataset.placeFavRemove));
        return;
      }
      const row = e.target.closest("[data-place-fav-index]");
      if (!row) return;
      const item = loadPlaceFavorites()[Number(row.dataset.placeFavIndex)];
      if (item) openPlaceFavoriteOnMaps(item);
    });

    els.placeFavoritesList.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const row = e.target.closest("[data-place-fav-index]");
      if (!row || e.target.closest("[data-place-fav-remove]")) return;
      e.preventDefault();
      const item = loadPlaceFavorites()[Number(row.dataset.placeFavIndex)];
      if (item) openPlaceFavoriteOnMaps(item);
    });
  }

  if (els.forecastToggle) {
    els.forecastToggle.addEventListener("click", (e) => {
      const btn = e.target.closest(".forecast-toggle-btn");
      if (!btn || !currentWeatherDaily) return;
      const days = Number(btn.dataset.days);
      if (!DAILY_DISPLAY_OPTIONS.includes(days)) return;
      travelDailyOverride = null;
      saveDailyDisplayPreference(days);
      renderDaily(currentWeatherDaily, days);
    });
  }

  if (els.travelDays) {
    els.travelDays.addEventListener("click", (e) => {
      const foodRow = e.target.closest("[data-travel-food-index]");
      if (foodRow) {
        const item = travelFoodItems[Number(foodRow.dataset.travelFoodIndex)];
        if (item) openFoodOnMaps(item);
        return;
      }

      const sightRow = e.target.closest("[data-travel-sight-index]");
      if (!sightRow) return;
      const item = travelSightItems[Number(sightRow.dataset.travelSightIndex)];
      if (item) openSightOnMaps(item);
    });
  }

  els.navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveNavTab(btn.dataset.tab);
      scrollToSection(btn.dataset.tab);
    });
  });
}

function registerServiceWorker() {
  if (location.protocol === "file:") return;
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("sw.js?v=5").catch(() => {
    // 註冊失敗不影響主功能
  });
}

async function init() {
  initTheme();
  bindEvents();
  initPullRefresh();
  registerServiceWorker();
  loadDailyDisplayPreference();
  setSearchHint(DEFAULT_CITY, false);
  renderFavorites();
  renderPlaceFavorites();
  updateFavoriteBtn();
  renderOutfit(28, 0);
  if (getPlacesApiKey()) {
    renderFoodList([], false, { loading: true });
    renderSightList([], false, { loading: true });
  } else {
    renderFoodList([], false, {
      message: "請手動建立 config.js 並填入 Google Places API Key",
    });
    renderSightList([], false, {
      message: "請手動建立 config.js 並填入 Google Places API Key",
    });
  }

  if (location.protocol === "file:") {
    setError("請用 start.bat 本機啟動，或透過 GitHub Pages 網址開啟");
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const { name, latitude, longitude } = JSON.parse(saved);
      currentCity = { name, latitude, longitude };
      setLoading(true);
      const weather = await fetchWeather(latitude, longitude, MAX_FORECAST_DAYS);
      renderWeather({ name, latitude, longitude }, weather);
      setError("");
      return;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }

  await queryCity(DEFAULT_CITY);
}

window.addEventListener("error", (event) => {
  setError(`程式錯誤：${event.message}`);
});

window.addEventListener("unhandledrejection", (event) => {
  const message = event.reason?.message || "網路或 API 發生錯誤";
  setError(message);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
