export function shopeeUrlMatch(url:string ){
let item_id:string| RegExpMatchArray = url.match(/(?<=\/.+-i\.[0-9]+\.)[0-9]+/g)
let shop_id:string| RegExpMatchArray= url.match(/(?<=\/.+-i\.)[0-9]+/g)
if(!shop_id || !item_id){
    item_id = url.split("/").at(-1)
    shop_id = url.split("/").at(-2)
}
return {item_id, shop_id}
}