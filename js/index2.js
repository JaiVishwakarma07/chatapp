
const enc = document.querySelector(".enc");
const dec = document.querySelector(".dec");

let password = document.querySelector(".password");
let msg = document.querySelector(".msg");
let password_val, msg_val, encripted_val;

enc.addEventListener("click", () => {
  //   console.log(CryptoJS);

  // Encription
  password_val = password.value;
  msg_val = msg.value;
  encripted_val = CryptoJS.AES.encrypt(msg_val, password_val).toString();
  msg.value = encripted_val;
});

dec.addEventListener("click", () => {
  // Decription
  var bytes = CryptoJS.AES.decrypt(encripted_val, password_val);
  var originalText = CryptoJS.AES.decrypt(msg_val, password_val).toString(CryptoJS.enc.Utf8);
  msg.value = originalText;
});
