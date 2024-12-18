import type { PlasmoCSConfig, PlasmoCSUIAnchor, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from "plasmo"

import cssText from "data-text:~/contents/app.css"
import { DialogProvider, useDialog } from "../core/ui/dialog-context"
import {Main} from "../core/ui/shopee/main"
export const config: PlasmoCSConfig = {
  matches: ["https://shopee.co.id/**"],
  css: ["font.css"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
export const getShadowHostId = () => "shopee-inline"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(`#sll2-ShopeeHeaderWithSearch > div > div > div.header-with-search__cart-wrapper`)

const OverlayShopee= () => {
  
  return (<DialogProvider>
    <Main />
  </DialogProvider>)
}


export default OverlayShopee;
