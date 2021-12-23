const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
//const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'susmita',
    database : 'smartbrain'
  }
});
const app = express();
const database = {
  users: [
    {
      id:'123',
      name:'susmita',
      email:'sus@gmail.com',
      password:'namik',
      entries:0,
      joined:new Date()
    },
    {
      id:'124',
      name:'baishnavi',
      email:'bais@gmail.com',
      password:'love',
      entries:0,
      joined:new Date()
    }
  ],
  Login: [
    {
      id:'987',
      hash:'',
      email:'sus@gmail.com'
    }
  ]
}
app.use(bodyParser.json());
app.use(cors())
app.get('/' ,(req ,res) => {res.send(database.users);})
//app.post('/signin' ,(req , res) =>{ signin.handleSignin(req , res , db , bcrypt)})
app.post('/signin' , signin.handleSignin( db , bcrypt))
app.post('/register',(req , res) =>{ register.handleRegister(req , res , db , bcrypt)})
app.get('/profile/:id' ,(req , res) =>{ profile.handleProfileGet(req , res , db )})
app.put('/image' ,(req , res) =>{ image.handleImage(req , res , db )}) 
app.post('/imageurl' ,(req , res) =>{ image.handleApiCall(req , res )}) 


app.listen(3000 , ()=> {
    console.log('app is running on port 3000');
})






///=======================================================================================================================///



//change: line no :68
//============================

/*
in the /signin route: After the if statement:

res.json(database.users[0]);

instead of

res.json("success"). 
*/

//================================




// app.get('/' ,(req ,res) => {
//   //res.send('this is working');
//   res.send(database.users);
// })


//register
//============================================================================

// app.post('/register', (req,res) => {
//   const {email , name , password} = req.body;

//   const hash = bcrypt.hashSync(password);
//      db.transaction(trx => {
//        trx.insert ({
//          hash: hash,
//          email: email
//        })
//        .into('login')
//        .returning('email')
//        .then(loginEmail => {
//          return trx('users')
//          .returning('*')
//          .insert({
//           email: loginEmail[0],
//           name: name,
//           joined: new Date()
//          })
//          .then(user => {
//            res.json(user[0]);
//          })
//        })
//        .then(trx.commit)
//        .catch(trx.rollback)

//     })


    
  // bcrypt.hash(password, null, null, function(err, hash) {
  //   console.log(hash);
  // });

  //---------
  //// database.users.push ({
  ////   id:'125',
  ////   name:name,
  ////   email:email,
  ////   //password:password,
  ////   entries:0,
  ////   joined:new Date()
  //// })
  
  /////db('users')
  /////.returning('*')
  /////.insert({
  /////  email: email,
  /////  name: name,
  /////  joined: new Date()
  /////})
    //.then(console.log)
    /// .then(response => {
    ///   res.json(response);

    /////.then(user => {
    /////  res.json(user[0]);
      //res.json(database.users[database.users.length-1]);
    /////})
    //.catch(err => res.status(400).json(err))

    
//     .catch(err => res.status(400).json('unable to register'))
// })



//signin
//==================================================================

// app.post('/signin' ,(req ,res) => {
//   db.select('email' ,'hash').from('login')
//     .where('email' , '=' , req.body.email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(req.body.password , data[0].hash);
//       //console.log(isValid);
//       if (isValid) {
//         return db.select('*').from('users')
//           .where('email' , '=' , req.body.email)
//           .then(user => {
//             //console.log(user);
//             res.json(user[0])
//           })
//           .catch(err => res.status(400).json('unable to get user'))
//       } else {
//         res.status(400).json('weong credentials')
//       }
      
//     })
//     .catch(err => res.status(400).json('wrong credentials'))

//Load hash from your password DB.


/*
bcrypt.compare("namik1", '$2a$10$cs32ZFQhsQPJtyTWWMCQcO9CWjH9MXZPNSlOa.S0zh8fMW0DZWE8a', function(err, res) {
  console.log('first guess' , res)
});
bcrypt.compare("veggies", '$2a$10$cs32ZFQhsQPJtyTWWMCQcO9CWjH9MXZPNSlOa.S0zh8fMW0DZWE8a', function(err, res) {
  console.log('second guess' , res)

}); */


  ///if (req.body.email === database.users[0].email  &&
    ///req.body.password === database.users[0].password) {
    
      //res.json('success'); 

      ///res.json(database.users[0]);

    
    //res.send('signing');
    //res.json('signing');
    ///} else {
    ///  res.status(400).json('error logging in');
    ///}
// })




//profile
//===========================================================================



//----------------------------------------------
// app.get('/profile/:id' ,(req , res) => {
//   const { id } = req.params;
//   database.users.forEach(user => {
//     if (user.id === id) {
//       res.json(user);
//     } else {
//       res.status(404).json('no such user');
//     }
//   })
// })
//----------------------------------------------


//// app.get('/profile/:id' ,(req , res) => {
////   const { id } = req.params;



  //let found = false;
  
  // db.select('*').from('users').then(user => {
  //   console.log(user);


  // db.select('*').from('users').where({
  //   id:id
  // })




  //// db.select('*').from('users').where({id})
  ////   .then(user => {
  ////     if(user.length) {
  ////       res.json(user[0])
  ////     } else {
  ////       res.status(400).json('Not found')
  ////     }
  ////   })
  ////   .catch(err => res.status(400).json('error getting user'))



    // .then(user => {
    // console.log(user);
    ///.then(user => {
      ///console.log(user);
      //console.log(user[0]);
     /// res.json(user[0])


  //// })



  
  // database.users.forEach(user => {
  //   if (user.id === id) {
  //     found = true;
  //     return res.json(user);
  //   } 
  // })

  // if (!found) {
  //   res.status(400).json('not found');
  // }
///})




//--------------------------------------------
/*
app.get('/profile/:id' ,(req , res) => {
  const { id } = req.params;

  db.select('*').from('users').where({id})
    .then(user => {
      if(user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
   
  })
*/
  //--------------------------------------------





  //image
  //=========================================================


  //// app.put('/image' ,(req , res) => {
  ////   const { id } = req.body;
  ////   db('users').where('id' , '=' ,id)
  ////   .increment('entries' , 1)
  ////   .returning('entries')
  ////   .then(entries => {
  ////     //console.log(entries);
  ////     res.json(entries[0]);
  ////   })
  ////     .catch(err => res.status(400).json('unable to get entries'))
  


    // let found = false;
    // database.users.forEach(user => {
    //   if (user.id === id) {
    //     found = true;
    //     user.entries++
    //     return res.json(user.entries);
    //   } 
    // })
    // if (!found) {
    //   res.status(400).json('not found');
    // }


  //// })
  




  
///console.log(postgres.select('*').from('users'));
//postgres.select('*').from('users');

////  postgres.select('*').from('users').then(data => {
////    console.log(data);
////  });


////// db.select('*').from('users').then(data => {
//////   console.log(data);
////// });




//============================================

// bcrypt.hash("bacon", null, null, function(err, hash) {
//   // Store hash in your password DB.
// });



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

//============================================






//if localhost:3000/profile/id is  not working we have to refresh register again 



/*

/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/





