import service from '@/utils/request'

export const login = (data: object) => {
  return service({
    url: 'http://xxx.com/prod-api/login',
    data
  })
}
