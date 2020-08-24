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
	var info	= []
	$('#seriesDiv table.tableFile2[summary="Results"]  tr').map(function(i, dom) {
                //console.log(dom)
		var dom		= cheerio(dom);
                //console.log('After')
                //console.log(dom)
                var tds		= dom.children('td'); 
                if(tds.length ==0) return;
                var cik	= cheerio(tds[0]).text().trim();
                var stete_country	= cheerio(tds[2]).text().trim();
                var href	= cheerio(tds[2]).children('a');
                var url		= 'https://www.sec.gov'+cheerio(href[0]).attr('href');
		var c_ar	= []
		cheerio(tds[1]).contents().map(function(i, dom1) {
                	var dom1        = cheerio(dom1);
			var tt		= dom1.text().trim()
			if(!tt) return
			c_ar.push(tt)
		});
		info.push({'cik':cik, 'cname':c_ar[0], 'sector':c_ar.slice(1), 'state/country':stete_country, 's_c_link':url})
	});
	info	= JSON.stringify(info)
	console.log(info);
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

