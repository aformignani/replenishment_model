
/*
 * Editor client script for DB table reorder_model_view
 * Created by http://editor.datatables.net/generator
 */

(function($){

	var button_click = false;

	/* Custom filtering function which will search data in column four between two values */
	$.fn.dataTable.ext.search.push(
		function (settings, data, dataIndex) {
			if (button_click) {
				var age = parseFloat(data[10]) || 0; // use data for the age column
				if (age > 0) {
					return true;
				}
				return false;
			} else {
				//return true if the above is not executed
				return true;
			}
		}
	);

	var currentdate = new Date();
	var datetime = currentdate.getDate() + "_"
		+ (currentdate.getMonth() + 1) + "_"
		+ currentdate.getFullYear() + "_"
		+ currentdate.getHours() + "_"
		+ currentdate.getMinutes();



$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: '/api/reorder_model_view',
		table: '#reorder_model_view',
		fields: [
			{
				"label": "store_name:",
				"name": "store_name"
			},
			{
				"label": "qsl_category:",
				"name": "qsl_category"
			},
			{
				"label": "code_erp_ingr:",
				"name": "code_erp_ingr"
			},
			{
				"label": "code_erp_ingr_desc:",
				"name": "code_erp_ingr_desc"
			},
			{
				"label": "article_type:",
				"name": "article_type"
			},
			{
				"label": "code:",
				"name": "code"
			},
			{
				"label": "code_erp_ingr_unit:",
				"name": "code_erp_ingr_unit"
			},
			{
				"label": "giacenza_attuale:",
				"name": "giacenza_attuale"
			},
			{
				"label": "giacenza_prevista:",
				"name": "giacenza_prevista"
			},
			{
				"label": "qta_consumata_settimana_scorsa:",
				"name": "qta_consumata_settimana_scorsa"
			},
			{
				"label": "ct_needed:",
				"name": "ct_needed",
				'className': 'editable' 
			}
		]
	} );

	// Activate an inline edit on click of a table cell
	$('#reorder_model_view').on('click', 'tbody td.editable', function (e) {
		editor.inline(this);
	});


	var table = $('#reorder_model_view').DataTable({
		ajax: '/api/reorder_model_view',
		columns: [
			{ data :'store_name'},
			{ data: 'qsl_category'},
			{ data: 'code_erp_ingr'},
			{ data: 'code_erp_ingr_desc'},
			{ data: 'article_type'},
			{ data: 'code'},
			{ data: 'code_erp_ingr_unit' },
			{ data: 'giacenza_attuale' },
			{ data: 'giacenza_prevista' },
			{ data: 'qta_consumata_settimana_scorsa'},
			{ data: 'ct_needed', className: 'editable'}
		],


		//grouping
		order: [[1, 'asc']],
		rowGroup: {
			dataSrc: 'qsl_category'
		},

		//child-rows
		resposive: true,
		responsive: {
			details: {
				type: 'column'
			}
		},

		//click and drag the header to move it
		colReorder: true,

		//responsive
		columnDefs: [{
			className: 'dtr-control',
			orderable: false,
		},
			{ responsivePriority: 1, targets: 1 },
			{ responsivePriority: 1, targets: 2 },
			{ responsivePriority: 1, targets: 3 },
			{ responsivePriority: 1, targets: 10 }
		],

		// change name to filter panes
		language: {
			searchPanes: {
				clearMessage: 'Obliterate Selections',
				collapse: { 0: 'Scegli il tuo store e filtra', _: 'Scegli il tuo store e filtra (%d)' }
			}
		},

		//page length
		lengthChange: true,
		lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],


		// buttons
		dom: 'Bfrtip',
		buttons: [

			//search panes
			{
				extend: 'searchPanes',
				config: {
					cascadePanes: true,
					columns: [0, 4, 1]
						}
			},
			
			//riepilogo
			{
				text: "Riepilogo",
				action: function (e, table, node, config) {
					button_click = true;
					table.draw();
				}
			},

			//elimina filtro riepilogo
			{
				text: "Togli riepilogo",
				action: function (e, table, node, config) {
					button_click = false;
					table.draw();
				}
			},

			// export csv
			{
				extend: 'csvHtml5',
				text: "Esporta csv",
				filename: datetime + '_ordine_acquisto',
				header: false,
				fieldBoundary: '',
				fieldSeparator: ';',
				exportOptions: {
					columns: [2, 10]
					}
			},
			//page length
			{
				extend: 'pageLength'
			}
		],


		responsive: true,

        /*initComplete: function () {
			$('#reorder_model_view').DataTable().searchPanes.rebuildPane(0, true);
        },*/

		select: true,
		lengthChange: false,

	}); 



} );

}(jQuery));

