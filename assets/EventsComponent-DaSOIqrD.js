import{b as m,d as x,j as u,D as _,o as g,r as y,H as h,c as i,e as a,g as s,t as o,f as v,F as w,z as T,p as D,n as d,I as k}from"./index-CDtww2dw.js";const b=x({setup(){const t=u(!1),n=u([]),r=_("dayjs"),c=()=>{t.value||(t.value=!0,setTimeout(()=>{const l=[{id:1,uuid:"123456789000",icon:"pi-download",title:"Пополнение средств",description:"Заявка на внесение 1 234 567,89 USDT принята в обработку.",date:"2024-05-04T23:40:47+0000",status:"wait"},{id:2,uuid:"123456789000",icon:"pi-download",title:"Пополнение средств",description:"Заявка на внесение 1 234 567,89 USDT принята в обработку.",date:"2024-05-20T23:40:47+0000",status:"success"},{id:3,uuid:"123456789000",icon:"pi-download",title:"Пополнение средств",description:"Заявка на внесение 1 234 567,89 USDT принята в обработку.",date:"2024-06-04T23:40:47+0000",status:"cancel"},{id:4,uuid:"123456789000",icon:"pi-users",title:"Начисление прибыли локапа",description:"На локап L-000000001 начислена прибыль за апрель в размере 1 234,56 USDT.",date:"2024-05-04T23:40:47+0000",status:"success"},{id:4,uuid:"123456789000",icon:"pi-percentage",title:"Начисление прибыли от партнеров",description:"Начислена прибыль от партнеров за апрель в размере 234,56 USDT.",date:"2024-05-04T23:40:47+0000",status:"success"},{id:5,uuid:"123456789000",icon:"pi-upload",title:"Вывод средств",description:"Заявка на вывод 234 567,89 USDT принята в обработку.",date:"2024-05-04T23:40:47+0000",status:"wait"},{id:6,uuid:"123456789000",icon:"pi-download",title:"Завершение локапа",description:"02 июня 2024 в 00:00 локап L-000000002 будет закрыт.",date:"2024-05-20T23:40:47+0000",status:"success"},{id:7,uuid:"123456789000",icon:"pi-upload",title:"Вывод средств",description:"Заявка на вывод 234 567,89 USDT принята в обработку.",date:"2024-06-04T23:40:47+0000",status:"wait"},{id:8,uuid:"123456789000",icon:"pi-upload",title:"Вывод средств",description:"Заявка на вывод 234 567,89 USDT принята в обработку.",date:"2024-05-04T23:40:47+0000",status:"cancel"}];n.value=l,t.value=!1},1e3))};return g(()=>{c()}),{dayjs:r,operations:n,pending:t}}}),S={class:"mt-6"},$={class:"text-lg font-bold leading-7"},U={key:0,class:"mt-12 flex items-center justify-center"},j={key:1,class:"mt-4 flex flex-col gap-4"},M={class:"flex w-full flex-col"},C={class:"id tracking-wider text-gray-400 dark:text-gray-300"},z={class:"mt-2 font-bold"},B={class:"mt-2 text-xs font-medium text-gray-500 dark:text-gray-300"},H={class:"mt-3 flex items-center justify-between"},L={class:"text-xs text-gray-400 dark:text-gray-300"},N={key:0,class:"min-w-[5.6rem] rounded-full bg-gray-600 px-3 py-1 text-center text-xs font-medium text-white"},V={key:1,class:"min-w-[5.6rem] rounded-full bg-green-500 px-3 py-1 text-center text-xs font-medium text-white"},E={key:2,class:"min-w-[5.6rem] rounded-full bg-red-500 px-3 py-1 text-center text-xs font-medium text-white"},F={style:{"font-size":"0.9rem"},tabindex:"1",class:"pi pi-info-circle absolute right-5 top-4 max-h-2 min-h-2 min-w-2 max-w-2 cursor-pointer cursor-pointer text-blue-600"};function I(t,n,r,c,l,P){const p=y("ProgressSpinner"),f=h("tooltip");return i(),a("div",S,[s("span",$,o(t.$t("history.events")),1),t.pending?(i(),a("div",U,[v(p)])):(i(),a("div",j,[(i(!0),a(w,null,T(t.operations,e=>(i(),a("div",{key:e.id,class:"relative flex gap-3 rounded-lg bg-gray-100 p-4 md:bg-gray-200 dark:bg-dark"},[s("i",{style:{"font-size":"1.2rem"},class:D(["mt-6 text-gray-500 dark:text-gray-300",`pi ${e.icon}`])},null,2),s("div",M,[s("div",C,o(e.uuid),1),s("div",z,o(e.title),1),s("div",B,o(e.description),1),s("div",H,[s("span",L,o(t.dayjs(e.date).format("DD MMM HH:MM")),1),e.status==="wait"?(i(),a("span",N,o(t.$t("status.wait")),1)):d("",!0),e.status==="success"?(i(),a("span",V,o(t.$t("status.success")),1)):d("",!0),e.status==="cancel"?(i(),a("span",E,o(t.$t("status.cancel")),1)):d("",!0)])]),k(s("i",F,null,512),[[f,{value:"Средства поступят на баланс в течение 1 часа",showDelay:300,hideDelay:300},void 0,{focus:!0,left:!0}]])]))),128))]))])}const A=m(b,[["render",I],["__scopeId","data-v-3645705d"]]);export{A as default};
