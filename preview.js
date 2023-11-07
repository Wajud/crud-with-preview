const groceryOnPage = JSON.parse(localStorage.getItem("groceryToPreview"))[0];

let day = new Date(groceryOnPage.time);

const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const previewContainer = document.getElementById("preview-container");
previewContainer.innerHTML = `<section>
<div class="flex group">
  <h3 class="text-lg font-semibold flex-1">${groceryOnPage.item}</h3>

  <section class="gap-2 flex">
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
    <img
      src="images/delete-icon.png"
      class="w-6 h-6"
      onclick="deleteGrocery('${groceryOnPage.id}')"
    />
  </section>
</div>

  <div id="description" class="text-slate-500 my-4">

  </div>

<form id="description-form" class="my-4">
<input
  type="text"
  placeholder="Enter description about ${groceryOnPage.item} here"
  class="w-full min-h-20 border border-slate-200 rounded-lg px-2 py-1"
/>
<button class="bg-green-400 text-white font-semibold px-2 py-1 rounded-md my-2">Add Description</button>

</form>

<span>${days[day.getDay()]} ${day.getDate()}th ${
  months[day.getMonth() - 1]
}, ${day.getFullYear()}</span>
<span class="px-1 py-1/2 bg-slate-800 rounded-full text-white"
  >Pending</span
>
</section>`;

function deleteGrocery(id) {
  const groceriesDb = JSON.parse(localStorage.getItem("groceriesDb"));

  const newGroceriesDb = groceriesDb.filter(
    (groceryItem) => groceryItem.id !== id
  );

  groceriesDb.length = 0;
  groceriesDb.push(...newGroceriesDb);
  localStorage.setItem("groceriesDb", JSON.stringify(groceriesDb));
  window.location.href = "index.html";
}

const descriptionForm = document.getElementById("description-form");
descriptionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const descriptionText = document.querySelector(
    "#description-form input"
  ).value;
  document.getElementById("description").textContent = descriptionText;
  descriptionForm.classList.add("hidden");
});

// if (document.getElementById("description").textContent == "") {
//   descriptionForm.classList.add("scale-0");
// }
