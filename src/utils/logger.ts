class Logger {
  private backgrounds = {
    info: '\x1b[46m',    
    warn: '\x1b[43m',    
    error: '\x1b[41m',   
    reset: '\x1b[0m'    
  };

  private bold = '\x1b[1m';    
  private whiteText = '\x1b[37m'; 

  private formatMessage(level: 'info' | 'warn' | 'error', message: string): string {
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

  public error(message: string): void {
    console.error(this.formatMessage('error', message));
  }
}

export default Logger;
