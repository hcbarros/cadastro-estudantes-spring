

export const cepMask = async (evt) => {
    let value = evt.target.value;
    value = value.replace(/\D/g,"")
                 .replace(/(\d{5})(\d)/,"$1-$2") 
    evt.target.value = value;             
}