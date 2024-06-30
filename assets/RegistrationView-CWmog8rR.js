import{b as V,d as P,j as S,k as x,l as C,r as p,c as d,e as m,g as s,t as a,f as l,w as u,m as k,n as v,p as I,q as _,u as z,s as L}from"./index-CDtww2dw.js";import{u as B}from"./index-Bseo6DBn.js";import{u as F}from"./me-BFpF1b53.js";import{r as g,m as h,e as M}from"./i18n-validators-Dl5lyeYw.js";import{s as R,t as E}from"./request-DpTcvMri.js";function N(e){return R({url:"/register/",method:"post",data:e})}const T=P({setup(){const e=S(!0),t=x({promocode:null,email:"",password:null,pending:null}),y=z(),w=F(),{getProfile:b}=w,$=C(()=>({promocode:{required:g,minLength:h(8)},email:{required:g,email:M},password:{required:g,minLength:h(6)}})),n=B($,t);return{typePassword:e,form:t,v:n,validate:({prop:i})=>{const r=n.value.$errors.find(o=>o.$property===i);return r&&r.$message},onSubmit:async()=>{if(n.value.$touch(),!t.pending&&await n.value.$validate()){t.pending=!0;try{const i={email:t.email.toLowerCase(),login:t.email.toLowerCase(),name:"123123123",last_name:"123123",password:t.password,confirmPassword:t.password,referral_promo:t.promocode,terms:!0,isAcceptRules:!1},r=await N(i);console.log(r),r!=null&&r.access_token?(L(r.access_token),await b(),await y.push("/")):E({title:"Ошибка",body:"Произошла ошибка, свяжитесь с администратором"})}catch(i){console.log(i)}finally{t.pending=!1}}}}}}),U={class:"rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content"},j={class:"flex w-full items-center justify-between gap-3"},q={class:"text-2xl font-bold"},A={class:"mt-2 leading-5"},D={class:"flex flex-col"},G={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},H={key:0,class:"invalid mt-1 text-red-400"},J={class:"mt-6 flex flex-col"},K={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},O={key:0,class:"invalid mt-1 text-red-400"},Q={class:"relative mt-6 flex flex-col"},W={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},X={key:0,class:"pi pi-eye",style:{"font-size":"1.1rem"}},Y={key:1,class:"pi pi-eye-slash",style:{"font-size":"1.1rem"}},Z={key:0,class:"invalid mt-1 text-red-400"},ee={class:"mt-6 text-xs"};function te(e,t,y,w,b,$){const n=p("router-link"),f=p("InputIcon"),c=p("InputText"),i=p("IconField"),r=p("Button");return d(),m("div",U,[s("div",j,[s("span",q,a(e.$t("registration.title")),1),l(n,{class:"font-semibold text-blue-600 dark:text-blue-500",to:"/auth"},{default:u(()=>[k(a(e.$t("registration.auth")),1)]),_:1})]),s("div",A,a(e.$t("registration.description")),1),s("form",{onSubmit:t[7]||(t[7]=_((...o)=>e.onSubmit&&e.onSubmit(...o),["prevent"])),autocomplete:"off",class:"mt-8"},[s("div",D,[s("label",G,a(e.$t("form.labelPromocode")),1),l(i,{iconPosition:"left"},{default:u(()=>[l(f,{class:"pi pi-check-circle"}),l(c,{modelValue:e.form.promocode,"onUpdate:modelValue":t[0]||(t[0]=o=>e.form.promocode=o),modelModifiers:{trim:!0},onFocus:t[1]||(t[1]=o=>e.v.$reset()),invalid:!!e.validate({prop:"promocode"}),type:"text",size:"large"},null,8,["modelValue","invalid"])]),_:1}),e.validate({prop:"promocode"})?(d(),m("div",H,a(e.validate({prop:"promocode"})),1)):v("",!0)]),s("div",J,[s("label",K,a(e.$t("form.labelEmail")),1),l(i,{iconPosition:"left"},{default:u(()=>[l(f,{class:"pi pi-envelope"}),l(c,{modelValue:e.form.email,"onUpdate:modelValue":t[2]||(t[2]=o=>e.form.email=o),modelModifiers:{trim:!0},onFocus:t[3]||(t[3]=o=>e.v.$reset()),invalid:!!e.validate({prop:"email"}),type:"text",size:"large"},null,8,["modelValue","invalid"])]),_:1}),e.validate({prop:"email"})?(d(),m("div",O,a(e.validate({prop:"email"})),1)):v("",!0)]),s("div",Q,[s("label",W,a(e.$t("form.labelPassword")),1),l(i,{iconPosition:"left"},{default:u(()=>[l(f,{class:"pi pi-lock"}),l(c,{modelValue:e.form.password,"onUpdate:modelValue":t[4]||(t[4]=o=>e.form.password=o),modelModifiers:{trim:!0},onFocus:t[5]||(t[5]=o=>e.v.$reset()),invalid:!!e.validate({prop:"password"}),type:e.typePassword?"password":"text",size:"large"},null,8,["modelValue","invalid","type"])]),_:1}),s("button",{class:"toggle p-2",type:"button",onClick:t[6]||(t[6]=o=>e.typePassword=!e.typePassword)},[e.typePassword?(d(),m("i",X)):(d(),m("i",Y))]),e.validate({prop:"password"})?(d(),m("div",Z,a(e.validate({prop:"password"})),1)):v("",!0)]),s("div",ee,[s("span",null,a(e.$t("registration.rulesStart")),1),l(n,{class:"mx-1 font-medium text-blue-600 dark:text-blue-500",to:"/docs"},{default:u(()=>[k(a(e.$t("registration.rulesLink")),1)]),_:1}),s("span",null,a(e.$t("registration.rulesEnd")),1)]),l(r,{class:I([{"-loading":e.form.pending},"justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"]),loading:e.form.pending,label:e.form.pending?"":e.$t("form.buttonSignUp"),rounded:"",type:"submit"},null,8,["class","loading","label"])],32)])}const ie=V(T,[["render",te]]);export{ie as default};
