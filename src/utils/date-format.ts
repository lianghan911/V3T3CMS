import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 要想转换UTC格式的时间dayjs必须继承utc
dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcTime(
  utcTime: string,
  format: string = DATE_TIME_FORMAT
) {
  // utc格式的时间是和北京时间错8小时,北京时间处于东8区
  return dayjs.utc(utcTime).utcOffset(8).format(format)
}
