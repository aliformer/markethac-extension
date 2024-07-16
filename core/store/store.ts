import {proxy, useSnapshot} from "valtio"

export const formState = proxy({
    pageFrom:1,
    pageTo:0,
    sort: true,
    offset:80,
    shopId: ""
})