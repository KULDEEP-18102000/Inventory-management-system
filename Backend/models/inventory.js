const mongoose=require('mongoose')

const Schema=mongoose.Schema

const InventorySchema= new Schema({
    InventoryName:{
        type:String,
        required:true
    },
    items:[]
})

module.exports=mongoose.model('Inventory',InventorySchema)
