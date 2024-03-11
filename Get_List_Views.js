<style type="text/css">

.effect1{
  -webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777;
 padding:10px;
}

</style>
<br>
<div class="container-fluid effect1" style=" background-color: white; padding:20px">
    <div class="row">
         <div class="col-md-12">
            <table>
                <tr>
                    <td>
                        <h3>Description</h3>
                        <h4><span  id="descDiv"></span></h4><br/>
                   </td>
                </tr>
            </table>
         
        </div>
     </div>
</div>

<script language="javascript" type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>  
<script language="javascript" type="text/javascript">  
    $(document).ready(function() {  
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getListViews);  
    });  
    
    var oListViews;  
  
    function getListViews() {  
        //Get the client context,web and list object   
        var clientContext = new SP.ClientContext();  
        var oWeb = clientContext.get_web();  
        var oList = oWeb.get_lists().getByTitle('PageDescriptions');  
        //Get the list view and load it to client context and execute the batch   
        oListViews = oList.get_views();  
        clientContext.load(oListViews);  
        clientContext.executeQueryAsync(QuerySuccess, QueryFailure);  
    }  
  
    function QuerySuccess() {  
        //Get the enumerator collection of list view and loop through it   
        var enumerator = oListViews.getEnumerator();  
        alert("The available list views are: ");  
        while (enumerator.moveNext()) {  
            alert(enumerator.get_current().get_title() + '\n');  
        }  
    }  
  
    function QueryFailure() {  
        console.log('Request failed' + args.get_message());  
    }  
</script>  
