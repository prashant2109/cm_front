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
	var company_meta	= {'address':{}}
	$('.companyInfo .companyName').map(function(i, dom) {
		var dom		= cheerio(dom);
		var contents	=  dom.contents();
		var company	= cheerio(contents[0]).text().trim()
		var cik		= cheerio(contents[3]).text().trim().split(/\s+/g)[0]
		company_meta['cik']	= cik
		company_meta['name']	= company
	});
	var identInfo	= []
	$('.companyInfo .identInfo').map(function(i, dom) {
		var dom		= cheerio(dom);
		dom.contents().map(function(i, dom1) {
			if(dom1.name == 'br')
				identInfo.push('$$')
			var dom1        = cheerio(dom1);
			var tt		= dom1.text().trim()
			if(!tt) return
			identInfo.push(tt)
		});
	});
	company_meta['identInfo']	= identInfo.join(' ').split(/\s+/g).join(' ').split('$$').map(function(f){return f.trim();})
	$('.mailer').map(function(i, dom) {
		var dom		= cheerio(dom);
		var contents	=  dom.contents();
		var c_ar	= []
		contents.map(function(i, dom1) {
                	var dom1        = cheerio(dom1);
			var tt		= dom1.text().trim()
			if(!tt) return
			c_ar.push(tt)
		});
		company_meta['address'][c_ar[0]]	= c_ar.slice(1)
	});
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
		var c_ar	= []
		cheerio(tds[4]).contents().map(function(i, dom1) {
                	var dom1        = cheerio(dom1);
			var tt		= dom1.text().trim()
			if(!tt) return
			c_ar.push(tt)
		});
                var filing_num = c_ar[1]
		urls.push([url, title, filing_year, filing_num]);
	});
	urls	= JSON.stringify([company_meta, urls])
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

