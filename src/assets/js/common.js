// Common functions
function getQueryParams() {
    var qs = document.location.search.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

$(document).ready(function(){
    var common = {
        init: function(){
        	
        	//var token  = $('input[name=_csrf]').val();
        	//var header = $('input[name=_csrf_header]').val();
        	
        	//$(document).ajaxSend(function(event, jqxhr, settings) {
        	//	jqxhr.setRequestHeader(header,token);
        	//});
            
            // Ícone de carregamento
            $(document).on({
                ajaxStart: function() { 
                    $('body').addClass("loading");    
                },
                ajaxStop: function() { 
                    $('body').removeClass("loading"); 
                }    
            });
            
            // Mask
            $('.mask-cnpj').mask('00.000.000/0000-00', {reverse: true});

            // Dropdown
            $('.dropdown-toggle').dropdown();

            // DatePicker 
            $('.datepicker-init').each(function() {
                $(this).datepicker({
                    format: 'dd/mm/yyyy',
                    language: "pt-BR",
                    todayHighlight: true,
                    container: $(this).attr('data-container-id') ? $(this).attr('data-container-id') : "body"
                });
            }).on('changeDate', function(e){
                $(this).datepicker('hide');
            });;
            
            // Select 2 
            $(".select2-init").select2({
                placeholder: 'Clique aqui para selecionar',
                closeOnSelect: false,
                "language": {
                    "noResults": function() {
                        return "Nenhum resultado encontrado. Tente com outros termos.";
                    }
                },
            });
            
            // Datatables Init Date
            $.fn.dataTable.moment( 'D/M/YYYY' );
            $.fn.dataTable.moment( 'D/M/YYYY HH:mm' );
            $.fn.dataTable.moment( 'D/M/YYYY HH:mm:ss' );
            
            // create default tables
            $( ".datatable-init" ).each(function( index ) {
                var filter_cols = $(this).data('filter');
                var currency_cols = $(this).data('currency');
                var currency_totals = $(this).data('currency-totals');
                var number_totals = $(this).data('number-totals');
                var options_table = $(this).data('options-table');
                var options_search = $(this).data('options-search');
                var hidden_columns = $(this).data('hidden-columns');
                
                if ( options_table == false ){
                    options_table = false;
                }else{
                    options_table = true;
                }
                
                if ( options_search == false ){
                    options_search = false;
                }else{
                    options_search = true;
                }

                var columnDefs = [];

                if(hidden_columns){
                    var hiddenColumnsStringArray = hidden_columns.split(',');
                    var hiddenColumnsArray = hidden_columns.split(',');
                    for (var i = 0; i < hiddenColumnsStringArray.length; i++) {
                        hiddenColumnsArray.push(parseInt(hiddenColumnsStringArray[i]));
                    }
                    columnDefs.push({
                        "targets": hiddenColumnsArray,
                        "visible": false,
                        "searchable": true
                    });
                }

                columnDefs.push({ type: 'formatted-num', targets: currency_cols });

                table = $(this).DataTable({
                    
                    columnDefs: columnDefs,
                    info: options_table,
                    paging: options_table,
                    searching: options_search,
                    colReorder: true,
                    responsive: true,
                    autoWidth: false,
                    fixedHeader: {
                        header: true,
                        footer: true,
                        headerOffset: 62
                    },
            
                    drawCallback: function () {
                        var api = this.api();
                        this.api().columns(currency_totals).every(function(index) {
                            var get_total = api.column(this, { page : 'all' }).data().sum();
                            var get_total_dot = Number((get_total/100).toFixed(2));
                            $(api.column( this ).footer()).html(
                                get_total_dot.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                            );
                        });
                        this.api().columns(number_totals).every(function(index) {
                            $(api.column( this ).footer()).html(
                                api.column(this, { page : 'all' }).data().sum()
                            );
                        });
                    },
                   
                    initComplete: function () {
                        this.api().columns(filter_cols).every(function(index) { //[0,1]
                            var column = this;
                            var column_title = this.column( index ).title();
                            var select = $('<select></select>').appendTo($(column.footer()).empty()).on('change', function() {
                                var val2 = $.fn.dataTable.util.escapeRegex($(this).val());
                                var val = val2.split("<");
                                column.search( val[0] ? '^' + val[0] + '$' : '', true, false).draw();
                            });
                            select.append('<option value="">' + column_title + '</option>');
                            column.data().unique().sort().each(function(d, j) {
                                d = d.split("<");
                                select.append('<option value="' + d[0] + '">' + d[0] + '</option>');
                            });
                        });
                    },
                    
                    "language": {
                        "lengthMenu": "Exibir _MENU_ por página",
                        "zeroRecords": "Nenhum registro encontrado. Tente utilizar outros termos de pesquisa.",
                        "info": "Exibindo <b>_START_</b> de <b>_END_</b> de <b>_TOTAL_</b> registros.<br>Página <b>_PAGE_</b> de <b>_PAGES_</b>.",
                        "infoEmpty": "Nenhuma entrada encontrada.",
                        "infoFiltered": "(filtrado de _MAX_ registros)",
                        "search": "Pesquisar:",
                        "paginate": {
                            "next": "Próximo",
                            "previous": "Anterior",
                            "first": "Primeiro",
                            "last": "Último"
                            },
                    },
        
                });
                    
                $(".click-row").click(function(event){
                    event.preventDefault();
                    var url = $('a', this).attr('href');
                    if($(event.target).hasClass('no_click')){
                        //there is beauty in the silence
                    }else{
                        window.location = url;
                    }
                });
                
                $( '#filter-all' ).on( 'keyup change', function () {
                    table.search($(this).val()).draw();
                });

                
                function filterTable(filterElement){
                    var caseSensitive = $(filterElement).data("filter-case-sensitive");
                    var filterExactly = $(filterElement).data("filter-exactly");
                    var usesRegex = false;
                    var filterValue = $(filterElement).val();
                    if(filterExactly && filterValue){
                    	filterValue = "^" + filterValue + "$";
                    	usesRegex = true;
                    }
                    table.columns($(filterElement).data("filter-column")).search(filterValue, usesRegex, false, !caseSensitive).draw();
                }
                
                $('.table-filter').on('keyup change', function () {
                	filterTable(this);
                });
                
                $('#filter-all').each(function() {
                    table.search($(this).val()).draw();
                });
                
                $('.table-filter').each(function() {
                	filterTable(this);
                });

                $(".btn-clean-filter").click(function(e){
                    e.preventDefault();
                    $(".filter input:not(input[type='radio']), .filter select").val("");
                    table.search('').columns().search('').draw();
                    $(".filter input[data-filter-default-value], .filter select[data-filter-default-value]").each(function(){
                    	$(this).val($(this).attr("data-filter-default-value")).change();
                    });

                });
                
                $('#collapse-dash tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = table.row( tr );
             
                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        row.child( format(row.data()) ).show();
                        tr.addClass('shown');
                    }
                } );
                
                function format ( d ) {
                    // `d` is the original data object for the row
                    return '<table class="table table-striped table-hover">'+
                        '<thead>'+
                            '<tr>'+
                                '<th style="width: 15%;"><i class="fa fa-star" aria-hidden="true"></i> Habilitado</th>'+
                                '<th style="width: 30%;"><i class="fa fa-building" aria-hidden="true"></i> Adquirente</th>'+
                                '<th style="width: 30%;"><i class="fa fa-table" aria-hidden="true"></i> Tabela Configurada</th>'+
                                '<th style="width: 25%;"><i class="fa fa-file-text-o" aria-hidden="true"></i> Realizar Carga</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                        '<tr>'+
                            '<td><div class="label label-danger">Não</div></td>'+ 
                            '<td><a href="adq-carga.php">Bin</a></td>'+
                            '<td><div class="label label-danger">Não</div></td>'+
                            '<td><a href="update-table.php">Iniciar carga</a></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><div class="label label-danger">Não</div></td>'+
                            '<td><a href="adq-carga.php">Evalon</a></td>'+
                            '<td><div class="label label-danger">Não</div></td>'+
                            '<td><a href="update-table.php">Iniciar carga</a></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><div class="label label-danger">Não</div></td>'+
                            '<td><a href="adq-carga.php">Cielo</a></td>'+
                            '<td><div class="label label-success">Sim</div></td>'+
                            '<td><a href="update-table.php">Iniciar carga</a></td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td><div class="label label-danger">Não</div></td>'+ 
                            '<td><a href="adq-carga.php">Rede</a></td>'+
                            '<td><div class="label label-success">Sim</div></td>'+
                            '<td><a href="update-table.php">Iniciar carga</a></td>'+
                        '</tr>'+
                        '</tbody>'+
                    '</table>';
                }
                
                $('#collapse-adq tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = table.row( tr );
             
                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        row.child( format_adq( row.data() ) ).show();
                        tr.addClass('shown');
                    }
                } );
                
                function format_adq ( d ) {
                    // `d` is the original data object for the row
                    return '<table class="table table-striped table-hover nowrap">'+
                        '<thead>'+
                            '<tr>'+
                                '<th style="width: 33%;"><i class="fa fa-check-square" aria-hidden="true"></i> Configurada</th>'+
                                '<th style="width: 34%;"><i class="fa fa-table" aria-hidden="true"></i> Tabela</th>'+
                                '<th style="width: 33%;"><i class="fa fa-calendar" aria-hidden="true"></i> Última atualização</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td><div class="label label-success">Atualizada</div></td>'+
                                '<td>Coluna #1</td>'+
                                '<td>10/10/2017</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td><div class="label label-warning">Desatualizada</div></td>'+
                                '<td>Coluna #2</td>'+
                                '<td>10/10/1999</td>'+
                            '</tr>'+
                            '<tr>'+
                                '<td><div class="label label-danger">Não</div></td>'+
                                '<td>Coluna #3</td>'+
                                '<td>-</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>';
                }
            });
            
            // Modal
            $(".open_modal").click(function(event){
                
                event.preventDefault();
                var content_id = $(this).data('id');
                
                // TRAZER RESULTADO VIA AJAX AQUI. MONTAR HTML DE RESPOSTA. EXMPLO DE HTML NA PAGINA conciliacao.php DENTRO DA CLASS .modal-body
                // return resultado
                // $('#modal-infos').html('');
                // $('#modal-infos .modal-body').html(resultado);
                // NÃƒO ESQUECER DE INICIAR A INSTÃ‚NCIA DO DATATABLES NOVAMENTE.
                
                $('#modal-infos').modal('show');
                
            });
        }
    };

    common.init();
});

jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
    return this.flatten().reduce( function ( a, b ) {
        if ( typeof a === 'string' ) {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if ( typeof b === 'string' ) {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }
 
        return a + b;
    }, 0 );
} );