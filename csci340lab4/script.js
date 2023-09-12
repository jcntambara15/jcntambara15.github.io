$(document).ready(function () {
    $('#clicker').click(function () {
      $.ajax({
        dataType: "json",
        url: "https://api.artic.edu/api/v1/artworks?page=2&limit=40",
        // url:"https://api.artic.edu/api/v1/artworks/search?q=cats",
        success: function (results) {
          var filteredResults = results.data.filter(function (item) {
            return item.thumbnail.lqip.includes("/gif");
          });
  
          if (filteredResults.length > 0) {
            // Generate a random index within the filtered results
            var randomIndex = Math.floor(Math.random() * filteredResults.length);
            var randomItem = filteredResults[randomIndex];
  
            $('#gold').attr("src", randomItem.thumbnail.lqip);
            $('.artist-display').text(randomItem.artist_display);
            $('.artist-display').css("background-size", "cover");
            $('.credit-line').text(randomItem.credit_line);
          } else {
            // Handle the case when no items match the condition
            $('#gold').attr("src", ""); // Clear the image
            $('.fortune').text("No matching items found");
          }
        },
        error: function (xhr, status, error) {
          console.log(error);
        }
      });
    });
  });
  