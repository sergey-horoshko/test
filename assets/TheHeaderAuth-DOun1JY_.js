import{b as i,d as l,y as _,u as d,r as u,c as o,e as s,g as n,f as m,w as p}from"./index-CDtww2dw.js";import{_ as g,a as f}from"./logo-light-CzNcJ0CA.js";const h=l({setup(){const e=_(),t=d();return{themeStore:e,goTo:()=>{console.log(123),t.push("/settings")}}}}),k={class:"flex w-full items-center justify-center bg-white shadow-lg dark:bg-dark-content"},y={class:"content flex items-center justify-between p-5"},b={key:0,src:g,alt:"Logo"},w={key:1,src:f,alt:"Logo"},T=n("i",{style:{"font-size":"1.4rem"},class:"pi pi-cog text-gray-500 dark:text-gray-300"},null,-1),x=[T];function C(e,t,r,$,v,B){const a=u("router-link");return o(),s("div",k,[n("div",y,[m(a,{to:"/"},{default:p(()=>[e.themeStore.theme==="dark"?(o(),s("img",b)):(o(),s("img",w))]),_:1}),n("button",{onClick:t[0]||(t[0]=(...c)=>e.goTo&&e.goTo(...c)),type:"button"},x)])])}const L=i(h,[["render",C]]);export{L as default};