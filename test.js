<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

    function sharePointReady() {
        getItemsFromView("PageDescriptions", 'Risk Liaison', updateDescription, logError);
    }

    function updateDescription(items) {
        var desc = '';
        for (var i = 0; i < items.get_count(); i++) {
            var item = items.get_item(i);
            desc = item.get_item('Description');  // Assuming last item's description is needed
        }
        $("#descDiv").html(desc);
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
