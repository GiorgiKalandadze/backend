const { spawn, exec } = require('child_process');
const fs = require('fs');

function checkFFMPEGVersion() {
    return new Promise((resolve, reject) => {
        exec('ffmpeg -version', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                console.log('eee');
                return;
            }
            resolve(stdout);
        });
    });

}
checkFFMPEGVersion().then((res) => {
    console.log('Then - ', typeof res);
}).catch((e) => {
    console.log('Catch - ', e.message);

});
// convertAllInsideDir('testDir','png', 'png');
function convertAllInsideDir(folderPath, inputType, outputType)  {
    // TODO: validate and sanitize
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        const inputFiles = files.filter(file => file.endsWith(`.${inputType}`));
        inputFiles.forEach(file => {
            const inputPath = `${folderPath}/${file}`;
            const fileName = file.slice(0, -1 * inputType.length);
            const outputPath = `${folderPath}/111-${fileName}.${outputType}`;


            const ffmpeg_process = spawn('ffmpeg', ['-i', inputPath, outputPath]);
            ffmpeg_process.on('error', err => {
                console.error(`Error spawning ffmpeg process: ${err}`);
            });

            ffmpeg_process.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ffmpeg_process.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);

                const message = data?.toString();
                if(message.includes('Overwrite? [y/N]')) {
                    ffmpeg_process.stdin.write('y\n');
                }
            });

            ffmpeg_process.on('close', code => {
                console.log(`FFmpeg exited with code ${code}`);
            });
        });
    });
}
function convert(inputFilePath, outputFilePath) {
    const args = [
        '-i', inputFilePath,
        outputFilePath
    ];
    const ffmpeg_process = spawn('ffmpeg', args);

    ffmpeg_process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ffmpeg_process.stderr.on('data', (data) => {
        const message = data?.toString();
        if(message.includes('Overwrite? [y/N]')) {
            ffmpeg_process.stdin.write('y\n');
        }
    });

    ffmpeg_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function addWatermarkOnVideo(input, watermark, output) {
    const args = [
        '-i', input,
        '-i', watermark,
        '-filter_complex', "overlay=10:10",
        output
    ];
    const ffmpeg_process = spawn('ffmpeg', args);

    ffmpeg_process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ffmpeg_process.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);

        const message = data?.toString();
        if(message.includes('Overwrite? [y/N]')) {
            ffmpeg_process.stdin.write('y\n');
        }
    });

    ffmpeg_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}
// addWatermarkOnVideo('tmp.mp4', 'tra2.png', 'marked.mp4');

// convert('img.jpg', 'img3.mp3');

/**
 * @see https://ostechnix.com/20-ffmpeg-commands-beginners/
 * @see https://www.bannerbear.com/blog/ffmpeg-101-top-10-command-options-you-need-to-know-with-examples/#duration--t
 */