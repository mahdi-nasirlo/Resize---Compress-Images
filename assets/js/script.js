const uploadBox = document.querySelector(".upload-box");
const uploadBoxImg = uploadBox.querySelector("img");
const fileInput = document.querySelector("#upload-input");

const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");

const downloadBtn = document.querySelector(".download-btn");

const ratio = document.querySelector("#ratio");
const qualityCheckbox = document.querySelector("#quality");

let rationWidthPerHeight;

const showPreviewImg = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileUrl = URL.createObjectURL(file);
  uploadBoxImg.src = fileUrl;

  uploadBoxImg.addEventListener("load", () => {
    widthInput.value = uploadBoxImg.naturalWidth;
    heightInput.value = uploadBoxImg.naturalHeight;
    rationWidthPerHeight =
      uploadBoxImg.naturalWidth / uploadBoxImg.naturalHeight;
  });

  uploadBox.classList.add("active");
  document.querySelector(".wrapper").classList.add("active");
};

widthInput.addEventListener("keyup", () => {
  let height = ratio.checked
    ? widthInput.value / rationWidthPerHeight
    : heightInput.value;

  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  let width = ratio.checked
    ? heightInput.value * rationWidthPerHeight
    : widthInput.value;

  widthInput.value = Math.floor(width);
});

const downloadAndResize = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(uploadBoxImg, 0, 0, canvas.width, canvas.height);

  let quality = qualityCheckbox.checked ? 0.4 : 1;

  a.href = canvas.toDataURL("image/jpeg", quality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", downloadAndResize);
fileInput.addEventListener("change", showPreviewImg);
uploadBox.addEventListener("click", () => fileInput.click());
