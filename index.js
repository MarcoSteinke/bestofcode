const express = require('express')
const app = express()
const port = 3000

const Asciidoctor = require('asciidoctor')

app.use(express.static('styles'))

const asciidoctor = Asciidoctor()
const HOST = "localhost"
const PORT = 3000
const FULL_HOST = [HOST, PORT].join(':')

const imports = `
    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">
    <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css">
        
    <link rel=\"stylesheet\" href=\"asciidoctor.css\">
    `
const nav = '<nav class=\"navbar navbar-expand navbar-light bg-light\">\
<div class=\"nav navbar-nav\">\
    <a class=\"nav-item nav-link active\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\
    <a class=\"nav-item nav-link\" href=\"#\">Home</a>\
</div>\
</nav>'

var html = asciidoctor.convertFile('README.adoc', { to_file: false, standalone: true })

function renderADOC(filename, res) {

    if(filename.includes('asciidoctor.css')) {
        res.redirect([FULL_HOST, "asciidoctor.css"].join('/'))
    }

    if(filename != "README.adoc") {
        const post = asciidoctor.convertFile(["blog/", filename, ".adoc"].join(''), { to_file: false, standalone: true })
    res.send(imports + nav + post + `<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>`)
    }

    console.log(filename)

    const post = asciidoctor.convertFile(filename, { to_file: false, standalone: true })
    res.send(nav + imports + post)
}

app.get('/', (req, res) => renderADOC('README.adoc', res))

app.get('/blog/:post', (req, res) => renderADOC(req.params.post, res))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))