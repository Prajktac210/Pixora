// Get reference to the input element for uploading image
let inputImage = document.getElementById("main-img")

// Get reference to the container where the image will be displayed
let imgContainer = document.getElementById("img-container")

// Get reference to the actual image element that will be edited
let mainEditableImg = document.getElementById("img-main")

// Get reference to the image uploader section (file input wrapper)
let imgUploader = document.getElementById("image-uploader")

// Get reference to the element (like a button or icon) that opens settings panel
let pannerSettingHandeler = document.getElementById("panner-setting-handeler")

// Get reference to the main settings panel (acts like a background)
let settingMainPannel = document.getElementById("settings")

// Get reference to the actual content box inside the settings panel
let seetingPannel = document.getElementById("setting-pannel")

// Get references to all the image adjustment controls
let brightness = document.getElementById("Brightness")
let contrast = document.getElementById("Contrast")
let saturation = document.getElementById("Saturation")
let grayscale = document.getElementById("Grayscale")
let invert = document.getElementById("Invert")
let sepia = document.getElementById("Sepia")
let blurr = document.getElementById("Blur")

// --------------------------- Events ---------------------------

// When a new file is selected in the input
inputImage.addEventListener("change", () => {
    // Get the first file from the file input
    let imgObj = inputImage.files[0]
    
    // If no file is selected, exit the function
    if (!imgObj) return

    // Create a temporary URL for the selected image file
    let imgUrl = URL.createObjectURL(imgObj)

    // Set the source of the image to display it
    mainEditableImg.src = imgUrl

    // Hide the uploader UI
    imgUploader.style.display = "none"

    // Show the container with the image
    imgContainer.style.display = "block"
})

// ------------------- Settings Panel Open/Close -------------------

// When user clicks on settings button/icon, show the settings panel
pannerSettingHandeler.addEventListener("click", () => {
    settingMainPannel.style.display = "block"
})

// When user clicks outside the actual settings panel, close the settings overlay
settingMainPannel.addEventListener("click", () => {
    settingMainPannel.style.display = "none"
})

// When user clicks inside the settings panel, don't close it (prevent bubbling)
seetingPannel.addEventListener("click", (e) => {
    e.stopPropagation()
})

// ------------------- Filter Events -------------------

// When brightness slider value changes, update image brightness
brightness.addEventListener("change", () => {
    mainEditableImg.style.filter = `brightness(${brightness.value - 10})`
})

// When contrast slider value changes, update image contrast
contrast.addEventListener("change", () => {
    mainEditableImg.style.filter = `contrast(${contrast.value})`
})

// When saturation slider value changes, update image saturation
saturation.addEventListener("change", () => {
    mainEditableImg.style.filter = `saturate(${saturation.value})`
})

// When grayscale slider value changes, update image grayscale
grayscale.addEventListener("change", () => {
    mainEditableImg.style.filter = `grayscale(${grayscale.value})`
})

// When invert slider value changes, update image invert filter
invert.addEventListener("change", () => {
    mainEditableImg.style.filter = `invert(${invert.value})`
})

// When sepia slider value changes, update image sepia filter
sepia.addEventListener("change", () => {
    mainEditableImg.style.filter = `sepia(${sepia.value})`
})

// When blur slider value changes, update image blur amount (in pixels)
blurr.addEventListener("change", () => {
    mainEditableImg.style.filter = `blur(${blurr.value}px)`
})
