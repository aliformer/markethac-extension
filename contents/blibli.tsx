

import type { PlasmoCSConfig, PlasmoCSUIAnchor, PlasmoGetInlineAnchor, PlasmoGetOverlayAnchor } from "plasmo"

import cssText from "data-text:~/contents/app.css"
import { DialogProvider, useDialog } from "../core/ui/dialog-context"
import {Main} from "../core/ui/blibli/main"
import { fetchData, tokopediaProductDetail, tokopediaShopInfoPayload, tokopediaShopProductPayload } from "../core/utils/tokopedia";
export const config: PlasmoCSConfig = {
  matches: ["https://www.blibli.com/**/*"],
  css: ["font.css"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
export const getShadowHostId = () => "blibli-inline"

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>{
  const selector = document.querySelector('#blibliApp > div > header > div.header__btm > div.header__btm__right > div.menus > div.cart.tooltip__trigger.menus__item')
  return selector
}
const OverlayBlibli= () => {
  
  return (<DialogProvider>
    <Main />
  </DialogProvider>)
}


export default OverlayBlibli;
