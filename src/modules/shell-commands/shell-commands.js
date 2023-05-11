const { exec } = require('child_process');

function searchFile(filePath, searchString) {
    // shell command to search for the string in the file
    const cmd = `findstr "${searchString}" ${filePath}`;

    // execute the command using child_process.exec()
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

searchFile('C:\\Users\\U\\Desktop\\Projects\\backend\\src\\bigText.txt', 'fire');
