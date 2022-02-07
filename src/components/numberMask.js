

export const numberMask = (evt, serie) => {

    let value = evt.target.value;
    value = value.replace(serie ? /([^1-9])/g : /\D/g,"");
    evt.target.value = value;             
}