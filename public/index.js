
function sendFeedback() {
    var text="";
    var feed= document.getElementById("feedForm");
    console.log(feed);
    if (feed.elements[0].value != "") {
        var text = feed.elements[0].value;   
        var txt = '{ "text" : "'+ text.toString() +'" }';   
        const data=JSON.parse(txt);      
          $.post("http://localhost:3000/feedback",data , function (response) {
          console.log("got response, sent feedback id is: " ); 
          console.log( response);
          displayResponse(response) ;
      });
    }
}
     
    function getFeedbackById(){
        var feed= document.getElementById("idForm");
        var id=feed.elements[0].value;
        console.log("Sending get request : feedback with id " + id);
        if(!isNaN(id)){
            $.get("http://localhost:3000/feedback/"+id,  function (response) {
                console.log("Got response, feedbacks with id " + id);
                console.log(response);
                displayById(response);
             });
        }  
    }

    function getAll(){
            $.get("http://localhost:3000/feedback",  function (response) {
                console.log("Got response, All feedbacks:");
                console.log(response);
                displayAll(response);
             });    
    }

    function displayResponse(res) {
        $("#feedbacksContainer").empty()
        $("#feedbacksContainer").append("<h3> Feedback id is " +res.id + "</h3>");
    }

    function displayById(res) {
        $("#feedbacksContainer").empty()
        if(res._id!=undefined){
        $("#feedbacksContainer").append("<h3>  id " +res._id+ " , text : "+ res._text+ "</h3>");
        }
    }

    function displayAll(res){
        $("#feedbacksContainer").empty();
        var html= "<h4> All Feedbacks:";
        var arr=res.allFeedbacks;
        for(var i=0;i<arr.length;i++){
            html+=  "<h3> id: " + arr[i]._id + " , text: " +arr[i]._text+ "</h1>"
        }
        $("#feedbacksContainer").append(html);
    }


    
