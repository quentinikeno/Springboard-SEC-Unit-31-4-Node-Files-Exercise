const fs = require("fs");
const axios = require("axios");
const { argv } = process;
const path = `${argv[argv.length - 1]}`;

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
		return contents;
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

async function webCat(url) {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

function writeFile(path, output) {
	try {
		fs.writeFileSync(path, output);
	} catch (error) {
		console.log(`Couldn't write ${path}`, error);
	}
}

async function readOrWrite() {
	let output = checkIfURL(path) ? await webCat(path) : cat(path);
	argv[2] === "--out" ? writeFile(argv[3], output) : console.log(output);
}

readOrWrite();
