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

            let text = translation[keys[0]][keys[1]];

            if(text) {
                element.innerHTML = text;
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