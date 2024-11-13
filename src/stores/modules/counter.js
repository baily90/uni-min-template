export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}, {
  unistorage: true
  // unistorage: {
  //   key: 'counter',
  //   paths: ['count'],
  //   // 缓存过期时间，单位为毫秒，默认为 0，表示不过期
  //   // expires: 1000 * 60 * 60 * 24 * 7,
  //   // 缓存过期时间，单位为毫秒，默认为 0，表示不过期
  //   expires: 0,
  //   // 缓存过期时间，单位为毫秒，默认为 0，表示不过期
  //   // expires:1000 * 60 * 60 * 24 * 7,
  // }
})
