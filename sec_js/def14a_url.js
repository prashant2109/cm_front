var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var gb_urls	= []
// set some defaults
req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false, 
	followAllRedirects: true   // allow redirections
});
function extract_urls(html, form_type){
	$ = cheerio.load(html);
	var urls	= [];
	$('table.tableFile2 > tr, table.tableFile2 > tbody > tr').map(function(i, dom) {
                //console.log(dom)
		var dom		= cheerio(dom);
                //console.log('After')
                //console.log(dom)
                var tds		= dom.children('td'); 
                if(tds.length ==0) return;
                var ttype	= cheerio(tds[0]).text().trim();
                //console.log(ttype, dom.text())
                if (ttype != form_type) return;
                var href	= cheerio(tds[1]).children('a');
                if (href.length ==  0) return;
                var url		= 'https://www.sec.gov'+cheerio(href[0]).attr('href');
                var title	= cheerio(tds[2]).text().trim();
                var filing_year = cheerio(tds[3]).text().trim();
		urls.push([url, title, filing_year]);
	});
	urls	= JSON.stringify(urls)
	console.log(urls);
}
function parse_html(url, form_type){
        if(url.indexOf('http') == 0){
		/*request(url, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				extract_urls(html)
			}
		});*/
		req.get({
		    url	: url,
		    //form: { 'foo': 'bar' },
		    headers: {
			'User-Agent': 'Super Cool Browser' // optional headers
		     }
		  }, function(err, resp, body) {
			extract_urls(body, form_type)
			
		});
	}else {
		extract_urls(fs.readFileSync(url), form_type)
	}
}
var index   = 0;
//console.log(process.argv);
parse_html(process.argv[2], process.argv[3])

