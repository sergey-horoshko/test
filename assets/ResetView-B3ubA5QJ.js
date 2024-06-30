import{b as y,d as $,j as _,k as h,v as k,l as I,r as i,c as f,e as v,g as a,t as l,f as d,w as b,m as V,n as x,p as F,q as S}from"./index-CDtww2dw.js";import{u as C}from"./index-Bseo6DBn.js";import{a as B,t as P}from"./request-DpTcvMri.js";import{r as N,e as j}from"./i18n-validators-Dl5lyeYw.js";import{r as E}from"./reset-vX_iYAUc.js";const T=$({setup(){const e=_(!0),t=h({email:""}),{t:n}=k(),p=I(()=>({email:{required:N,email:j}})),r=C(p,t);return{typePassword:e,form:t,v:r,validate:({prop:s})=>{const o=r.value.$errors.find(u=>u.$property===s);return o&&o.$message},onSubmit:async()=>{if(r.value.$touch(),!t.pending&&await r.value.$validate()){t.pending=!0;try{const s={email:t.email.toLowerCase()},o=await E(s);o!=null&&o.message&&B({title:n("successForm.success"),body:n("successForm.resetPassword")})}catch{P({title:n("errorForm.error"),body:n("errorForm.resetPassword")})}finally{t.pending=!1}}}}}}),q={class:"rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content"},z={class:"flex w-full items-center justify-between gap-3"},M={class:"text-2xl font-bold"},R={class:"mt-2 leading-5"},D={class:"flex flex-col"},L={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},U={key:0,class:"invalid mt-1 text-red-400"};function A(e,t,n,p,r,g){const c=i("router-link"),s=i("InputIcon"),o=i("InputText"),u=i("IconField"),w=i("Button");return f(),v("div",q,[a("div",z,[a("span",M,l(e.$t("reset.title")),1),d(c,{class:"font-semibold text-blue-600 dark:text-blue-500",to:"/auth"},{default:b(()=>[V(l(e.$t("reset.auth")),1)]),_:1})]),a("div",R,l(e.$t("reset.description")),1),a("form",{onSubmit:t[2]||(t[2]=S((...m)=>e.onSubmit&&e.onSubmit(...m),["prevent"])),autocomplete:"off",class:"mt-8"},[a("div",D,[a("label",L,l(e.$t("form.labelEmail")),1),d(u,{iconPosition:"left"},{default:b(()=>[d(s,{class:"pi pi-envelope"}),d(o,{modelValue:e.form.email,"onUpdate:modelValue":t[0]||(t[0]=m=>e.form.email=m),modelModifiers:{trim:!0},onFocus:t[1]||(t[1]=m=>e.v.$reset()),invalid:!!e.validate({prop:"email"}),type:"text",size:"large"},null,8,["modelValue","invalid"])]),_:1}),e.validate({prop:"email"})?(f(),v("div",U,l(e.validate({prop:"email"})),1)):x("",!0)]),d(w,{class:F([{"-loading":e.form.pending},"justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"]),loading:e.form.pending,label:e.form.pending?"":e.$t("form.buttonReset"),rounded:"",type:"submit"},null,8,["class","loading","label"])],32)])}const Q=y(T,[["render",A]]);export{Q as default};