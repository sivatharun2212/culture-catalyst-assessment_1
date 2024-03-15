const submitBtn = document.getElementById("submit");
const dataSection = document.querySelector(".data-section");
const genderIndicator = document.querySelector(".genderIndicator");
const showData = () => {
	const data = JSON.parse(localStorage.getItem("data"));
	if (!data || data?.length === 0) {
		dataSection.innerHTML = "NO DATA FOUND";
		return;
	} else {
		let templateCard = "";

		for (let obj of data) {
			let genderColor = obj.gender === "male" ? "lightblue" : "pink";
			templateCard += `
         <div class="table-wrapper">
		 <div class="genderIndicator" style="background-color: ${genderColor}"><span onclick="deleteUser('${obj.id}')" class="material-symbols-outlined">
		 delete
		 </span></div>
		 <table class="table">
		 <tr>
			 <td class="column-short">Name</td>
			 <td class="colon">:</td>
			 <td class="column-long">${obj.name}</td>
		 </tr>
		 <tr>
			 <td class="column-short">Email</td>
			 <td class="colon">:</td>
			 <td class="column-long">${obj.email}</td>
		 </tr>
		 <tr>
			 <td class="column-short">Message</td>
			 <td class="colon">:</td>
			 <td class="column-long"><div class="messageCont"></div>${obj.message}</td>
		 </tr>
	 </table>
	 <span class="time">${obj.createdTime}</span>
		 </div>
            `;
		}

		dataSection.innerHTML = templateCard;
	}
};
showData();
console.log("datasection", dataSection);
const submitData = (e) => {
	e.preventDefault();
	const name = document.getElementById("name");
	const email = document.getElementById("email");
	const gender = document.querySelector("input[name='gender']:checked");
	const message = document.getElementById("message");

	const storedData = JSON.parse(localStorage.getItem("data"));
	const dateNow = new Date();
	const day = dateNow.getDay();
	const month = dateNow.getMonth() + 1;
	const year = dateNow.getFullYear();
	const time = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

	let data = storedData || [];
	const userData = {
		id: `${dateNow}${name.value}`,
		name: name.value,
		email: email.value,
		gender: gender.value,
		message: message.value,
		createdTime: `Created Time : ${time} ${day}/${month}/${year}`,
	};
	data.unshift(userData);
	localStorage.setItem("data", JSON.stringify(data));
	showData();
	name.value = "";
	email.value = "";
	message.value = "";
	gender.checked = false;
	name.focus();
	console.log(data);
};

const deleteUser = (id) => {
	console.log("id", id);
	const storedUserData = JSON.parse(localStorage.getItem("data"));
	const updatedUserData = storedUserData.filter((user) => {
		return user.id !== id;
	});
	localStorage.setItem("data", JSON.stringify(updatedUserData));
	showData();
};
