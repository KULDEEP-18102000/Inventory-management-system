const Inventory = require("../models/inventory");
const Item = require("../models/item");

//to get all inventories
exports.getallInventories = async (req, res) => {
  try {
    const Inventories = await Inventory.find({});
    res.status(200).json(Inventories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to create inventory
exports.createInventory = async (req, res) => {
  try {
    const InventoryName = req.body.inventoryName;
    const inventory = await Inventory.create({ InventoryName: InventoryName });
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to get particular inventory with Inventory Id given
exports.showInventory = async (req, res) => {
  try {
    const inventoryId = req.params.InventoryId;
    const inventory = await Inventory.findById(inventoryId);
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to get particular item with Inventory Id and Item Id given
exports.getItemOfInventory = async(req, res) => {
  try {
    const inventoryId = req.params.InventoryId;
    const itemId = req.params.ItemId;
    const inventory = await Inventory.findById(inventoryId);
    let fetchedItem;
    inventory.items.forEach((item) => {
      if (item._id == itemId) {
        fetchedItem = item;
      }
    });
    res.status(200).json(fetchedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to add item in inventory with Inventory Id given
exports.AddItemToInventory = async (req, res) => {
  try {
    const ItemName = req.body.ItemName;
    const InventoryId = req.params.InventoryId;
    const inventory = await Inventory.findOne({ _id: InventoryId });
    const item = await Item.create({ name: ItemName });
    inventory.items.push(item);
    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to update item with Inventory Id and Item Id given
exports.UpdateItemOfInventory = async (req, res) => {
  try {
    const newItemName = req.body.ItemName;
    const inventoryId = req.params.InventoryId;
    const itemId = req.params.ItemId;
    const inventory = await Inventory.findById(inventoryId);
    const fetchedItem=await Item.findById(itemId)
    
    fetchedItem.name = newItemName;
    fetchedItem.save();
    const new_items=inventory.items.filter((item)=>{
        return item._id.toString()!=fetchedItem._id.toString()
    })
    new_items.push(fetchedItem)
    inventory.items=new_items
    inventory.save()
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//to remove item with Inventory Id and Item Id given
exports.RemoveItemOfInventory = async(req, res) => {
  try {
    const inventoryId = req.params.InventoryId;
    const itemId = req.params.ItemId;
    const inventory = await Inventory.findById(inventoryId);
    let newItems=inventory.items.filter(item=>{
        return item._id.toString()!==itemId.toString()
    })
    inventory.items=newItems
    inventory.save()
    res.status(200).json(inventory)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
