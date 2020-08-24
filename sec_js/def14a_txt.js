var fs      = require('fs');
var request = require('request');
var PythonShell = require('python-shell');
// set some defaults
req = request.defaults({
	jar: true,                 // save cookies to jar
	rejectUnauthorized: false, 
	followAllRedirects: true   // allow redirections
});
var cheerio = require('cheerio');
var gb_urls	= []
	
function extract_urls(html, ftype){
        var ftypes   = {};
        ftype.split('#').forEach(function(ftype){
		ftype		= ftype.trim().split(/\s+/g).join(' ').toLowerCase();
        	ftypes[ftype]   = 1;
	});
        $ = cheerio.load(html);
	var cik	= '';
        $('#filerDiv > .companyInfo >.companyName > a').map(function(i, dom) {
                var dom         = cheerio(dom);
		var href	= dom.attr('href');
		var txt		= dom.text().trim().toLowerCase();
                if(txt == 'issuer' || dom.parent().text().toLowerCase().indexOf('(subject)') != -1 ){
			var href_sp	= href.split('?')[1].split('&');
			for(var i =0, l = href_sp.length; i < l;i++){
				var cik_sp	= href_sp[i].split('=');
				if (cik_sp[0].toLowerCase() == 'cik'){
					cik	= cik_sp[1].trim();
					break;
				}
			}
		}
	});
	var meta_data	= {}
        $('#formDiv .formContent .formGrouping').map(function(i, dom) {
                var dom         = cheerio(dom);
		var childs	= dom.children()
		if(childs.length%2 == 0){
			for(var j =0, l =childs.length;j<l;){
				var k	= cheerio(childs[j]).text()
				var v	= cheerio(childs[j+1]).text()
				k   	= k.trim().split(/\s+/g).join(' ').toLowerCase();
				v   	= v.trim().split(/\s+/g).join(' ').toLowerCase();
				meta_data[k]	= v
				j	+= 2
			}
				
		}
	});
		
        var urls        = [];
        var txt_file	= '';
        $('table.tableFile > tr, table.tableFile >tbody> tr').map(function(i, dom) {
                var dom         = cheerio(dom);
                var tds         = dom.children('td');
                if(tds.length ==0) return;
                var txt         = cheerio(tds[3]).text();
                var form_type   = txt.trim().split(/\s+/g).join(' ').toLowerCase();
                if (form_type in ftypes) {
                        var href        = cheerio(tds[2]).children('a');
                        var url         = 'https://www.sec.gov'+cheerio(href[0]).attr('href').replace('ix?doc=/', '');
                        var url_txt	= cheerio(tds[2]).text().trim();
                        var url_sp	= url_txt.split('.');
                        var len		= url_sp.length;
                        if ((url_txt != '') && ((url_sp[len - 1] == '') || (url_sp[len - 1].split(/\s+/g)[0]  in {'html':1, 'htm':1, 'HTM':1, 'HTML':1})))
                        	urls.push([url, cik, '', meta_data]);
                }
                var txt         = cheerio(tds[1]).text();
                txt   = txt.trim().split(/\s+/g).join(' ').toLowerCase();
                if(txt == 'complete submission text file'){
                        var href        = cheerio(tds[2]).children('a');
                        var url         = 'https://www.sec.gov'+cheerio(href[0]).attr('href');
                    	txt_file	= url;
		}
        });
	$('.companyInfo .identInfo').map(function(i, dom){
                var dom         = cheerio(dom);
		meta_data['docinfo']	= dom.text()
	});
	if(urls.length == 0) { // && txt_file){
                urls.push(['', '', '', meta_data])
		urls	= JSON.stringify(urls)
		console.log(urls);
		/*
		var data	= {'args':[ftype, txt_file]};
		PythonShell.run('sec_document_extract.py', data, function(err , results){
			if(err){
				urls	= JSON.stringify(urls)
				console.log(urls);
				return
			}
			var url	= results[0].replace('/var/www/html/', 'http://172.16.20.144/');
                        urls.push([url, cik, txt_file, meta_data])
			urls	= JSON.stringify(urls);
			console.log(urls);
		});*/
		
	}else {
		if(urls.length == 0){
                        urls.push(['', '', '', meta_data])
			}
		urls	= JSON.stringify(urls)
		console.log(urls);
	}
}
function parse_html(url, form_type){
        if(url.indexOf('http') == 0){
		/*request(url, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				extract_urls(html, form_type)
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

