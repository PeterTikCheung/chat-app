// src/library/logging.ts
import chalk from 'chalk';
export default class Logging {
  public static info = (args: string): void => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.blue(`
[${new Date().toLocaleString()}]
[Log]:`),
      typeof args === 'string' ? chalk.blueBright(args) : args,
    );
  };

  public static warn = (args: string): void => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.yellow(`
[${new Date().toLocaleString()}]
[Info]:`),
      typeof args === 'string' ? chalk.yellowBright(args) : args,
    );
  };

  public static error = (args: string): void => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.red(`
[${new Date().toLocaleString()}]
[Warn]:`),
      typeof args === 'string' ? chalk.redBright(args) : args,
    );
  };

  public static log = (args: string): void => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.green(`
[${new Date().toLocaleString()}]
[Error]:`),
      typeof args === 'string' ? chalk.greenBright(args) : args,
    );
  };
}
