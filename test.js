<style type="text/css">
    .effect1 {
        -webkit-box-shadow: 0 10px 6px -6px #777;
        -moz-box-shadow: 0 10px 6px -6px #777;
        box-shadow: 0 10px 6px -6px #777;
        padding: 10px;
    }
</style>
<body onload="loadDomElement()">
  <div id="byline"></div>
</body>
<div class="container-fluid effect1" style=" background-color: white; padding:20px">
    <div class="row">
        <div class="col-md-12">
            <table>
                <tr>
                    <td>
                        <h3>Description Swetha</h3>
                        <h4><span id="descDiv"></span></h4><br/>
 
                    </td>
                </tr>
            </table>

        </div>
    </div>
</div>

<script language="javascript" defer type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>

<script type="text/javascript">
var byline;
function loadDomElement() {
  alert($('#byline').html());console.log('Load the DOM element here' + $('#byline').html())
}

$(document).ready(function() {
    //Make sure the necessary SharePoint script file 'sp.js' is loaded before your code runs
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);
    function sharePointReady() {
        getItemsFromView("PageDescriptions", 'Risk Liaison',
            function(items) {
                for (var i = 0; i < items.get_count(); i++) {
                    var item = items.get_item(i);
                    var desc = item.get_item('Description');
                }
                document.getElementById("descDiv").innerHTML = desc;
            },
            function(sender, args) {
                console.log(args.get_message());
            }
        ); //end of getItemsFromView
    }
}); //End Document.ready

function getItemsFromView(listTitle, viewTitle, success, error) {
    var ctx = new SP.ClientContext('https://cssruncommon.sharepoint.com/sites/croteam');
    var list = ctx.get_web().get_lists().getByTitle(listTitle);
    var view = list.get_views().getByTitle(viewTitle);
    ctx.load(view, 'ViewQuery');
    ctx.executeQueryAsync(
        function() {
        	
            var viewQry = "<View><Query>" + view.get_viewQuery() + "</Query></View>";
            getItems(listTitle, viewQry, success, error);
        },
        error);
}


function getItems(listTitle, queryText, success, error) {
    var ctx = new SP.ClientContext('https://cssruncommon.sharepoint.com/sites/croteam');
    var list = ctx.get_web().get_lists().getByTitle(listTitle);
    var query = new SP.CamlQuery();
    query.set_viewXml(queryText);
    var items = list.getItems(query);
    ctx.load(items);
    ctx.executeQueryAsync(function() {
           
  			success(items);
    }, error);
}
</script>
