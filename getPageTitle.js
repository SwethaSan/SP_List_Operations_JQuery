SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
    var clientContext = new SP.ClientContext.get_current();
    var web = clientContext.get_web();
    var list = web.get_lists().getByTitle("Pages");
    var pageItemId = _spPageContextInfo.pageItemId;
    var pageItem = list.getItemById(pageItemId);

    clientContext.load(pageItem, 'Title');
    clientContext.executeQueryAsync(
        function() {
            var pageTitle = pageItem.get_item('Title');
            console.log("Page Title: " + pageTitle);
            // You can now use pageTitle as needed
        },
        function(sender, args) {
            console.error('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        }
    );
});
