// Grab the HTML elements using jQuery and store them in variables
const container = jQuery(".container-fluid");
const currentDayElement = jQuery("#currentDay");

// Function to generate time blocks dynamically
function generateTimeBlocks() {
  // Clear existing content in the container
  container.empty();

  // Get the current date
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  currentDayElement.text(currentDate);

  // Loop through business hours (9am to 5pm)
  for (let hour = 9; hour <= 17; hour++) {
    // Create a time block for each hour
    const timeBlock = jQuery('<div>').addClass("row time-block");
    timeBlock.attr("id", `hour-${hour}`);
    const hourColumn = jQuery('<div>').addClass("col-2 col-md-1 hour text-center py-3");

    // Format the hours as AM/PM
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    hourColumn.text(`${formattedHour}${ampm}`);

    // Create the description textarea
    const descriptionTextArea = jQuery('<textarea>').addClass("col-8 col-md-10 description").attr("rows", "3");

    // Create the save button
    const saveButton = jQuery('<button>').addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    saveButton.html('<i class="fas fa-save" aria-hidden="true"></i>');

    // Append elements to the time block
    timeBlock.append(hourColumn, descriptionTextArea, saveButton);
    container.append(timeBlock);
  }

  // Add a listener for click events on the save button
  container.on("click", ".saveBtn", function () {
    const timeBlockId = jQuery(this).parent().attr("id");
    const userDescription = jQuery(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userDescription);
  });

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  container.find(".time-block").each(function () {
    const timeBlockId = jQuery(this).attr("id");
    const userDescription = localStorage.getItem(timeBlockId);

    if (userDescription !== null) {
      jQuery(this).find(".description").val(userDescription);
    }
  });

  // Call the function to initially set the time block colors
  updateBlockColors();
}

// Function to update the time block colors based on the current time
function updateBlockColors() {
  const currentHour = dayjs().hour();

  // Loop through each time block to compare with the current hour
  container.find(".time-block").each(function () {
    const blockHour = parseInt(jQuery(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      jQuery(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      jQuery(this).removeClass("past future").addClass("present");
    } else {
      jQuery(this).removeClass("past present").addClass("future");
    }
  });
}

// Call the function to generate time blocks initially
generateTimeBlocks();

// Set up an interval to update the time block colors every minute
setInterval(updateBlockColors, 60000);
