import { useContext } from 'react'
import { QwebContext } from '@/tool/qwebchannel/provider'
export { PageType } from '@/tool/qwebchannel'
const useQwebApi = () => {
  const { fetchQt, qtContext, on, off, once } = useContext(QwebContext)
  return {
    fetchQt,
    qtContext,
    on,
    off,
    once,
  }
}

export default useQwebApi
