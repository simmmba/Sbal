import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import * as H from 'history'

function ScrollToTop({ history }: { history: H.History }) {
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unListen()
    }
  }, [history])

  return null
}

export default withRouter(ScrollToTop)
