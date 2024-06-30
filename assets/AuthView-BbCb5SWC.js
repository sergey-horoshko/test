import{b as k,d as V,j as _,k as x,l as I,r as d,c as m,e as p,g as s,t as l,f as n,w as u,m as b,n as h,p as P,q as S,u as C,s as z}from"./index-CDtww2dw.js";import{u as B}from"./index-Bseo6DBn.js";import{u as F}from"./me-BFpF1b53.js";import{r as $,e as M,m as N}from"./i18n-validators-Dl5lyeYw.js";import{s as T,t as j}from"./request-DpTcvMri.js";function q(e){return T({url:"/login/",method:"post",data:e})}const E=V({setup(){const e=_(!0),t=x({email:"",password:null,pending:null}),v=C(),g=F(),{getProfile:w}=g,y=I(()=>({email:{required:$,email:M},password:{required:$,minLength:N(6)}})),r=B(y,t);return{typePassword:e,form:t,v:r,validate:({prop:i})=>{const a=r.value.$errors.find(o=>o.$property===i);return a&&a.$message},onSubmit:async()=>{if(r.value.$touch(),!t.pending&&await r.value.$validate()){t.pending=!0;try{const i={email:t.email.toLowerCase(),password:t.password},a=await q(i);a!=null&&a.access_token?(z(a.access_token),await w(),await v.push("/")):j({title:"Ошибка",body:"Произошла ошибка, свяжитесь с администратором"})}catch(i){console.log(i)}finally{t.pending=!1}}}}}}),L={class:"rounded-lg p-5 md:bg-white md:p-12 md:shadow-xl dark:md:bg-dark-content"},A={class:"flex w-full items-center justify-between gap-3"},R={class:"text-2xl font-bold"},U={class:"mt-2 leading-5"},D={class:"flex flex-col"},G={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},H={key:0,class:"invalid mt-1 text-red-400"},J={class:"relative mt-6 flex flex-col"},K={class:"mb-1 text-xs font-medium text-gray-500 dark:text-gray-300"},O={key:0,class:"pi pi-eye",style:{"font-size":"1.1rem"}},Q={key:1,class:"pi pi-eye-slash",style:{"font-size":"1.1rem"}},W={key:0,class:"invalid mt-1 text-red-400"},X={class:"mt-1 text-right"};function Y(e,t,v,g,w,y){const r=d("router-link"),f=d("InputIcon"),c=d("InputText"),i=d("IconField"),a=d("Button");return m(),p("div",L,[s("div",A,[s("span",R,l(e.$t("auth.title")),1),n(r,{class:"font-semibold text-blue-600 dark:text-blue-500",to:"/registration"},{default:u(()=>[b(l(e.$t("auth.registration")),1)]),_:1})]),s("div",U,l(e.$t("auth.description")),1),s("form",{onSubmit:t[5]||(t[5]=S((...o)=>e.onSubmit&&e.onSubmit(...o),["prevent"])),autocomplete:"off",class:"mt-8"},[s("div",D,[s("label",G,l(e.$t("form.labelEmail")),1),n(i,{iconPosition:"left"},{default:u(()=>[n(f,{class:"pi pi-envelope"}),n(c,{modelValue:e.form.email,"onUpdate:modelValue":t[0]||(t[0]=o=>e.form.email=o),modelModifiers:{trim:!0},onFocus:t[1]||(t[1]=o=>e.v.$reset()),invalid:!!e.validate({prop:"email"}),type:"text",size:"large"},null,8,["modelValue","invalid"])]),_:1}),e.validate({prop:"email"})?(m(),p("div",H,l(e.validate({prop:"email"})),1)):h("",!0)]),s("div",J,[s("label",K,l(e.$t("form.labelPassword")),1),n(i,{iconPosition:"left"},{default:u(()=>[n(f,{class:"pi pi-lock"}),n(c,{modelValue:e.form.password,"onUpdate:modelValue":t[2]||(t[2]=o=>e.form.password=o),modelModifiers:{trim:!0},onFocus:t[3]||(t[3]=o=>e.v.$reset()),invalid:!!e.validate({prop:"password"}),type:e.typePassword?"password":"text",size:"large"},null,8,["modelValue","invalid","type"])]),_:1}),s("button",{class:"toggle p-2",type:"button",onClick:t[4]||(t[4]=o=>e.typePassword=!e.typePassword)},[e.typePassword?(m(),p("i",O)):(m(),p("i",Q))]),e.validate({prop:"password"})?(m(),p("div",W,l(e.validate({prop:"password"})),1)):h("",!0)]),s("div",X,[n(r,{class:"text-xs font-medium text-blue-600 dark:text-blue-500",to:"/reset"},{default:u(()=>[b(l(e.$t("auth.reset")),1)]),_:1})]),n(a,{class:P([{"-loading":e.form.pending},"justify-content-center mt-6 flex w-full bg-blue-600 p-4 text-center text-white"]),loading:e.form.pending,label:e.form.pending?"":e.$t("form.buttonSignIn"),rounded:"",type:"submit"},null,8,["class","loading","label"])],32)])}const ae=k(E,[["render",Y]]);export{ae as default};
