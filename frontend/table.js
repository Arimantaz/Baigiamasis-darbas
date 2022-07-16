$(document).ready(function () {
    $("body").on("click", ".btn-delete", async function(){
        const personId = $(this).parents('tr').attr('id');

        const response = await fetch(`http://localhost:5000/delete-person/${personId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        $(this).parents('tr').remove();
    });
});

$(function() {
    $("body").on("click", ".btn-patch",function() {
        const row = $(this).parents('tr');
        const personId = row.attr('id');
        const firstName = row.find("#first-name").text();
        const lastName = row.find("#last-name").text();
        const email = row.find("#email").text();
        const age = row.find("#age").text();


        $("#patchModalLabel").text("Dalyvis: " + personId);
        $("#first-name-input").val(firstName);   
        $("#last-name-input").val(lastName);
        $("#person-email-input").val(email);
        $("#person-age-input").val(Date.parse(age));

    });
});

$("#edit-form").submit(async function(event){
        event.preventDefault();
        var modalTitle = $("#patchModalLabel").text().split(" ");
        const body = {
            firstName: $("#first-name-input").val(), 
            lastName: $("#last-name-input").val(),
            email: $("#person-email-input").val(),
            age: $("#person-age-input").val()
        };

        const response = await fetch(`http://localhost:5000/patch-person/${modalTitle[1]}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });



        location.reload();
    })

    $(document).ready(async function(){
        var response = await fetch("http://localhost:5000/get-people");

        var people = await response.json();                

        people.forEach(person => {
            
            $("#tdata").append(
            `<tr id="${person._id}">` + 
           
            "<td id = \"first-name\">" + person.firstName + "</td>" + 
            "<td id = \"last-name\">" + person.lastName + "</td>" + 
            "<td id = \"email\">" + person.email + "</td>" + 
            "<td id = \"age\">" + person.age + "</td>" + 
            "<td><button class = \"btn btn-primary btn-patch\"  data-bs-toggle=\"modal\" data-bs-target=\"#patchModal\">Redaguoti</button></td>" +
            "<td><button class = \"btn btn-primary btn-delete\">Trinti</button></td>" + 
            "</tr>");
        });

        $('#data-table').DataTable();
    })