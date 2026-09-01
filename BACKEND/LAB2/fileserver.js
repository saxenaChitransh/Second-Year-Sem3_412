const file = example.txt;

function createFile() {
    fs.writeFileSync("example.txt", "Hello, this is my file.");
    console.log("File created successfully!");
}

function readFile() {
    const data = fs.readFileSync("example.txt", "utf8");
    console.log("File Content:", data);
}

function updateFile() {
    fs.appendFileSync("example.txt", "This is updated content.");
    console.log("File updated successfully!");
}

function deleteFile() {
    fs.unlinkSync("example.txt");
    console.log("File deleted successfully!");
}

createFile();
readFile();
updateFile();
readFile();
deleteFile();