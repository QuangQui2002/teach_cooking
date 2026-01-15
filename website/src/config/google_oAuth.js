// google_oAuth.js
var googleAuth = (function () {
  function installClient() {
    const apiUrl = 'https://apis.google.com/js/api.js'
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = apiUrl
      script.onload = () => {
        setTimeout(() => resolve(), 500)
      }
      document.head.appendChild(script)
    })
  }

  function initClient(config) {
    return new Promise((resolve) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init(config).then(() => {
          resolve(window.gapi)
        })
      })
    })
  }

  function Auth() {
    if (!(this instanceof Auth)) return new Auth()
    this.GoogleAuth = null
    this.isAuthorized = false
    this.isInit = false
    this.prompt = null

    this.load = (config, prompt) => {
      installClient()
        .then(() => initClient(config))
        .then((gapi) => {
          this.GoogleAuth = gapi.auth2.getAuthInstance()
          this.isInit = true
          this.prompt = prompt
          this.isAuthorized = this.GoogleAuth.isSignedIn.get()
        })
    }

    this.signIn = (successCallback, errorCallback) => {
      return this.GoogleAuth
        ? this.GoogleAuth.signIn().then((googleUser) => {
          successCallback?.(googleUser)
          this.isAuthorized = this.GoogleAuth.isSignedIn.get()
          return googleUser
        }).catch(errorCallback)
        : Promise.reject(false)
    }

    this.signOut = (successCallback, errorCallback) => {
      return this.GoogleAuth
        ? this.GoogleAuth.signOut().then(() => {
          successCallback?.()
          this.isAuthorized = false
          return true
        }).catch(errorCallback)
        : Promise.reject(false)
    }
  }

  return new Auth()
})()

export default {
  install(app, options) {
    let GoogleAuthConfig = {
      scope: 'profile email',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      ...options
    }
    let prompt = options?.prompt || 'select_account'

    if (!options?.clientId) {
      console.warn('clientId is required')
    }

    // Gắn vào globalProperties thay cho Vue.prototype
    app.config.globalProperties.$gAuth = googleAuth
    googleAuth.load(GoogleAuthConfig, prompt)
  }
} 