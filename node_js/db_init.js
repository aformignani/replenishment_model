let db = require('./db');
let {
    Editor,
    // ...
} = require('datatables.net-editor-server');
 
 
router.all('/api/Dim_forecast', async function(req, res) {
    let editor = new Editor( db, 'Dim_forecast' )
        .fields(
            new Field( 'store_name' ),
            new Field( 'week_stock' ),
            new Field( 'week_cross' ),
            new Field( 'days_previous_stock' )
        );
 
    await editor.process(req.body);
    response.json( editor.data() );
} );
