import{r as u,c as p,a as d,b as v,e as f,n as S,u as m,i}from"./index-DFoD-9j3.js";const h={__name:"Chip",props:{value:{type:[String,Number],required:!0},activeClass:{type:String},variant:{type:String,validator(a,e){return["text","outlined"].includes(a)}}},setup(a){const e=a,l=i("updateSelection",null),s=i("isSelected",null),n=u(!1),c=e.variant?e.variant:"default",r=()=>{l&&s&&l(e.value),e.activeClass&&(n.value=!n.value)},o=p(()=>{let t;return l&&s&&(t=s(e.value)),e.activeClass&&(t=n.value),t});return(t,C)=>(d(),v("div",{class:S(["chipBase chip w-max rounded-xl",{[a.activeClass]:o.value},`chip-${m(c)}`]),onClick:r},[f(t.$slots,"default")],2))}};export{h as default};
