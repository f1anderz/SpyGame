import{_ as i,o as p,c as l,t as r,x as a,y as e,i as y,a as d,p as u,h as m,s as h}from"./index-D7cZbWx5.js";const x={name:"SpyButtonMini"},b=Object.assign(x,{props:{content:String},emits:["buttonClick"],setup(t,{emit:o}){const c=o,s=t;return(_,n)=>(p(),l("button",{class:"spy-button",onClick:n[0]||(n[0]=k=>c("buttonClick"))},r(s.content),1))}}),B=i(b,[["__scopeId","data-v-21d69c22"]]),A={async getCollections(){return await a.get(`${e.link}/locationsCollections`,{headers:{"x-api-key":e.key}})},async getCollection(t){return await a.get(`${e.link}/locationsCollections/${t}`,{headers:{"x-api-key":e.key}})},async postCollection(t){return await a.post(`${e.link}/locationsCollections`,{collectionName:t.name,locations:t.locations},{headers:{"Content-Type":"application/json","x-api-key":e.key}})},async getLocations(){return await a.get(`${e.link}/locations`,{headers:{"x-api-key":e.key}})},async postLocation(t){return await a.post(`${e.link}/locations`,{locationName:t},{headers:{"Content-Type":"application/json","x-api-key":e.key}})}},C=t=>(u("data-v-42fb5245"),t=t(),m(),t),g={class:"spy-checkbox"},S=["checked"],$=C(()=>d("span",{class:"spy-checkbox-checkmark"},null,-1)),f={name:"SpyCheckbox"},w=Object.assign(f,{props:{option:Object},emits:["selected"],setup(t,{emit:o}){const c=o,s=t;return(_,n)=>(p(),l("label",g,[y(r(s.option.name)+" ",1),d("input",{type:"checkbox",checked:s.option.selected,onClick:n[0]||(n[0]=k=>c("selected",s.option))},null,8,S),$]))}}),N=i(w,[["__scopeId","data-v-42fb5245"]]),v={name:"SpyAlertWindow"},I=Object.assign(v,{props:{isHidden:Boolean,message:String},setup(t){const o=t;return(c,s)=>(p(),l("div",{class:h(["spy-alert-window",{hidden:o.isHidden}])},r(o.message),3))}}),O=i(I,[["__scopeId","data-v-cd62f39a"]]);export{O as A,N as S,B as a,A as l};
