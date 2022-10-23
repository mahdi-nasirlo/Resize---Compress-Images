const uploadBox = document.querySelector(".upload-box");
const fileInput = document.querySelector("#upload-input");

const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");

const ratio = document.querySelector("#ratio");

let rationWidthPerHeight;

const showPreviewImg = (e) => {
  const uploadBoxImg = uploadBox.querySelector("img");

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

fileInput.addEventListener("change", showPreviewImg);
uploadBox.addEventListener("click", () => fileInput.click());
