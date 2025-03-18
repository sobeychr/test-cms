import type { APIRoute } from 'astro';
import { CLogger } from '@classes/CLogger';
import { CResponse } from '@classes/CResponse';

export const GET: APIRoute = async () => {
  const errors = CLogger.getAllLogs('error');
  const infos = CLogger.getAllLogs('info');
  const requests = CLogger.getAllLogs('request');

  errors.forEach(error => {
    const request = requests.find(entry => entry.uuid === error.uuid);
    const report = { ...error };
    delete report.uuid;
    request.error = report;
  });

  infos.forEach(info => {
    const request = requests.find(entry => entry.uuid === info.uuid);
    request.info = info.logs || [];
  });

  return CResponse.quickJson([
    ...requests,
  ]);
};;
