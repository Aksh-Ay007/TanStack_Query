import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users=[

   {id:1,name:'Akshay'},
   {id:2,name:'bibin'},
   {id:3,name:'dipin'},
   {id:4,name:'gokul'},
   {id:5,name:'vivek'}
]

// Example route
app.get("/users", (req, res) => {
  res.json(users);
});

app.post('/users',(req,res)=>{

   const newUser = req.body;
   users.push(newUser)
   res.status(201).json(newUser)
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
