import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import { execSync } from 'child_process';

export default async function() {
	console.log(
		gradient.rainbow('Welcome to the RedPM pm2send prompt util!'),
		'\nNow you will be prompted for a command which will be executed on the process id below.'
	);

	const prompt = await inquirer.prompt([
		{
			type: 'input',
			name: 'pid',
			message: 'Please enter your process ID:',
		},
	]);

	console.log(
		chalk.gray(`> Executing pm2send for process id: ${prompt.pid}`),
		chalk.yellow(
			`\nYou can exit this by pressing ${chalk.black.bgHex('#aaa')(
				'CTRL+C'
			)} at any time or type ".quit.".`
		)
	);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const inp = await inquirer.prompt([
			{
				type: 'input',
				name: 'command',
				prefix: '',
				message: chalk.hex('#ccc')('>'),
			},
		]);

		if (inp.command == '.quit.') {
			break;
		}

		const spinner = createSpinner('Executing command...');
		spinner.start();

		try {
			await execSync(`pm2 send ${prompt.pid} "${inp.command}"`);
		} catch (error) {
			spinner.error({
				text: chalk.red('Error! Look below for further information:'),
			});
			throw new Error(`${error}`);
		}

		spinner.success({ text: 'Command executed successfully!' });
	}
}
