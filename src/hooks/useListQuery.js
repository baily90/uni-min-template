/**
 *
 * @param {*} fetchAPI
 * @param {*} params
 * @param {*} immediate 是否立即执行，有些情况不需要立即执行
 * @returns
 */
export default function useListQuery (fetchAPI, params = {}, immediate = true) {
  const status = ref('')
  const triggered = ref(false)

  const searchParams = ref({
    pageNo: 1,
    pageSize: 20,
    ...params
  })

  const dataSource = ref({
    total: 0,
    pageNo: 1,
    pageSize: 20,
    list: []
  })

  const isEmptyBoxShow = computed(() => {
    return dataSource.value.pageNo === 1 && dataSource.value.list.length === 0 && status.value !== 'loading'
  })

  const isLoadingBarShow = computed(() => {
    return dataSource.value.list.length > 0
  })

  const fetchData = async () => {
    try {
      status.value = 'loading'
      const { code, data } = await fetchAPI({ ...searchParams.value })
      if (code === 0) {
        dataSource.value.total = data.total || 0
        dataSource.value.pageNo = searchParams.value.pageNo
        dataSource.value.pageSize = searchParams.value.pageSize
        if (searchParams.value.pageNo === 1) {
          dataSource.value.list = data.list || []
        } else {
          dataSource.value.list = [...dataSource.value.list, ...data.list]
        }
        if (data.total > dataSource.value.list?.length) {
          status.value = 'more'
        } else {
          status.value = 'noMore'
        }
      }
    } catch (error) {
      dataSource.value.total = 0
      dataSource.value.list = []
      dataSource.value.pageNo = 1
      dataSource.value.pageSize = 20
      status.value = 'noMore'
    } finally {
      triggered.value = false
    }
  }

  const onRefresh = () => {
    if (['loading'].includes(status.value)) return
    triggered.value = true
    searchParams.value.pageNo = 1
    fetchData()
  }

  const scrollLower = () => {
    if (['loading', 'noMore'].includes(status.value)) return
    searchParams.value.pageNo++
    fetchData()
  }

  if (immediate) {
    fetchData()
  }

  return {
    status,
    triggered,
    searchParams,
    dataSource,
    isEmptyBoxShow,
    isLoadingBarShow,
    fetchData,
    onRefresh,
    scrollLower
  }
}
