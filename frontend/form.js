$("#reg-form").submit(async function(event){
    console.log($("#first-name").val());
    event.preventDefault();
    const body = {
        firstName: $("#first-name").val(), 
        lastName: $("#last-name").val(),
        email: $("#person-email").val(),
        age: $("#person-age").val()
    };

    $("#submit-btn").addClass("loading");
    $("#spinner").removeClass("loading");

    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => {
        window.alert('Person added successfully!');
    }).catch(error => {
        window.alert('Error adding person!');
    });



    $("#submit-btn").removeClass("loading");
    $("#spinner").addClass("loading");
})

document.getElementById("reg-form").reset()