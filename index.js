    import * as readline from 'node:readline';
    import * as os from 'node:os';
    import { userName } from './src/argsv/username.js';
    import { cdDir, lsDir, upDir, catFile } from './src/fs/files.js';

    const cliFileManager = () => {

            const workdirMessage = "You are currently in ";
            const invalidMessage = "Invalid input";
            const failedMessage = "Operation failed";

            const startMessage = "Welcome to the File Manager, " + userName + "!";
            const exitMessage = "Thank you for using File Manager, " + userName + ", goodbye!";

            const homeDir = os.homedir();
            let startDir = homeDir;
            const eol = os.EOL;

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
                
            rl.write(startMessage + eol);
            
            rl.write(workdirMessage + startDir + eol);
            
            rl.prompt();
            
            rl.on('line', (line) => {

                let input = line.trim();
                const command = input.split(" ")[0];

                if (command == '.exit') {
                    console.log(exitMessage);
                
                    process.exit(0);
                }
                switch (command) {
                    case '':
                        console.log(workdirMessage + startDir);
                        rl.prompt();
                        break;

                    case 'up':
                        startDir = upDir(startDir);
                        console.log(workdirMessage + startDir);
                        rl.prompt();
                        break;

                    case 'cd':
                        const cdPath = input.substring(3).replace('"', '').replace('"', '');
                        const p = cdDir(startDir, cdPath);
                        p.then( value => {
                            startDir = value;
                            console.log(workdirMessage + startDir);
                            rl.prompt();
                        })
                        break;

                    case 'ls':
                        lsDir(startDir)
                        .then( value => {
                            console.log(workdirMessage + startDir);
                            rl.prompt();
                        })
                        break;

                    case 'cat':
                            const catArg = input.split(" ")[1];

                            catFile(startDir, catArg)
                            .then( value => {
                                console.log(workdirMessage + startDir);
                                rl.prompt();
                            })
                        break;
    
    
                    default:
                        console.log(invalidMessage);
                        console.log(workdirMessage + startDir);
                        rl.prompt();
                        break;
                };

            });
            
            rl.on('close', () => {
                
                console.log(eol + exitMessage);
                
                process.exit(0);
            }); 
        
    };

    cliFileManager();