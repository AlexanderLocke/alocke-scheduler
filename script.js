// Grab the HTML elements using jQuery and store them in variables
const saveButtons = jQuery(".saveBtn");
const timeBlocks = jQuery(".time-block");
const descriptionInputs = jQuery(".description");
const currentDayElement = jQuery("#currentDay");

// Add a listener for click events on the save button
saveButtons.on("click", function () {
  const timeBlockId = jQuery(this).parent().attr("id");
  const userDescription = jQuery(this).siblings(".description").val();
  localStorage.setItem(timeBlockId, userDescription);
});

// Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
timeBlocks.each(function () {
  const timeBlockId = jQuery(this).attr("id");
  const userDescription = localStorage.getItem(timeBlockId);

  if (userDescription !== null) {
    jQuery(this).find(".description").val(userDescription);
  }
});

// Display the current date in the header of the page
const currentDate = dayjs().format("dddd, MMMM D, YYYY");
currentDayElement.text(currentDate);