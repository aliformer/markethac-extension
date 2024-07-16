import type { PlasmoCSConfig, PlasmoCSUIAnchor, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from "plasmo"

import cssText from "data-text:~/contents/app.css"
import { DialogProvider, useDialog } from "../core/ui/dialog-context"
import {Main} from "../core/ui/tokopedia/main"
import { fetchData, tokopediaShopInfoPayload, tokopediaShopProductPayload } from "../core/utils/tokopedia";
export const config: PlasmoCSConfig = {
  matches: ["https://www.tokopedia.com/**"],
  css: ["font.css"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
export const getShadowHostId = () => "tokopedia-inline"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(`[data-testid="btnHeaderCart"]`)

const OverlayTokopedia= () => {
  
  return (<DialogProvider>
    <Main fetchData={fetchData} config ={[tokopediaShopInfoPayload, tokopediaShopProductPayload]}/>
  </DialogProvider>)
}


export default OverlayTokopedia;
