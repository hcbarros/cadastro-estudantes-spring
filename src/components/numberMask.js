

export const numberMask = (evt) => {

    let value = evt.target.value;
    value = value.replace(/\D/g,"");
    evt.target.value = value;             
}