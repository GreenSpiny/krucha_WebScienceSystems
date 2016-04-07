var option = 0; // 0 = JSON, 1 = CSV

$(document).ready(function() {

  // Initial export options
  $("#jsonBTN").addClass("active");

  // Toggle export options
  $("#exportOptions button").click(function() {
    $("#exportOptions button").each(function() {
      $(this).removeClass("active");
      $(this).blur();
    });
    $(this).addClass("active");
    option = $(this).attr("value");
  });
  
  // Intialize warning popover
  $("#amount, #query").popover();
  $("#amount, #query").click(function(){
    $(this).popover("hide");
  });
  
  // Submit query
  $("#submitBTN").click(function() {
    if (validateNumber($("#amount").val()) && validateString($("#query").val())) {
      queryString = window.location.href + "query?q=" + $("#query").val() + "&a=" + $("#amount").val() + "&t=" + option;
      $.get(queryString,function(data) {
        console.log("Sent request");
      });
    }
  });

});

// Validate input fields
function validateString(string) {
  if (string == null || string == "") {
    $("#query").popover("show");
    return false;
  }
  $("#query").popover("hide");
  return true;
}


function validateNumber(amount) {

  var value = parseInt(amount);
  
  if (isNaN(amount) || amount <= 0 || amount > 100) {
    $("#amount").popover("show");
    return false;
  }

  $("#amount").popover("hide");
  $("#amount").val(value);
  return true;
}