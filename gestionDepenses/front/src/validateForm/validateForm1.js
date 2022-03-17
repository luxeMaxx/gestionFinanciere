

const ValidateForm1 = (values) => {
    let erreurs = {};
    let regexNumber = /^[0-9]*$/;
    let regexText = /^[a-zA-ZéêÊ.\s]*$/;
    
    if (!values.entree) {
        erreurs.entree = "Ce champ est obligatoire...";
    } else if (!regexNumber.test(values.entree) ) {
        erreurs.entree = "Format invalide...";
    } else if (values.entree.length < 3) {
        erreurs.entree = "Au moins trois caractères..."
    } else {
        erreurs.entree = "";
    }

    if (!values.motif) {
        erreurs.motif = "Ce champ est obligatoire...";
    } else if ( !regexText.test(values.motif) ) {
        erreurs.motif = "Format invalide..."
    } else if (values.motif.length < 4 ) {
        erreurs.motif = "text trop court..."
    } else {
        erreurs.motif = "";
    }

    if (values.date == null) {
        erreurs.dateEntre = "la date est exigée...";
    } else {
        erreurs.motif = ""
    }

    return erreurs;
}

export default ValidateForm1;