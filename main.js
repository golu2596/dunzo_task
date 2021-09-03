//Taking Inventory as a single global instance (equivalent to singleton class instance)
var itemInventory;

//This method is for checking Inventory status
//if current inventory item is less than 50% of original quantity, alert to refill
function checkInventoryStatus(originalInventory){	
	let response = '';
	for(key in originalInventory){
		if(originalInventory[key]-itemInventory[key]>=originalInventory[key]/2){
			response = response + key + " needs to be refilled \n";
		}
	}
	return response;
}

//This method is to refill the current Inventory
//If item is not found in current Inventory, add to it
//Else update the value of the item
function refillInventory(inventory){
	for(let key in inventory){
		if(itemInventory[key]==undefined){
			itemInventory[key] = inventory[key]
		}
		else{
			itemInventory[key] = itemInventory[key] + inventory[key];
		}
	}
}


//This function contains our business logic of the code
//Loop over all the beverages
//Loop over each item of beverage and check if it is available or not 
//(Apparently this factor was given preference in the output hence considered separately)
//Loop over each item of beverage and check if the required quantity exists in the Inventory or not
//Loop over each item of beverage and update Inventory if item can be served

async function serveBeverages(outletCount, beverages){
	let result = '';
	//making a deep copy of Inventory before serving beverages
	let originalInventory = { ...itemInventory };
	for(let keys in beverages){
		let beverage = beverages[keys]
		//taking a flag declaring it as can serve, if any item is not available, it gets updated to can not serve 
		//hence the item doesnt get processed
		let status = "CanServe"
		for(let key in beverage){
			if(itemInventory[key]==undefined){
				result = result + keys + " cannot be prepared because "+ key + " is not available \n";
				status = "CanNotServe"
				break;	
			}
		}
		if(status==="CanServe"){
			for(let key in beverage){
				if(itemInventory[key]<beverage[key]){
					result = result + keys + " cannot be prepared because item "+ key + " is not sufficient \n";
					status = "CanNotServe"
					break;
				}
			}	
		}
		
		if(status === "CanServe"){
			if(outletCount<=0){
				result = result + keys + " cannot be prepared because no outlet available \n";
				continue;
			}
			for(let key in beverage){
				itemInventory[key] = itemInventory[key] - beverage[key];
			}	
			result = result + keys + " is prepared \n";
			outletCount = outletCount -1;
		}
	}
	let response = await checkInventoryStatus(originalInventory);
	return result+"\n" +response + "\n";
}


//This is the entry point of this file
//Two arguments, one is input json object
//Other is when Inventory needs to be refilled
//process in the inputs in required variables and return the output 
async function processInputs(data, Inventory){
	var machineDetails = data['machine']
	var outletCount = machineDetails['outlets']['count_n']
	itemInventory = machineDetails['total_items_quantity']
	var beverages = machineDetails['beverages']
	if(Inventory==undefined){
		let result = await serveBeverages(outletCount, beverages)
		return result;	
	}
	else{
		await refillInventory(Inventory);
		let result = await serveBeverages(outletCount, beverages)
		return result;
	}
	
}

module.exports = {processInputs};