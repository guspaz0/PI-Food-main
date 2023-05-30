const regexOnlyLetters = /^[a-zA-Z\s]+$/;//solo letras


export function validation(obj) {
    let errors={};
if(!regexOnlyLetters.test(obj.name)){errors.name="solo letras"};
if(!obj.name){errors.name="Campo obligatorio"};

if(obj.diets.length === 0){errors.diets="seleccionar al menos una dieta"};
if(obj.healthScore>100 || obj.healthScore<0 ){errors.healthScore="solo numeros de 0 a 100"};

if(obj.image.length<20){errors.image="url invalido"}
if(!obj.image){errors.image="Campo obligatorio"};

if(!obj.summary){errors.summary="Campo obligatorio"};
if(obj.summary.length<50){errors.summary="50 caracteres minimo"};

if(obj.steps[obj.steps.length-1].step.length<10){errors.steps="10 caracteres minimo"}

return errors;
}

