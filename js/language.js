class Translator {
    constructor(){
        this._lang = this.getLanguage();
        this._elements = document.querySelectorAll("[data-i18n]");
    }


    getLanguage(){
        let lang = navigator.languages ? navigator.languages[0] : navigator.language.substr(0,2);
        return lang;
    }

    load(lang = null) {
        if(lang){
            this._lang = lang;
        }

    var path = `/js/${this._lang}.json`;

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
        console.log(this._elements);
        this._elements.forEach((element) => {
            let keys = element.dataset.i18n.split(".");
            console.log(element);
            console.log(element.dataset.i18n)
            console.log(keys);

            let text = translation[keys[0]][keys[1]];

            if(text) {
                while(element.firstChild){
                    element.removeChild(element.firstChild);
                    element.appendChild(document.createTextNode(text));
                }
            }

            // if(this._lang == "ja"){
            //     document.getElementById("pdf").setAttribute("href", "documents/Scarani_Jacob_CV_JP")
            // }
        });
    }

    toggleLangTag() {
        if (document.documentElement.lang !== this._lang) {
          document.documentElement.lang = this._lang;
        }
      }

}