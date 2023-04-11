const express=require('express')

const router=express.Router();

const inventoryController=require('../controllers/inventory')

//to create inventory
router.post('/createinventory',inventoryController.createInventory)

//to get all inventories
router.get('/getallinventories',inventoryController.getallInventories)

//to add item in inventory with Inventory Id given
router.post('/additem/:InventoryId',inventoryController.AddItemToInventory)

//to get particular inventory with Inventory Id given
router.get('/getinventory/:InventoryId',inventoryController.showInventory)

//to get particular item with Inventory Id and Item Id given
router.get('/getItem/:InventoryId/:ItemId',inventoryController.getItemOfInventory)

//to update item with Inventory Id and Item Id given
router.put('/updateitem/:InventoryId/:ItemId',inventoryController.UpdateItemOfInventory)

//to delete item with Inventory Id and Item Id given
router.delete('/deleteitem/:InventoryId/:ItemId',inventoryController.RemoveItemOfInventory)

module.exports=router