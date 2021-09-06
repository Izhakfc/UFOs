// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters ={};
// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let selector = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue = selector.property("value");
    console.log(elementValue);
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = selector.attr("id");
    console.log(filterId);
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
   //if (filterId === "apply-btn") {
    //filters[filterId] = elementValue;}
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(function([key,value]){
      filteredData = filteredData.filter(row => row[key] === value);
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }

//Create the set of options for the selects
const uniqueDate = [...new Set(data.map(item => item.datetime))].sort();
const uniqueCity = [...new Set(data.map(item => item.city))].sort();
const uniqueState = [...new Set(data.map(item => item.state))].sort();
const uniqueCountry = [...new Set(data.map(item => item.country))].sort();
const uniqueShape = [...new Set(data.map(item => item.shape))].sort();

// Function to create the selector of options 
function createOptionBox(options, id, label, selector){
  let select = document.createElement("select");
  select.name = "";
  select.id = id;
  
  var option = document.createElement("option");
  option.value = "";
  option.attributes = "selected disabled hidden";
  option.text = "Choose an option";
  select.appendChild(option);

  for (const item of options){
    let option = document.createElement("option");
    option.value = item;
    if (label == "Country" || label == "State"){
      option.text = item.slice(0).toUpperCase();
    }
    else{
      option.text = item.charAt(0).toUpperCase() + item.slice(1);
    }
    select.appendChild(option);
  }
  document.getElementById(selector).appendChild(select);
}

// Create the box of options for each parameter
createOptionBox(uniqueDate, "date", "Date", "date-options");
createOptionBox(uniqueCity, "city", "City", "city-options");
createOptionBox(uniqueState, "state", "State", "state-options");
createOptionBox(uniqueCountry, "country", "Country", "country-options");
createOptionBox(uniqueShape, "shape", "UFO shape", "shape-options");

// 2. Attach an event to listen for changes to each flter
d3.selectAll("select").on("change", updateFilters);
//d3.selectAll("#apply-btn").on("click", updateFilters);
// Build the table when the page loads
buildTable(tableData);
