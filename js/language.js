class Translator {
    constructor(){
        this._lang = this.getLanguage();
        this._elements = document.querySelectorAll("[data-i18n]");
    }


    getLanguage(){
        let lang = navigator.languages ? navigator.languages[0] : navigator.language.substr(0,2);
        if(lang == "en-US"){
            lang = "en";
        }
        return lang;
    }

    load(lang = null) {
        if(lang){
            this._lang = lang;
        }

    var path = `scaranman.github.io/js/${this._lang}.json`;

    fetch(path)
        .then((response) => response.json())
        .then((translation) => {
            this.translate(translation);
            this.toggleLangTag();
        })
        .catch(() => {
        console.error(`Could not load ${this._lang}.json.`);
        });
    
    }


    translate(translation) {
        this._elements.forEach((element) => {
            let keys = element.dataset.i18n.split(".");

            let text;
        
            console.log(keys.length);
            console.log(keys);

            if(keys.length = 2){
                text = translation[keys[0]][keys[1]];
                console.log(translation[keys[0]][keys[1]]);

            } 
            else {
                text = translation[keys[0]][keys[1]][keys[2]];
                console.log(translation[keys[0]][keys[1]][keys[2]]);
            }
            
            let resumeIMG;
            let resumePDF;

            switch(this._lang){
            case "ja": 
                resumeIMG = "img/resumeJP.png";
                resumePDF = "documents/Scarani_Jacob_Resume_HCC_JP.pdf";
                break;
            default:
                resumeIMG = "img/resume.png";
                resumePDF = "documents/Scarani_Jacob_Resume_HCC.pdf";
            }

            if(text) {
                element.innerHTML = text;
                if(element.tagName == "LABEL"){
                    element.nextElementSibling.removeAttribute("placeholder");
                    element.nextElementSibling.setAttribute("placeholder", text);
                }
            }

            if(element.id == "resume-img"){
                element.removeAttribute("src");
                element.setAttribute("src", resumeIMG);
            }
            if(element.id == "pdf"){
                element.removeAttribute("src");
                element.setAttribute("src", resumePDF);
            }
    });
    }

    toggleLangTag() {
        if (document.documentElement.lang !== this._lang) {
          document.documentElement.lang = this._lang;
        }
      }

    getKeys() {

    }

}