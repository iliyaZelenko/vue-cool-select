// pattern Module
function Observer () {
  const listeners = {}

  function addListener (event, listener) {
    if (!listeners[event]) listeners[event] = []

    listeners[event].push(listener)
  }

  return {
    on: addListener,
    onOnce (event, listener) {
      listener.once = true

      addListener(event, listener)
    },
    emit (event, data) {
      for (const index in listeners[event]) {
        const listener = listeners[event][index]

        listener(data)

        if (listener.once) {
          delete listeners[event][index]
        }
      }
    }
  }
}

export default Observer
