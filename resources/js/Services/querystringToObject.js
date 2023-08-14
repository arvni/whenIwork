import { isArray } from "lodash";

export default function q2o(){
    let search=location.search.substring(1);
    let o;
    var output={};
    if(search){
            new URLSearchParams(search).forEach((value,item)=>{
                output=array2Object(getObjectFeature(item),value,output);
            });
    }
    return output;
}

function getObjectFeature(text){
    let feature=[];
    let tmp="";
    text.split("").forEach((item,index)=>{
        if(item=="["){
            if(tmp!=""){
                feature.push(tmp);
                tmp="";
            }
                feature.concat(getObjectFeature(text.substring(index+1)));
        } else if(item=="]"){
            feature.push(tmp);
            tmp="";
        } else
            tmp+=item;
    });
    if(tmp!="")
        feature.push(tmp);
    return feature;
}

function array2Object(arr=[], value, parent){
    let tmp
    if(parent.hasOwnProperty(arr[0]))
        tmp=parent[arr[0]];
    else
        tmp={};
    if(arr.length>1)
        return ({...parent, [arr[0]]:array2Object(arr.splice(1),value, tmp)});
    if(arr[0]!="")
        return ({...parent,[arr[0]]:value});
    else{
        if(isArray(parent))
            return [...parent,value];
        return [value];
    }
}
