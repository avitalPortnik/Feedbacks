const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');

const PORT= 3000;
const app = express();
const feedbackArray= [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

class feedback {
    constructor() {
      this._id = 0;
      this._text='';
    }
    set id(index) {
      this._id = index;
    }
    set text(txt) {
        this._text = txt;
      }
  }

app.post('/feedback', function(req,res){
  console.log("got POST request: " +JSON.stringify( req.body));
  var newFeedback=new feedback();
  newFeedback._id=feedbackArray.length+1;
  newFeedback._text=req.body.text;
  feedbackArray.push(newFeedback);
  res.status(200).send({"id": newFeedback._id});
})

app.get('/feedback', function(req,res){
  console.log("got POST request: get All feedbacks " );
  res.status(200).send({"allFeedbacks":  feedbackArray});
})

app.get('/feedback/:id', function(req,res){
    var id=req.params.id;
    console.log("got GET request for feedback id : " + id);
    if(!isNaN(id) &&  id<=feedbackArray.length && id>=0){
        res.status(200).send(feedbackArray[req.params.id-1]);
    }
    else{
        res.status(200).send({});  
    }
  })

app.listen(PORT, function(){
  console.log("server listening on port: " + PORT);
});