class Logger {
  private backgrounds = {
    info: '\x1b[46m',
    warn: '\x1b[43m',
    error: '\x1b[41m',
    debug: '\x1b[44m',
    success: '\x1b[48;5;22m',
    reset: '\x1b[0m',
  };

  private bold = '\x1b[1m';
  private whiteText = '\x1b[37m';

  private formatMessage(
    level: 'info' | 'warn' | 'error' | 'debug' | 'success',
    message: string,
  ): string {
    const timestamp = new Date().toLocaleString();
    const background = this.backgrounds[level];

    const levelStyled = `${background}${this.bold}${this.whiteText}[${level.toUpperCase()}]${this.backgrounds.reset}`;

    return `[${timestamp}] ${levelStyled} ${message}`;
  }

  public info(message: string): void {
    console.info(this.formatMessage('info', message));
  }

  public warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  public error(message: string, error: unknown): void {
    const formattedMessage = this.formatMessage('error', message);
    console.error(
      `${formattedMessage}\nErro: ${JSON.stringify(error, null, 2)}`,
    );
  }

  public debug(message: string, data?: unknown): void {
    const formattedMessage = this.formatMessage('debug', message);

    if (data) {
      console.debug(
        `${formattedMessage}\nDados: ${JSON.stringify(data, null, 2)}`,
      );
    } else {
      console.debug(formattedMessage);
    }
  }

  public success(message: string): void {
    console.log(this.formatMessage('success', message));
  }
}

export default Logger;
