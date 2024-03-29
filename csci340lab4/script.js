$(document).ready(function () {
    $('#clicker').click(function () {
      $.ajax({
        dataType: "json",
        url: "https://api.artic.edu/api/v1/artworks",
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
            if (randomItem.description !== null){
                $('.credit-line').text(randomItem.description);
            } else {
                $('.credit-line').text(`No Description Found! The art's credit line is given below instead: ${randomItem.credit_line}`);
            }

            $.ajax({
                dataType: "json",
                url: "https://openlibrary.org/subjects/art.json",
                success: function(bookResults){
                    /* Need to know why this doesn't work anad how it would work. 
                    var startValue = 0;
                    for (var i = startValue; i < 20; i++){
                        if (randomItem.artist_display.includes("American")){
                            $('.art-book').text(`Book title: ${bookResults["works"][i]["title"]}, "  "\n Book subject: ${jobResults["works"][i]["subject"].join(', ')}`);
                        }
                    }
                   startValue = i + 1;
                    */
                if (randomItem.artist_display.includes("American")){
                    $('.art-book').html(`Book title: ${bookResults["works"][2]["title"]}, "  "\n Book subject: ${bookResults["works"][2]["subject"].join(', ')}`);
                }

                }
            })
  
          } else {
            // Handle the case when no items match the condition
            $('#gold').attr("src", ""); // Clear the image
            $('.art-book').text("No matching items found");
          }
        },
        error: function (xhr, status, error) {
          console.log(error);
        }
      });
    });

    $('#reset').click(function () {
        $('#gold').attr("src", "../static/images/JCC.jpg");
        $('.artist-display').text("");
        $('.credit-line').text("");
        $('.art-book').text("");
      });

  });
  