import md5 from 'md5'
import dayjs from 'dayjs'

/**
 * 通过unix时间戳生成id
 * @returns md5后的id string
 */
function createUniqueId(): string {
  const now = dayjs().valueOf() + Math.floor(Math.random() * 100)
  return md5([now])
}

export { createUniqueId }
