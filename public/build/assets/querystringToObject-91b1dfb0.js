import{l as u}from"./app-9ac2a27d.js";function n(){let s=location.search.substring(1);var e={};return s&&new URLSearchParams(s).forEach((t,i)=>{e=o(f(i),t,e)}),e}function f(s){let e=[],t="";return s.split("").forEach((i,r)=>{i=="["?(t!=""&&(e.push(t),t=""),e.concat(f(s.substring(r+1)))):i=="]"?(e.push(t),t=""):t+=i}),t!=""&&e.push(t),e}function o(s=[],e,t){let i;return t.hasOwnProperty(s[0])?i=t[s[0]]:i={},s.length>1?{...t,[s[0]]:o(s.splice(1),e,i)}:s[0]!=""?{...t,[s[0]]:e}:u.isArray(t)?[...t,e]:[e]}export{n as q};