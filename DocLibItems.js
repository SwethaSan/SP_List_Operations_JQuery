<style type="text/css">
    .effect1 {
        -webkit-box-shadow: 0 10px 6px -6px #777;
        -moz-box-shadow: 0 10px 6px -6px #777;
        box-shadow: 0 10px 6px -6px #777;
        padding: 10px;
    }
</style>

<div class="container-fluid effect1" style=" background-color: white; padding:20px">
    <div class="row">
        <div class="col-md-12">
           <table class="table table-striped table-success ">
			  <thead>
			    <tr>
			      <th scope="col">Name</th>
			      <th scope="col">Description</th>
			    </tr>
			  </thead>
			  <tbody id='tblbodyDoc'>
			    SWETHA
			   </tbody>
			</table>
        </div>
    </div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script type="text/javascript">
var tblbodydoc=''; 
var name; var docdesc;
$(window).on('load', function() {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReadyDoc);
    function sharePointReadyDoc() {
    	var clientContextDoc = new SP.ClientContext.get_current();
    	var pageFieldDoc = clientContextDoc.get_web().get_lists().getByTitle('Pages').getItemById(_spPageContextInfo.pageItemId);
    	clientContextDoc.load(pageFieldDoc);
    	
    	clientContextDoc.executeQueryAsync(
    		function(){
    			var viewTitle = pageFieldDoc.get_item('ArticleByLine');
 			   	alert(viewTitle);if(viewTitle === '') {
 			   		console.error('unable to retrieve page property');
 			   		return
 			   	} else{
        			getItemsFromViewDoc("SupportingDocuments", viewTitle, updateDocs, logError);
    			}
    		},
    		function(sender,args){
    			console.error('Error: ' + args.get_message());
    		}
    	);	
	}
	
    function updateDocs(items) {
    	//alert(items.get_count());
        for (var i = 0; i < items.get_count(); i++) {
            var item = items.get_item(i);
            name = item.get_item('Title'); 
            docdesc = item.get_item('Comments');
        	tblbodydoc += '<tr>' +
			       '<th scope="row">'+name+'</th>' +
			       '<td>'+docdesc+'</td>' +
			       '</tr>';
		 }
        
        //tblbodydoc = "<tr><td>row 1, cell 1</td><td> row 1, cell 2</td></tr>";        	
		alert(tblbodydoc);		
        $("#tblbodyDoc").append(tblbodydoc);
    }

    function logError(sender, args) {
        console.error(args.get_message());
    }

    function getItemsFromViewDoc(listTitle, viewTitle, success, error) {
        var ctx = new SP.ClientContext.get_current();
        var list = ctx.get_web().get_lists().getByTitle(listTitle);
        var view = list.get_views().getByTitle(viewTitle);
        ctx.load(view, 'ViewQuery');

        ctx.executeQueryAsync(
            function() {
                var viewQry = "<View><Query>" + view.get_viewQuery() + "</Query></View>";
                getItemsDoc(listTitle, viewQry, success, error);
            },
            error
        );
    }

    function getItemsDoc(listTitle, queryText, success, error) {
        var ctx = new SP.ClientContext.get_current();
        var list = ctx.get_web().get_lists().getByTitle(listTitle);
        var query = new SP.CamlQuery();
        query.set_viewXml(queryText);
        var items = list.getItems(query);
        ctx.load(items);

        ctx.executeQueryAsync(function() {
            success(items);
        }, error);
    }
});
</script>
