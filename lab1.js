const express = require('express');
const app = express();
const port  = 3000;
//change user password to bcrypt form
const bcrypt = require('bcrypt')
const saltRounds = 10


let dbUsers = [
    {
        username: "alyaazafira",
        password:"123456",
        name:"alyaa",
        email: "alyaa@gmailcom"
    },
    {
        username: "fadhila",
        password:"654321",
        name:"fadh",
        email: "fadh1@gmailcom"
    }
]

//anable json body parsing
app.use(express.json());

//create a GET
app.get('/',(req,res) => {
    res.send ('HELLO WORLD!')
});

app.post('/',(req,res) => {
    res.send(req.body)
});

app.get('/bye', (req, res) => {
    res.send('Bye Bye World!')
});

app.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);
});

app.post('/hash',(req, res) => {
    const {username, password,name,email} = req.body;
    //store the password hash 
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
          hashed = hash
          console.log('hash: ',hash)
          res.send('SUCCESS')
      });
  });
   //send username and password to login func
   setTimeout(function() {login(username, hashed)}, 500)
   res.send(req.body)
  })
  
  app.post('/register', (req,res) => {
    const{newusername,newpassword,newname,newemail} = req.body;
    register(newusername,newpassword,newname,newemail)
      res.send(req.body)
  })

  function login(username, hashed){
    //console.log("SOME ONE TRY TO LOGIN:", username, password)
    let matched = dbUsers.find(element =>
        element.username == username
    )
    console.log(matched)
    if(matched){
        bcrypt.compare(matched.password,hashed,function(err, result){
        if(result==true){
          console.log("ACESS USING BCRYPT!")
        }else{
          console.log( "PASSWORD NOT MATCHED")
          console.log(result)
        }
      });
    }else{
      console.log("INVALID USERNAME")
    }
    }
  
    function register(newusername, newpassword, newname, newemail){
      //check if username exist
      let exist = dbUsers.find(element => 
          element.username == newusername
      )
      if(exist){
          console.log("USENAME ALREADY EXIST!")
      }
          else{
    dbUsers.push({
      username : newusername,
      password : newpassword,
      name : newname,
      email : newemail
    })
    console.log("SUCCESSFULLY REGISTERED")
    }
    }
  

    
    

