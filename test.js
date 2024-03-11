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
           <table class="table table-sm table-dark">
			  <thead>
			    <tr>
			      <th scope="col">Business Domains</th>
			      <th scope="col">Primary Contact</th>
			      <th scope="col">Secondary Contact</th>
			      <th scope="col">Functional Area</th>
			    </tr>
			  </thead>
			  <tbody id='tblbody'>
			    
			   </tbody>
			</table>
        </div>
    </div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script type="text/javascript">
var tblbody; 
var bd;
var pc;
var sc;
var fa;
$(window).on('load', function() {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
    
    function sharePointReady() {
    	var clientContext = new SP.ClientContext.get_current();
    	var pageField = clientContext.get_web().get_lists().getByTitle('Pages').getItemById(_spPageContextInfo.pageItemId);
    	clientContext.load(pageField);
    	
    	clientContext.executeQueryAsync(
    		function(){
    			var viewTitle = pageField.get_item('ArticleByLine');
 			   	if(viewTitle === '') {
 			   		console.error('unable to retrieve page property');
 			   		return
 			   	} else{
        			getItemsFromView("KeyContacts", viewTitle, updateKeyContacts, logError);
    			}
    		},
    		function(sender,args){
    			console.error('Error: ' + args.get_message());
    		}
    	);	
	}
	
    function updateKeyContacts(items) {
        for (var i = 0; i < items.get_count(); i++) {
            var item = items.get_item(i);
            bd = item.get_item('Title'); 
            pc = item.get_item('PrimaryContact');
            sc = item.get_item('SecondaryContact');
            fa = item.get_item('Notes');        
         }
        tblbody += '<tr>' +
			       '<th scope="row" id="'+bd+'"></th>' +
			       '<td id="'+fa+'"></td>' +
			       '<td id="'+pc+'"></td>' +
			       '<td id="'+sc+'"></td>' +
			       '</tr>';        			
        $("#tblbody").appendChild(tblbody);
    }

    function logError(sender, args) {
        console.error(args.get_message());
    }

    function getItemsFromView(listTitle, viewTitle, success, error) {
        var ctx = new SP.ClientContext.get_current();
        var list = ctx.get_web().get_lists().getByTitle(listTitle);
        var view = list.get_views().getByTitle(viewTitle);
        ctx.load(view, 'ViewQuery');

        ctx.executeQueryAsync(
            function() {
                var viewQry = "<View><Query>" + view.get_viewQuery() + "</Query></View>";
                getItems(listTitle, viewQry, success, error);
            },
            error
        );
    }

    function getItems(listTitle, queryText, success, error) {
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
