class NAV {

    static create(title) {
        let article = document.querySelectorAll(".article")[0];
        article.insertAdjacentHTML("afterbegin", "<div id=\"header\">\
        <nav class=\"navbar navbar-expand navbar-light bg-light\">\
            <div class=\"nav navbar-nav\">\
                <a class=\"nav-item nav-link active\" href=\"#\">Marco Steinke</a>\
                <a class=\"nav-item nav-link\" href=\"/\">Start</a>\
            </div>\
        </nav>\
         <h1 id=\"title\">" + title + "</h1>\
        </div>");
    }
}

