const __vite__fileDeps=["assets/TheAccountComponent-By4dzalJ.js","assets/me-B7TNIDym.js","assets/index-D0RtDb04.js","assets/index-Dp3Z5kZL.css","assets/request-D-Pgtuu-.js","assets/i18n-validators-DXFbBJ_0.js","assets/index-Cs4T_qhb.js","assets/TheAccountComponent-C1MT-67a.css","assets/TheWalletsComponent-DfjfwOec.js","assets/TheWalletsComponent-Er6Pf4yc.css","assets/TheInterfaceComponent-Eu67Suzg.js","assets/TheInterfaceComponent-BVxWYxK6.css","assets/TheHelpComponent-Cp0Ojnga.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{b as p,d,j as l,k as m,o as _,a as n,c as o,e as a,g as s,t as i,F as u,z as h,h as C,i as f,_ as r,p as g}from"./index-D0RtDb04.js";const b=d({setup(){const e=l("TheWalletsComponent"),c=m([{id:1,text:"settings.account",component:"TheAccountComponent"},{id:2,text:"settings.wallet",component:"TheWalletsComponent"},{id:3,text:"settings.interface",component:"TheInterfaceComponent"},{id:4,text:"settings.help",component:"TheHelpComponent"}]);return _(()=>{}),{tabs:c,currentComponent:e}},components:{TheAccountComponent:n(()=>r(()=>import("./TheAccountComponent-By4dzalJ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7]))),TheWalletsComponent:n(()=>r(()=>import("./TheWalletsComponent-DfjfwOec.js"),__vite__mapDeps([8,1,2,3,4,5,6,9]))),TheInterfaceComponent:n(()=>r(()=>import("./TheInterfaceComponent-Eu67Suzg.js"),__vite__mapDeps([10,2,3,5,11]))),TheHelpComponent:n(()=>r(()=>import("./TheHelpComponent-Cp0Ojnga.js"),__vite__mapDeps([12,2,3])))}}),v={class:"rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content"},T={class:"flex w-full items-center justify-between gap-3"},k={class:"text-2xl font-bold"},x={class:"mt-1"},E={class:"mt-8 flex items-center gap-4 text-gray-500"},$=["onClick"];function w(e,c,A,I,y,D){return o(),a("div",v,[s("div",T,[s("span",k,i(e.$t("settings.title")),1)]),s("div",x,i(e.$t("settings.description")),1),s("div",E,[(o(!0),a(u,null,h(e.tabs,t=>(o(),a("div",{key:t.id,onClick:V=>e.currentComponent=t.component,class:g([{"border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500":e.currentComponent===t.component,"border-transparent":e.currentComponent!==t.component},"w-fit cursor-pointer border-b-[2px] pb-2 font-semibold duration-200"])},i(e.$t(t.text)),11,$))),128))]),(o(),C(f(e.currentComponent)))])}const P=p(b,[["render",w],["__scopeId","data-v-48461d70"]]);export{P as default};
