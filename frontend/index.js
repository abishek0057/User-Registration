//fetch user data to table
const tableBody = document.getElementById("tableBody");
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5555/users");
    const users = response.data.userList.map(({ name, email }) => ({
      name,
      email,
    }));
    users?.forEach((user, index) => {
      const tableRow = document.createElement("tr");
      const cellNo = document.createElement("td");
      cellNo.textContent = index + 1;
      tableRow.appendChild(cellNo);
      for (let key in user) {
        const cell = document.createElement("td");
        cell.setAttribute("data-info", user.email)
        cell.textContent = user[key];
        tableRow.appendChild(cell);
      }
      tableBody.appendChild(tableRow);
    });
  } catch (error) {
    console.error(error);
  }
};

fetchData();

// show slected user data on modal
const showModal = (name, email, date) => {
  document.getElementById("modalUserName").textContent = name;
  document.getElementById("modalUserEmail").textContent = email;
  document.getElementById("modalUserRegistered").textContent = new Date(date).toDateString();
  $('#userModal').modal('show');
};


tableBody.addEventListener("click", async (ele) => {
  const userEmail = ele.target.dataset.info;
  try {
    const response = await axios.get(`http://localhost:5555/user/${userEmail}`);
    const user = response.data.user
    showModal(user.name, user.email, user.createdAt)
  } catch (error) {
    console.log(error);
  }
})

