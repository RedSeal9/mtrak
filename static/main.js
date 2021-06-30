// api preview script
let o;
const sourceGames = ['tf','tf2','csgo','l4d2','bms','srcTest']
function main(){
o = document.getElementById('out');
GetApi()
.then((res)=>{
if(res.length == 0){o.innerHTML = '<div style="color:red">No servers have been found, or API is unreachable.</span>';};
for (i = 0, len = res.length; i < len; i++) { 
let arr = res[i];
var d = document.createElement('div');
d.innerHTML = 
`${i}: running '${arr.game}' ${arr.hostname}:${arr.port} "${arr.title}" `
if(sourceGames.indexOf(arr.game) !== -1){var a = document.createElement('a');a.innerHTML='(Join)';a.href=`steam://connect/${arr.hostname}:${arr.port}`;d.appendChild(a);};
o.appendChild(d);
}});
}

async function GetApi(){
let jres;
return fetch('/api/list')
.then(response=>response.json())
.then(data=>{jres = data})
.then(()=>{return jres;})
}

window.addEventListener("load", main);