const uploadBox = document.querySelector(".upload-box");
const fileInput = document.querySelector("#upload-input");

const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");

const showPreviewImg = (e) => {
  const uploadBoxImg = uploadBox.querySelector("img");

  const file = e.target.files[0];
  if (!file) return;

  widthInput.value = file.width;

  const fileUrl = URL.createObjectURL(file);
  uploadBoxImg.src = fileUrl;

  uploadBox.classList.add("active");
};

fileInput.addEventListener("change", showPreviewImg);
uploadBox.addEventListener("click", () => fileInput.click());
