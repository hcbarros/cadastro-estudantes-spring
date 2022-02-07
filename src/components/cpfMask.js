

export const cpfMask = (evt) => {

    let value = evt.target.value;
    value = value.replace(/\D/g,"")
                 .replace(/(\d{3})(\d)/,"$1.$2")
                 .replace(/(\d{3})(\d)/,"$1.$2")
                 .replace(/(\d{3})(\d{1,2})$/,"$1-$2")    

    evt.target.value = value;             
}