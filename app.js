const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const STORAGE_KEY = "weather-dashboard-city";

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

const HOURLY_SLOTS = [
  { label: "中午", hour: 12 },
  { label: "下午", hour: 15 },
  { label: "傍晚", hour: 18 },
  { label: "晚上", hour: 21 },
];

const FOOD_POOL = [
  { name: "巷口麵店", desc: "牛肉麵", icon: "bowl", rating: 4.6 },
  { name: "輕食沙拉吧", desc: "健康餐盒", icon: "salad", rating: 4.4 },
  { name: "手沖咖啡館", desc: "飲品甜點", icon: "coffee", rating: 4.8 },
  { name: "日式定食屋", desc: "定食套餐", icon: "bowl", rating: 4.5 },
  { name: "港式茶餐廳", desc: "港式點心", icon: "bowl", rating: 4.3 },
];

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

const DEFAULT_CITY = "台北市";

const FALLBACK_CITIES = {
  台北市: { name: "台北市", latitude: 25.033, longitude: 121.5654 },
  台北: { name: "台北市", latitude: 25.033, longitude: 121.5654 },
  高雄: { name: "高雄", latitude: 22.6273, longitude: 120.3014 },
  台中市: { name: "台中市", latitude: 24.1477, longitude: 120.6736 },
  台南市: { name: "台南市", latitude: 22.9999, longitude: 120.2269 },
};

const $ = (id) => document.getElementById(id);

const els = {
  cityInput: $("cityInput"),
  searchForm: $("searchForm"),
  searchHint: $("searchHint"),
  currentTemp: $("currentTemp"),
  weatherDesc: $("weatherDesc"),
  weatherIcon: $("weatherIcon"),
  hourlyForecast: $("hourlyForecast"),
  outfitGrid: $("outfitGrid"),
  foodList: $("foodList"),
  loading: $("loading"),
  error: $("error"),
  viewAllFood: $("viewAllFood"),
  navBtns: document.querySelectorAll(".nav-btn"),
  cards: {
    weather: document.querySelector(".card-weather"),
    outfit: document.querySelector(".card-outfit"),
    food: document.querySelector(".card-food"),
  },
};

function setLoading(on) {
  els.loading.classList.toggle("hidden", !on);
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

function weatherLabel(code) {
  return WEATHER_TEXT[code] ?? "多雲";
}

function isRainy(code) {
  return [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
}

function isHot(temp) {
  return temp >= 28;
}

function isCold(temp) {
  return temp < 18;
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
  };

  if (type === "main") {
    if ([95, 96, 99].includes(code)) return map.storm;
    if (rainy) return map.storm;
    if (code <= 1) return map.sun;
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

function citySearchVariants(name) {
  const trimmed = name.trim();
  const variants = new Set();

  if (trimmed) variants.add(trimmed);
  if (CITY_ALIASES[trimmed]) variants.add(CITY_ALIASES[trimmed]);

  if (!/[市縣]$/.test(trimmed)) {
    variants.add(`${trimmed}市`);
    variants.add(`${trimmed}縣`);
  }

  if (/[市縣]$/.test(trimmed)) {
    variants.add(trimmed.slice(0, -1));
  }

  return [...variants];
}

async function geocodeByName(name) {
  const url = new URL(GEO_API);
  url.searchParams.set("name", name);
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "zh");
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

async function geocodeCity(name) {
  const variants = citySearchVariants(name);

  for (const variant of variants) {
    try {
      const results = await geocodeByName(variant);
      if (results.length) {
        const exact = results.find((item) => item.name === variant);
        return exact ?? results[0];
      }
    } catch {
      // try next variant or fallback below
    }
  }

  for (const variant of variants) {
    if (FALLBACK_CITIES[variant]) return { ...FALLBACK_CITIES[variant] };
  }

  throw new Error(`找不到城市「${name}」，請試試「台北市」或輸入英文如 Taipei`);
}

async function fetchWeather(latitude, longitude) {
  const url = new URL(WEATHER_API);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,weather_code,apparent_temperature"
  );
  url.searchParams.set("hourly", "temperature_2m,weather_code");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "1");

  const res = await fetchWithTimeout(url.toString());
  if (!res.ok) throw new Error("天氣服務暫時無法使用");
  return res.json();
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

function renderFoodList(seed = 0) {
  const picks = [...FOOD_POOL].sort((a, b) => ((a.rating + seed) % 5) - ((b.rating + seed) % 5)).slice(0, 3);
  els.foodList.innerHTML = picks
    .map(
      (item, i) => `
      <li class="food-item">
        ${iconSvg(item.icon)}
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc} · ${300 + i * 220} 公尺</p>
        </div>
        <span class="rating">★ ${item.rating.toFixed(1)}</span>
      </li>`
    )
    .join("");
}

function renderHourly(hourly) {
  els.hourlyForecast.innerHTML = HOURLY_SLOTS.map((slot) => {
    const idx = nearestHourlyIndex(hourly.time, slot.hour);
    const temp = Math.round(hourly.temperature_2m[idx]);
    const code = hourly.weather_code[idx];
    return `
      <article class="hourly-item">
        <div class="mini-icon">${iconSvg("mini", code, slot.hour)}</div>
        <p class="label">${slot.label}</p>
        <p class="value">${temp}°</p>
      </article>`;
  }).join("");
}

function setSearchHint(cityName, isLive = true) {
  const suffix = isLive ? "（即時天氣資料）" : "（按查詢取得即時天氣資訊）";
  els.searchHint.textContent = `目前顯示：${cityName}${suffix}`;
}

function renderWeather(city, weather) {
  const current = weather.current;
  const temp = Math.round(current.temperature_2m);
  const humidity = current.relative_humidity_2m;
  const code = current.weather_code;
  const label = weatherLabel(code);

  els.cityInput.value = city.name;
  setSearchHint(city.name, true);
  els.currentTemp.textContent = `${temp}°C`;
  els.weatherDesc.textContent = `${label} · 濕度 ${humidity}%`;
  els.weatherIcon.innerHTML = iconSvg("main", code);

  renderHourly(weather.hourly);
  renderOutfit(temp, code);
  renderFoodList(temp + code);
}

async function queryCity(cityName) {
  setError("");
  setLoading(true);
  try {
    const city = await geocodeCity(cityName);
    const weather = await fetchWeather(city.latitude, city.longitude);
    renderWeather(city, weather);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: city.name, latitude: city.latitude, longitude: city.longitude })
    );
  } catch (err) {
    setError(err.message || "查詢失敗，請稍後再試");
    els.weatherDesc.textContent = "查詢失敗，請重新搜尋";
    els.currentTemp.textContent = "--°C";
    els.weatherIcon.innerHTML = iconSvg("cloud");
    els.hourlyForecast.innerHTML = "";
    renderOutfit(25, 3);
    renderFoodList();
  } finally {
    setLoading(false);
  }
}

function scrollToSection(tab) {
  const target = els.cards[tab];
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindEvents() {
  els.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = els.cityInput.value.trim();
    if (!city) return;
    queryCity(city);
  });

  els.viewAllFood.addEventListener("click", () => scrollToSection("food"));

  els.navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      els.navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      scrollToSection(btn.dataset.tab);
    });
  });
}

async function init() {
  bindEvents();
  setSearchHint(DEFAULT_CITY, false);
  renderOutfit(28, 0);
  renderFoodList();

  if (location.protocol === "file:") {
    setError("請用 start.bat 啟動，或瀏覽 http://127.0.0.1:8765");
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const { name, latitude, longitude } = JSON.parse(saved);
      setLoading(true);
      const weather = await fetchWeather(latitude, longitude);
      renderWeather({ name }, weather);
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
