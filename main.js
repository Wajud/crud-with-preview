//Unique ID generator

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

//get Groceries from storage
const groceriesDb = JSON.parse(localStorage.getItem("groceriesDb"))
  ? JSON.parse(localStorage.getItem("groceriesDb"))
  : [];

//get Groceries Preview from db

const groceryToPreview = JSON.parse(localStorage.getItem("ggroceryToPreview"))
  ? JSON.parse(localStorage.getItem("groceryToPreview"))
  : [];

// let groceryToPreview = [];

const groceriesContainer = document.getElementById("groceries-container");

const addGroceryForm = document.getElementById("groceryForm");

//call paint dom function

paintDom();

//add grocery to storage

addGroceryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  groceriesContainer.innerHTML = "";
  const groceryItem = document.querySelector("input").value;
  const groceryData = {
    item: groceryItem,
    time: new Date().getTime(),
    id: generateId(),
  };

  groceriesDb.push(groceryData);
  groceriesDb.sort((a, b) => b.time - a.time);
  addGroceryToStorage();
  paintDom();
  addGroceryForm.reset();
});

//Add grocery to storage
function addGroceryToStorage() {
  localStorage.setItem("groceriesDb", JSON.stringify(groceriesDb));
}

//hide empty container

if (groceriesDb.length !== 0) {
  document.getElementById("empty-groceries-container").classList.add("hidden");
}

//PaintDOM with Groceries

function paintDom() {
  if (groceriesDb.length == 0) {
    return;
  } else {
    groceriesDb.forEach((groceryItem) => {
      groceriesContainer.innerHTML += `
    <div
            class="group flex justify-between py-3 px-2 bg-slate-50 hover:bg-slate-200 rounded-lg"
          >
            <button onclick="handleGroceryPreview('${groceryItem.id}')">${groceryItem.item}</button>
            <section class="gap-2 hidden group-hover:flex">
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
              <img src="images/delete-icon.png" class="w-6 h-6" onclick="deleteGrocery('${groceryItem.id}')"/>
              <button onclick="setPreview('${groceryItem.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              </button>

            
            </section>
          </div>
        
    `;
    });
  }
}

//funtion to delete gocery item

function deleteGrocery(id) {
  const newGroceriesDb = groceriesDb.filter((item) => item.id !== id);
  groceriesDb.length = 0;
  groceriesDb.push(...newGroceriesDb);
  addGroceryToStorage();
  groceriesContainer.innerHTML = "";
  paintDom();
}

function handleGroceryPreview(num) {
  // groceryToPreview.push(groceriesDb)
  newGroceryToPreview = groceriesDb.filter(
    (groceryItem) => groceryItem.id === num
  );
  groceryToPreview.length = 0;
  groceryToPreview.push(newGroceryToPreview);
  localStorage.setItem("groceryToPreview", JSON.stringify(groceryToPreview));
  window.location.href = "preview.html";
}
