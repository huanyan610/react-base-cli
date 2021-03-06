const chalk = require("chalk");
const readline = require("readline");

/**
 * 控制台清空，并输出提示信息
 * @param {String} 输出信息颜色
 * @param {String} 输出信息
 */

function clearConsole(color, str) {
  if (process.stdout.isTTY) {
    console.log("");
    const cutLine = ` react-base ${require("../../package.json").version} `;
    console.log(
      chalk.bgCyan(
        " -".repeat((process.stdout.columns - cutLine.length) / 4) +
          cutLine +
          "- ".repeat((process.stdout.columns - cutLine.length) / 4)
      )
    );
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.info(chalk[color](str));
    console.log("");
  }
}

module.exports = clearConsole;
