const regexOnlyLetters = /^[a-zA-Z\s]+$/;//solo letras


export function validation(obj) {
    let errors={};
if(!regexOnlyLetters.test(obj.name)){errors.name="Only letters"};
if(!obj.name){errors.name="Obligatory Field"};

if(obj.diets.length === 0){errors.diets="Select at least one Diet"};
if(obj.healthScore>100 || obj.healthScore<0 ){errors.healthScore="Only numbers from 0 to 100"};

if(obj.image.length<20){errors.image="invalid URL"}
if(!obj.image){errors.image="Obligatory Field"};

if(!obj.summary){errors.summary="Obligatory Field"};
if(obj.summary.length<50){errors.summary="50 characters minimal"};

if(obj.steps[obj.steps.length-1].step.length<10){errors.steps="10 characters minimal"}

return errors;
}

