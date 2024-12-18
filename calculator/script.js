const input = document.getElementsByTagName("input")[0];
const buttons = document.querySelectorAll(".buttons button");
let num1=0;
let num2=0;
let op="";
let result=0;
buttons.forEach((button) =>{
    button.addEventListener("click" ,(e) =>{
        const value = e.target.innerText;
        if(value === "Ac"){
            input.value="0";
        }else if(value === "Del"){
            input.value = input.value.slice(0,-1)||"0";
        }
        else if(value === "0" ||value === "1" ||value === "2" ||value === "3" ||value === "4" ||value === "5" ||value === "6" ||value === "7" ||value === "8" ||value === "9"){
            if(input.value === "0"|| input.value === "0.000"){
                input.value = value;
            }else if(input.value.length <=10){
                input.value = input.value+value;
            }
        }
        else if(value === "+" ||value === "-" ||value === "*" ||value === "/" ||value === "%"  ){
            num1 = Number(input.value);
            op=value;
            input.value="";
        }else if(value === "="){
            num2 =Number(input.value);
            if(op === "+"){
                result = num1 + num2;
            }
            if(op === "-"){
                result = num1 - num2;
            }
            if(op === "*"){
                result = num1 * num2;
            }
            if(op === "/"){
                result = num1 / num2;
            }
            if(op === "%"){
                result = num1 % num2;
            }
            input.value = result.toFixed(3);
            // num1=result;
        }
        else if(value==="."){
            input.value = input.value+value;
        }
    });
});
 

