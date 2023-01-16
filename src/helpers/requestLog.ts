import { IncomingMessage, ServerResponse } from 'http';

export function requestLog(
  request: IncomingMessage,
  response: ServerResponse,
  pid?: number
): void {
  const time = new Date();
  console.log(
    `[${time.toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })}] ${request.method} ${response.statusCode} ${request.url} ${
      pid != undefined ? pid : ''
    }`
  );
}
