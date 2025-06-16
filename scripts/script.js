// ========== Element References ==========
const inputImage = document.getElementById("main-img");
const imgContainer = document.getElementById("img-container");
const mainEditableImg = document.getElementById("img-main");
const imgUploader = document.getElementById("image-uploader");
const pannerSettingHandeler = document.getElementById("panner-setting-handeler");
const settingMainPannel = document.getElementById("settings");
const seetingPannel = document.getElementById("setting-pannel");
const loaderBody = document.getElementById("loader");
const notificationBar = document.getElementById("notificationBar");
const notificationText = document.getElementById("notificationText");
const ranDomImgContainer = document.getElementById("random-img-container");
const randomsettingHeader = document.getElementById("random-img-header");
const exportBtn = document.getElementById("export-btn");
const deleteBtn = document.getElementById("delete");

const brightness = document.getElementById("Brightness");
const contrast = document.getElementById("Contrast");
const saturation = document.getElementById("Saturation");
const grayscale = document.getElementById("Grayscale");
const invert = document.getElementById("Invert");
const sepia = document.getElementById("Sepia");
const blurr = document.getElementById("Blur");

// ========== Notification ==========
const notification = (text = "default message", time = 1000, type = "success") => {
  notificationBar.style.left = "-1%";
  notificationText.innerText = text;
  notificationBar.style.borderRight = type === "success" ? "10px solid green" : "10px solid red";
  setTimeout(() => {
    notificationBar.style.left = "-100%";
  }, time);
};

// ========== Load Image from localStorage ==========
const loadLocalImg = () => {
  const imgUrl = localStorage.getItem("IMG_URL");
  if (imgUrl) {
    mainEditableImg.src = imgUrl;
    mainEditableImg.style.display = "block";
    imgUploader.style.display = "none";
    imgContainer.style.display = "block";
  } else {
    notification("Old image not found", 2000, "error");
  }
};
document.addEventListener("DOMContentLoaded", loadLocalImg);

// ========== Upload Image ==========
inputImage.addEventListener("change", () => {
  const file = inputImage.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgUrl = e.target.result;
    localStorage.setItem("IMG_URL", imgUrl);
    mainEditableImg.src = imgUrl;
    mainEditableImg.style.display = "block";
    imgUploader.style.display = "none";
    imgContainer.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// ========== Open/Close Settings Panel ==========
pannerSettingHandeler.addEventListener("click", () => {
  settingMainPannel.style.display = "block";
});
settingMainPannel.addEventListener("click", () => {
  settingMainPannel.style.display = "none";
});
seetingPannel.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ========== Filters ==========
const updateFilter = () => {
  mainEditableImg.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
    grayscale(${grayscale.value}%)
    invert(${invert.value}%)
    sepia(${sepia.value}%)
    blur(${blurr.value}px)
  `;
};

[brightness, contrast, saturation, grayscale, invert, sepia, blurr].forEach(slider => {
  slider.addEventListener("input", updateFilter);
});

// ========== Loader ==========
setTimeout(() => {
  loaderBody.style.display = "none";
}, 3000);

// ========== Filter Presets ==========
document.querySelectorAll(".filters").forEach(filter => {
  filter.addEventListener("click", () => {
    const filterClass = filter.classList[1];
    mainEditableImg.setAttribute("class", filterClass);
    notification("Filter applied", 1500, "success");
  });
});

// ========== Random Image Loader ==========
async function loadData() {
  const response = await fetch("https://picsum.photos/v2/list");
  return await response.json();
}

randomsettingHeader.addEventListener("click", async () => {
  ranDomImgContainer.style.display = "flex";
  const images = await loadData();
  ranDomImgContainer.innerHTML = images.map(image =>
    `<div class="random-img-div" onclick='handelChangeImage("${image.download_url}")'>
      <img src="${image.download_url}" class="img">
    </div>`
  ).join('');
  notification("Random images loaded", 1500, "success");
});

window.handelChangeImage = function (url) {
  mainEditableImg.src = url;
  localStorage.setItem("IMG_URL", url);
  ranDomImgContainer.style.display = "none";
  mainEditableImg.style.display = "block";
  imgUploader.style.display = "none";
  imgContainer.style.display = "block";
  notification("Image selected", 1500, "success");
};

// ========== Export & Delete ==========
exportBtn.addEventListener("click", () => {
  exportBtn.setAttribute("href", mainEditableImg.src);
  exportBtn.setAttribute("download", "edited-image.jpg");
});

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
