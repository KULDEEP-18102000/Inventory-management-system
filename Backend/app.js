const express=require('express')
const app=express()

const userRoutes=require('./routes/user')
const inventoryRoutes=require('./routes/inventory')

const cors=require('cors')

const BodyParser=require('body-parser')

const mongoose=require('mongoose')

app.use(cors())

app.use(BodyParser.json({extended:false}))

app.use('/user',userRoutes)
app.use('/inventory',inventoryRoutes)


mongoose.connect('mongodb://0.0.0.0:27017/inventory_backend_db')
.then(result=>{
  console.log("connected")
  app.listen(5000)
})
.catch(err=>{
  console.log(err)
})