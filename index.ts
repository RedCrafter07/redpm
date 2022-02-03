#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { cwd, argv } from 'process';
import { execSync } from 'child_process';
import pm2send from './lib/utils/pm2send';

const args = argv.slice(2);

const command = args[0];

(async () => {
	switch (command) {
		case 'i':
		case 'install':
			console.log('Soon™️');
			break;
		case 'test':
			console.log(chalk.yellow(figlet.textSync('Hello')));
			break;
		case 'u':
		case 'utils':
			switch (args[1]) {
				case 'pm2send':
					pm2send();
					break;
			}
			break;
	}
})();
