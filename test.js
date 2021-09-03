//import exported modules from main file
const {processInputs} = require('./main')
//require the fs library to read and write json
const fs = require("fs");

//This function is used to write the response in output json file
function getJsonOutput(result, outputPath){
	fs.writeFile(outputPath, result, 'utf8', (err, response)=>{
		if(err){
			console.log("File write failed ", err)	
		}
		else {
			console.log("Test Case passed successfully")
		}
		
	});
}


//This function is used to read the response from input json file
function getJsonInput(inputPath, outputPath, callback){
	fs.readFile(inputPath, "utf8", async (err, jsonString) => {
	  if (err) {
	    console.log("File read failed:", err);
	    return;
	  }
	  callback(JSON.parse(jsonString));	
	});
}


//*****************Test Cases begin from here*********************************//


//Test Case 1 
//input given as reference with the problem statement
//Some of the beverages get served


async function testCase1(result){
	var inputPath = "./input/input1.json"
	var outputPath = "./output/output1.json"	
	if(result==undefined){
		getJsonInput(inputPath, outputPath, testCase1);	
	}
	else{
		let response = await processInputs(result);
		getJsonOutput(response, outputPath);
	}
}

testCase1();


//Test Case 2
//input modified as comapared to what was given in the problem statement
//All of the beverages get served


async function testCase2(result){
	var inputPath = "./input/input2.json"
	var outputPath = "./output/output2.json"	
	if(result==undefined){
		getJsonInput(inputPath, outputPath, testCase2);	
	}
	else{
		let response = await processInputs(result);
		getJsonOutput(response, outputPath);
	}
}

testCase2();


//Test Case 3
//input modified as comapared to what was given in the problem statement
//None of the beverages get served


async function testCase3(result){
	var inputPath = "./input/input3.json"
	var outputPath = "./output/output3.json"	
	if(result==undefined){
		getJsonInput(inputPath, outputPath, testCase3);	
	}
	else{
		let response = await processInputs(result);
		getJsonOutput(response, outputPath);
	}
}

testCase3();



//Test Case 4
//input modified as comapared to what was given in the problem statement
//Some of the beverages get served where more than N beverages are provided
//Also passing more options exceeding N, giving output as no outlet available

async function testCase4(result){
	var inputPath = "./input/input4.json"
	var outputPath = "./output/output4.json"	
	if(result==undefined){
		getJsonInput(inputPath, outputPath, testCase4);	
	}
	else{
		let response = await processInputs(result);
		getJsonOutput(response, outputPath);
	}
}

testCase4();


//Test Case 5
//input given as reference with the problem statement
//Some of the beverages get served
//Then After getting refill reminder Inventory gets refilled
//Able to prepare more items than before

async function testCase5(result){
	var inputPath = "./input/input5.json"
	var outputPath = "./output/output5.json"	
	if(result==undefined){
		getJsonInput(inputPath, outputPath, testCase5);	
	}
	else{
		let response = await processInputs(result);
		var Inventory =  {
					      "hot_water": 500,
					      "hot_milk": 500,
					      "ginger_syrup": 100,
					      "sugar_syrup": 100,
					      "tea_leaves_syrup": 100
					    }
						
		let refillResponse = await processInputs(result, Inventory);
		let refillString = "Refilling the Inventory\n" + "\n"
		response = response + refillString + refillResponse;
		getJsonOutput(response, outputPath);
	}
}




testCase5();


