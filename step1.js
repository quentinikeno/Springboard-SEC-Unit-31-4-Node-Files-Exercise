const fs = require("fs");
const argv = process.argv;
const path = `${argv[2]}`;

function cat(path) {
	try {
		const contents = fs.readFileSync(path, "utf8");
		console.log(contents);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

cat(path);
