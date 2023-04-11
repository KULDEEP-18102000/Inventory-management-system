const Inventory = require("../models/inventory");
const Item = require("../models/item");

exports.getallInventories = async (req, res) => {
  try {
    const Inventories = await Inventory.find({});
    res.status(200).json(Inventories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

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

exports.getItemOfInventory = async(req, res) => {
  try {
    // GET /inventory/:id - Retrieve a single item from the inventory
    const inventoryId = req.params.InventoryId;
    // console.log(inventoryId)
    const itemId = req.params.ItemId;
    // console.log(itemId)
    const inventory = await Inventory.findById(inventoryId);
    // console.log(inventory)
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

exports.AddItemToInventory = async (req, res) => {
  try {
    const ItemName = req.body.ItemName;
    const InventoryId = req.params.InventoryId;
    const inventory = await Inventory.findOne({ _id: InventoryId });
    // console.log(inventory)
    const item = await Item.create({ name: ItemName });
    inventory.items.push(item);
    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// d. PUT /inventory/:id - Update an existing item in the inventory
exports.UpdateItemOfInventory = async (req, res) => {
  try {
    const newItemName = req.body.ItemName;
    const inventoryId = req.params.InventoryId;
    const itemId = req.params.ItemId;
    const inventory = await Inventory.findById(inventoryId);
    const fetchedItem=await Item.findById(itemId)
    
    fetchedItem.name = newItemName;
    fetchedItem.save();
    // console.log(fetchedItem)
    const new_items=inventory.items.filter((item)=>{
        return item._id.toString()!=fetchedItem._id.toString()
    })
    // console.log(new_items)
    new_items.push(fetchedItem)
    inventory.items=new_items
    inventory.save()
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// e. DELETE /inventory/:id - Remove an item from the inventory
exports.RemoveItemOfInventory = async(req, res) => {
  try {
    const inventoryId = req.params.InventoryId;
    console.log(inventoryId)
    const itemId = req.params.ItemId;
    console.log(itemId)
    const inventory = await Inventory.findById(inventoryId);
    console.log(inventory)
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
