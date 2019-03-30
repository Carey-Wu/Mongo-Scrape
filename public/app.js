
// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<h4 data-id='" + data[i]._id + "'>" + data[i].title + "</h4>" + "<p data-id='" + data[i]._id + "'>" + data[i].summary + "<p/>" + "<p data-id='" + data[i]._id + "'>" + data[i].link + "<p/>");
    }
});

$("#scrapeNow").click(function () {
    window.location.href = "/scrape";
})

$("#infoNow").click(function () {
    window.location.reload();
})


// Whenever someone clicks a h4 tag
$(document).on("click", "h4", function () {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);

            // If there's a note in the article
            if (data.comment.length >= 1) {
                // The title of the article
                $("#comments").append("<h3>" + data.title + "</h3>");
                // An input to enter a new title
                $("#comments").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#comments").append("<button data-id='" + data._id + "' id='savenote' class= 'btn btn-primary'>Save Note</button>");

                for (var i = 0; i < data.comment.length; i++) {
                    // The title of the article
                    $("#comments").append("<h3>" + data.title + "</h3>");
                    // An input to enter a new title
                    $("#comments").append("<input id=" + data.comment[i]._id + " class='titleinput" + i + "' name='title' >");
                    // A textarea to add a new note body
                    $("#comments").append("<textarea id=" + data.comment[i]._id + " class='bodyinput" + i + "' name='body'></textarea>");
                    // // A button to delete a note, with the id of the article saved to it
                    $("#comments").append("<button data-id='" + data.comment[i]._id + "' id='deletenote' class= 'btn btn-danger'>Delete Note</button>");
                    // Place the title of the note in the title input
                    $(".titleinput" + i).val(data.comment[i].title);
                    // Place the body of the note in the body textarea
                    $(".bodyinput" + i).val(data.comment[i].body);
                }

            }
            else {
                // The title of the article
                $("#comments").append("<h3>" + data.title + "</h3>");
                // An input to enter a new title
                $("#comments").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#comments").append("<button data-id='" + data._id + "' id='savenote' class= 'btn btn-primary'>Save Note</button>");
            }
        });
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);

            // If there's a note in the article
            if (data.comment.length >= 1) {
                // The title of the article
                $("#comments").append("<h3>" + data.title + "</h3>");
                // An input to enter a new title
                $("#comments").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#comments").append("<button data-id='" + data._id + "' id='savenote' class= 'btn btn-primary'>Save Note</button>");
                for (var i = 0; i < data.comment.length; i++) {
                    // The title of the article
                    $("#comments").append("<h3>" + data.title + "</h3>");
                    // An input to enter a new title
                    $("#comments").append("<input id=" + data.comment[i]._id + " class='titleinput" + i + "' name='title' >");
                    // A textarea to add a new note body
                    $("#comments").append("<textarea id=" + data.comment[i]._id + " class='bodyinput" + i + "' name='body'></textarea>");
                    // // A button to delete a note, with the id of the article saved to it
                    $("#comments").append("<button data-id='" + data.comment[i]._id + "' id='deletenote'  class= 'btn btn-danger'>Delete Note</button>");
                    // Place the title of the note in the title input
                    $(".titleinput" + i).val(data.comment[i].title);
                    // Place the body of the note in the body textarea
                    $(".bodyinput" + i).val(data.comment[i].body);
                }

            }
            else {
                // The title of the article
                $("#comments").append("<h3>" + data.title + "</h3>");
                // An input to enter a new title
                $("#comments").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#comments").append("<button data-id='" + data._id + "' id='savenote' class= 'btn btn-primary'>Save Note</button>");
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#comments").empty();
        });
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#deletenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId,
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#comments").empty();
        });
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});