<template>
  <nuxt/>
</template>

<script>
import { axiosDefaultConfig, cancelAllRequests } from '@mornya/restful-libs'

export default {
  name: 'ApplicationProvider',
  watch: {
    async $route (nextRoute, prevRoute) {
      // 최초 진입을 제외한 라우트 이동시
      if (prevRoute.fullPath !== '/' && prevRoute.fullPath !== nextRoute.fullPath) {
        await cancelAllRequests() // API 호출 중지
        this.$events.$emit('LOADING_PROGRESSBAR_FINISH') // API로딩바 완료처리
      }
    },
  },
  created () {
    axiosDefaultConfig({
      defaults: {
        baseURL: process.env.BUILD_ENV === 'local' ? '' : process.env.API_URI,
        timeout: process.env.API_REQUEST_TIMEOUT,
      },
      isShowLog: process.env.BUILD_ENV !== 'production',
      onRequest: (/*config, currReqs*/) => { this.$events.$emit('LOADING_PROGRESSBAR_START') },
      onResponse: (/*response, currReqs*/) => { this.$events.$emit('LOADING_PROGRESSBAR_FINISH') },
      onRequestError: (/*error, currReqs*/) => {
        this.$events.$emit('LOADING_PROGRESSBAR_FAIL')
        this.$events.$emit('LOADING_FINISH')
      },
      onResponseError: (/*error, currReqs*/) => {
        this.$events.$emit('LOADING_PROGRESSBAR_FAIL')
        this.$events.$emit('LOADING_FINISH')
      },
      onInvalidate: (which, error) => {
        // response data는 error.response.data로 확인
        console.info(`API ${which === 'request' ? 'Request' : 'Response'} Error`)
        console.error(error.response.data.message ?? error.message)
      },
    })
  },
  mounted () {
    console.log(
      `\n%c${process.env.APP_NAME_FULL}\n`,
      'margin-bottom:4px;color:#1ab394;font-size:14px;font-weight:bold;line-height:1.2em;border-bottom:2px solid #1ab394',
    )
    if (process.env.NODE_ENV !== 'production') {
      console.log('Environment variables: ', process.env)
    }

    // 아래는 테스트용
    // this.$events.$emit('SHOW_LOADING')
    // setTimeout(() => this.$events.$emit('HIDE_LOADING'), 2000)
  },
}
</script>
