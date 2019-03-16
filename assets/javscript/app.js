var gifs = ["Dancing", "Bye", "I told you so", "Omg", "Blank Stare"];




function displayGifs(){
    
    $("#topics-container").empty();

    var giphy = $(this).attr("data-name");
    
    var numGif = $("#numGifs").val();
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&limit=" + numGif + "&api_key=VorVM2Bqf3yVV3iNNbr8ktyPK7ibQ44C";
   
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
            console.log(response)
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
               
                var stillImage = response.data[i].images.fixed_height_still.url;
			    var gif = response.data[i].images.fixed_height.url;

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                    p.addClass("gifRate");
                var gifImage = $("<img>");
                    gifImage.attr("src", gif);
                    gifImage.addClass("gif-image");
                    gifImage.data("values", {
                        "still-image": stillImage, 
                        "gif": gif,
                        "state": "still"
                    });

                gifDiv.prepend(gifImage);
                gifDiv.prepend(p);
                gifDiv.addClass("gifs");

                $("#topics-container").prepend(gifDiv);
            }
      });
};

function toggleGIF() {
	
	if ($(this).data().values.state === "still") {
		$(this).attr('src', $(this).data().values.gif); // makes it move
		$(this).data().values.state = "moving"; //swaps state
	} 
	
	else if ($(this).data().values.state === "moving") {
		$(this).attr('src', $(this).data().values["still-image"]); //stops gif
		$(this).data().values.state = "still"; //swaps state
	}
}

function renderButtons() {

    $("#topicButtons").empty();
    console.log(gifs)

    for (var i = 0; i < gifs.length; i++) {

      var a = $("<div>");
      a.addClass("gif-btn btn-1");
      a.attr("data-name", gifs[i]);
      a.text(gifs[i]);
      console.log(a)
      $("#topicButtons").append(a); //adds gif search
     
    }
  }

  $("#addTopic").on("click", function(event) {
   
    event.preventDefault();
    
    var gif = $("#topic-input").val().trim();
    gifs.push(gif); //adds search to array
    $("#topic-input").val("") //clear search

    renderButtons();
  });
  
  
  $(document).on("click", ".gif-btn", displayGifs);

  $(document).on("click", ".gif-image", toggleGIF);

  renderButtons();