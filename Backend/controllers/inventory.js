const Inventory=require('../models/inventory')
const Item=require('../models/item')

exports.getallInventories=async(req,res)=>{
    try {
        const Inventories=await Inventory.find({})
        res.status(200).json(Inventories)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.createInventory=async(req,res)=>{
    try {
        const InventoryName=req.body.inventoryName
        const inventory=await Inventory.create({InventoryName:InventoryName})
        res.status(200).json(inventory)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.showInventory=async(req,res)=>{
    try {
        const id=req.params.id
        const inventory=await Inventory.findById(id)
        res.status(200).json(inventory)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.AddItemToInventory=async(req,res)=>{
    try {
        const ItemName=req.body.ItemName
        const InventoryId=req.params.InventoryId
        const inventory= await Inventory.findOne({_id:InventoryId})
        // console.log(inventory)
        const item=await Item.create({name:ItemName})
        inventory.items.push(item)
        await inventory.save()
        res.status(200).json(inventory)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}