const HEAD = document.querySelector("#header");
    const MESSAGE_NO_JAVASCRIPT = "Activate Javascript in your browser, to access this page with its full functionality!";

    // set scroll-behavior to smooth
    document.querySelector("html").style.scrollBehavior = "smooth";

    class TOC {
        static create() {
            HEAD.insertAdjacentHTML("beforeend", "<hr><h2>Table of Contents</h2><br>");
            HEAD.insertAdjacentHTML("beforeend", "<ul>");
        
            document.querySelectorAll("h2").forEach(header => {
                header.setAttribute("id", header.innerHTML);
                HEAD.insertAdjacentHTML("beforeend", "<li><a style=\"margin: 12px\" href=\"#" + header.innerHTML + "\">" + header.innerHTML + "</a></li><br>");
            });
        
            HEAD.insertAdjacentHTML("beforeend", "</ul><hr>");
            HEAD.insertAdjacentHTML("beforeend", "<noscript>" + MESSAGE_NO_JAVASCRIPT + "</noscript>");
        }

    }

    TOC.create();