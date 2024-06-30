const __vite__fileDeps=["assets/TableComponent-CegXkvQ7.js","assets/index-CDtww2dw.js","assets/index-C0vtodnR.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{b as f,d as u,v as x,a as h,r as l,c as v,e as b,g as s,t,f as a,w as g,_ as y,A as $,B as I}from"./index-CDtww2dw.js";import{a as w}from"./request-DpTcvMri.js";import{u as T}from"./me-BFpF1b53.js";import{_ as S}from"./logo-DhDLasHi.js";const P=u({setup(){const{t:e}=x(),n=T(),{user:i}=n;return{user:i,copy:c=>{navigator.clipboard.writeText(c).then(()=>{w({title:e("successForm.success"),body:e("successForm.copy")})})}}},components:{Table:h(()=>y(()=>import("./TableComponent-CegXkvQ7.js"),__vite__mapDeps([0,1,2])))}}),o=e=>($("data-v-856efcde"),e=e(),I(),e),k={class:"min-h-96 rounded-lg px-5 pb-0 pt-0 md:pb-0 md:pt-0"},C={class:"card flex w-full items-center justify-center gap-8 rounded-lg bg-green-600 p-5 text-xs text-white md:gap-16 md:px-12 md:py-8 md:text-base md:shadow-xl"},D={class:"flex min-h-[150px] flex-col justify-between"},E=o(()=>s("div",{class:"mb-6 flex flex-col gap-2"},[s("img",{class:"logo",src:S,alt:"logo"}),s("span",{class:"text font-bold"},"P A R T N E R")],-1)),j={class:"flex flex-col"},z=o(()=>s("span",{class:"mb-1"}," Partner ID ",-1)),A={class:"font-medium"},B={class:"flex min-h-[150px] flex-col justify-between"},F={class:"flex flex-col md:mt-4"},V={class:"flex items-center gap-3"},M=o(()=>s("i",{class:"pi pi-dollar",style:{"font-size":"1rem"}},null,-1)),N=o(()=>s("div",{class:"ml-8 flex items-center gap-3"},[s("span",{class:"font-bold"},"00,00"),s("span",{class:"text-xs text-gray-300"},"USDT")],-1)),R={class:"mt-4 flex flex-col"},L={class:"flex items-center gap-3"},U=o(()=>s("i",{class:"pi pi-calendar",style:{"font-size":"1rem"}},null,-1)),O=o(()=>s("div",{class:"ml-8 flex items-center gap-3"},[s("span",{class:"font-bold"},"00,00"),s("span",{class:"text-xs text-gray-300"},"USDT")],-1)),q={class:"mt-4 flex flex-col"},G={class:"flex items-center gap-3"},H=o(()=>s("i",{class:"pi pi-users",style:{"font-size":"1rem"}},null,-1)),J=o(()=>s("div",{class:"ml-8 flex items-center gap-3"},[s("span",{class:"font-bold"},"0")],-1)),K={class:"mt-6 flex flex-col"},Q={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},W={class:"mt-1 text-right"},X={class:"mt-8 flex w-full items-center justify-between gap-3"},Y={class:"text-2xl font-bold leading-7"},Z={class:"mt-3 leading-5"},ss={class:"mt-3 leading-5"},es={class:"ml-1 font-medium text-blue-600 dark:text-blue-500"};function ts(e,n,i,d,c,os){const r=l("InputIcon"),p=l("InputText"),m=l("IconField"),_=l("Table");return v(),b("div",k,[s("div",C,[s("div",D,[E,s("div",j,[z,s("span",A,t(e.user.promo),1)])]),s("div",B,[s("div",F,[s("div",V,[M,s("span",null,t(e.$t("partners.allPaid")),1)]),N]),s("div",R,[s("div",L,[U,s("span",null,t(e.$t("partners.lastMonth")),1)]),O]),s("div",q,[s("div",G,[H,s("span",null,t(e.$t("partners.invitePartners")),1)]),J])])]),s("div",K,[s("label",Q,t(e.$t("form.referralLink")),1),a(m,{iconPosition:"left"},{default:g(()=>[a(r,{class:"pi pi-verified"}),a(p,{value:`https://cab.opes.team/?ref=${e.user.promo}`,disabled:"",type:"text",size:"large"},null,8,["value"])]),_:1})]),s("div",W,[s("div",{onClick:n[0]||(n[0]=ns=>e.copy(`https://cab.opes.team/?ref=${e.user.promo}`)),class:"cursor-pointer text-xs font-medium text-blue-600 dark:text-blue-500"},t(e.$t("form.copy")),1)]),s("div",X,[s("span",Y,t(e.$t("partners.title")),1)]),s("div",Z,t(e.$t("partners.description")),1),s("div",ss,[s("span",null,t(e.$t("partners.descriptionMore")),1),s("span",es,t(e.$t("partners.descriptionEnd")),1)]),a(_)])}const ds=f(P,[["render",ts],["__scopeId","data-v-856efcde"]]);export{ds as default};
