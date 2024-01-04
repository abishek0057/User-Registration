//Adding user to database
const form = document.querySelector("#form-container");
async function sendData(cb) {
  const formData = new FormData(form);
  const formDataJSON = JSON.stringify(Object.fromEntries(formData));
  try {
    const response = await fetch("http://localhost:5555/register", {
      method: "POST",
      body: formDataJSON,
      headers: new Headers({ "content-type": "application/json" }),
    });
    const responseData = await response.json();
    cb(responseData);
  } catch (e) {
    console.error(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData((response) => {
    if (response?.success === false) {
      alert(response.message);
    } else {
      setTimeout(() => {
        form.reset();
        window.location.replace("/");
      }, 500);
    }
  });
});
