import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import * as H from 'history'

function ScrollToTop({ history }: { history: H.History }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [])

  return null
}

export default withRouter(ScrollToTop)
