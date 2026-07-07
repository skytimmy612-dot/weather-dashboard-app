const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const REVERSE_GEO_API = "https://api.bigdatacloud.net/data/reverse-geocode-client";

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
  locateBtn: $("locateBtn"),
  navBtns: document.querySelectorAll(".nav-btn"),
  cards: {
    weather: document.querySelector(".card-weather"),
    outfit: document.querySelector(".card-outfit"),
    food: document.querySelector(".card-food"),
  },
};

let foodExpanded = false;
let foodSeed = 0;
let displayedFoodItems = [];
let currentCity = { ...FALLBACK_CITIES[DEFAULT_CITY] };

function setLoading(on) {
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

function isTaiwanCityName(name) {
  if (CITY_ALIASES[name] || FALLBACK_CITIES[name]) return true;
  if (/[市縣]$/.test(name)) return true;
  return Object.values(CITY_ALIASES).includes(name);
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
  const pool = preferred.length ? preferred : results;
  return [...pool].sort((a, b) => (b.population ?? 0) - (a.population ?? 0))[0];
}

function resolveDisplayName(userInput, result, matchedVariant) {
  const trimmed = userInput.trim();
  if (PLACE_ALIASES[trimmed] && matchedVariant === PLACE_ALIASES[trimmed]) {
    return trimmed;
  }
  return result.name || trimmed;
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

async function geocodeCity(name) {
  const variants = citySearchVariants(name);

  for (const variant of variants) {
    for (const language of ["zh", "en"]) {
      try {
        const results = await geocodeByName(variant, language);
        if (results.length) {
          const best = pickBestResult(results, variant);
          return {
            ...best,
            name: resolveDisplayName(name, best, variant),
          };
        }
      } catch {
        // try next language or variant
      }
    }
  }

  for (const variant of variants) {
    if (FALLBACK_CITIES[variant]) return { ...FALLBACK_CITIES[variant] };
  }

  throw new Error(
    `找不到「${name}」。台灣城市可試「台北市」；國外地點可輸入英文如 Tokyo、Iceland`
  );
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
    return parts.length ? parts.join(", ") : null;
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
  try {
    const [weather, placeName] = await Promise.all([
      fetchWeather(latitude, longitude),
      reverseGeocode(latitude, longitude),
    ]);
    const city = { name: placeName ?? "我的位置", latitude, longitude };
    renderWeather(city, weather);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
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

function buildFoodMapsUrl(item) {
  const query = `${item.desc} ${currentCity.name}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function openFoodOnMaps(item) {
  window.open(buildFoodMapsUrl(item), "_blank", "noopener,noreferrer");
}

function handleFoodItemAction(row) {
  const index = Number(row.dataset.foodIndex);
  const item = displayedFoodItems[index];
  if (item) openFoodOnMaps(item);
}

function renderFoodList(seed = 0, showAll = foodExpanded) {
  foodSeed = seed;
  foodExpanded = showAll;
  const sorted = [...FOOD_POOL].sort(
    (a, b) => ((a.rating + seed) % 5) - ((b.rating + seed) % 5)
  );
  const picks = showAll ? sorted : sorted.slice(0, 3);
  displayedFoodItems = picks;
  els.foodList.innerHTML = picks
    .map(
      (item, i) => `
      <li
        class="food-item"
        role="button"
        tabindex="0"
        data-food-index="${i}"
        aria-label="在 Google Maps 搜尋${item.desc}"
      >
        ${iconSvg(item.icon)}
        <div>
          <h3>${item.name}</h3>
          <p>${item.desc} · ${300 + i * 220} 公尺</p>
        </div>
        <span class="rating">★ ${item.rating.toFixed(1)}</span>
      </li>`
    )
    .join("");
  els.viewAllFood.textContent = showAll ? "收合" : "查看全部";
  els.viewAllFood.setAttribute("aria-expanded", String(showAll));
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
  currentCity = {
    name: city.name,
    latitude: city.latitude ?? currentCity.latitude,
    longitude: city.longitude ?? currentCity.longitude,
  };

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
  renderFoodList(temp + code, false);
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

function setActiveNavTab(tab) {
  els.navBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
}

function toggleFoodList() {
  renderFoodList(foodSeed, !foodExpanded);
  if (foodExpanded) {
    setActiveNavTab("food");
    scrollToSection("food");
  }
}

function bindEvents() {
  els.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = els.cityInput.value.trim();
    if (!city) return;
    queryCity(city);
  });

  els.viewAllFood.addEventListener("click", toggleFoodList);

  els.locateBtn.addEventListener("click", queryCurrentLocation);

  els.foodList.addEventListener("click", (e) => {
    const row = e.target.closest(".food-item");
    if (!row) return;
    handleFoodItemAction(row);
  });

  els.foodList.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const row = e.target.closest(".food-item");
    if (!row) return;
    e.preventDefault();
    handleFoodItemAction(row);
  });

  els.navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveNavTab(btn.dataset.tab);
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
    setError("請用 start.bat 本機啟動，或透過 GitHub Pages 網址開啟");
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const { name, latitude, longitude } = JSON.parse(saved);
      currentCity = { name, latitude, longitude };
      setLoading(true);
      const weather = await fetchWeather(latitude, longitude);
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
