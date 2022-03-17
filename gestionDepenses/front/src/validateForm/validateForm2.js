
const ValidateForm2 = (valuesTwo) => {
    let errors = {};

    let regexNumber = /^[0-9]*$/;
    let regexText = /^[a-zA-ZéêÊ.\s]*$/;

    if (!valuesTwo.depense ) {
        errors.depense = "Ce champ est obligatoire...";

    } else if (!regexNumber.test(valuesTwo.depense) ) {
        errors.depense = "Format invalide...";

    } else if (valuesTwo.depense.length <3) {
        errors.depense = "Au moins trois caractères...";
        
    } else {
        errors.depense = "";
    }

    if (!valuesTwo.motifDepense) {
        errors.motifDepense = "Ce champ est obligatoire...";

    } else if ( !regexText.test(valuesTwo.motifDepense) ) {
        errors.motifDepense = "Format invalide..."

    } else if (valuesTwo.motifDepense.length < 4 ) {
        errors.motifDepense = "text trop court...";

    } else {
        errors.motifDepense = "";
    }

    if (valuesTwo.dateDepense == null) {
        errors.dateDepense = "la date est exigée...";

    } else {
        errors.motifDepense = ""
    }

    return errors;
}

export default ValidateForm2;