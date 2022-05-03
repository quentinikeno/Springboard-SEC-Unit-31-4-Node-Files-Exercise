const fs = require("fs");
const axios = require("axios");
const argv = process.argv;
const path = `${argv[2]}`;

function checkIfURL(string) {
	try {
		url = new URL(string);
		return true;
	} catch (error) {
		return false;
	}
}

function cat(path) {
	try {
		const contents = fs.readFileSync(path, "utf8");
		console.log(contents);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

async function webCat(url) {
	try {
		const { data } = await axios.get(url);
		console.log(data);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

checkIfURL(path) ? webCat(path) : cat(path);
