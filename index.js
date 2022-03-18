const express = require('express')
const app = express()
const port = 3000

const Asciidoctor = require('asciidoctor')

app.use(express.static('styles'));

const asciidoctor = Asciidoctor()

const b4import = '<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">';
const nav = '<nav class=\"navbar navbar-expand navbar-light bg-light\">\
<div class=\"nav navbar-nav\">\
    <a class=\"nav-item nav-link active\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\
    <a class=\"nav-item nav-link\" href=\"#\">Home</a>\
</div>\
</nav>';

var html = asciidoctor.convertFile('README.adoc', { to_file: false, standalone: true });

function renderADOC(filename, res) {

    if(filename != "README.adoc") {
        const post = asciidoctor.convertFile(["blog/", filename, ".adoc"].join(''), { to_file: false, standalone: true });
    res.send(nav + post + b4import);
    }

    console.log(filename);

    const post = asciidoctor.convertFile(filename, { to_file: false, standalone: true });
    res.send(nav + b4import + post);
}

app.get('/', (req, res) => renderADOC('README.adoc', res));

app.get('/blog/:post', (req, res) => renderADOC(req.params.post, res));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))