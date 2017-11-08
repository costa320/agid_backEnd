$(document).ready(function(){

    $.validator.setDefaults({
        debug: true,
        ignore: ":hidden"
    });

    $('#btnAggiungiContatti').click(function(){
        if($("#formContatti").valid() == true){
            $('#modalContatti').modal('hide');
            blankFieldContatti();
        }
    })

    $("#infoAForm").validate({
        rules:{
            nomedelservizio: "required",
            descrizioneServizio:"required",
            urlservizio:"required",
            descrizioneServizio:"required",
            altroIdentificativo:"required",
            urlservizio:"required",
            nomeInputRichiesti:"required",
            tipoInputRichiesti:"required",
            nomeOutputProdotti:"required",
            tipoOutputProdotti:"required",
            dataATemp:"required"
        },
        messages:{
            nomedelservizio: "Campo obbligatorio",
            descrizioneServizio:"Campo obbligatorio",
            urlservizio:"Campo obbligatorio",
            descrizioneServizio:"Campo obbligatorio",
            altroIdentificativo:"Campo obbligatorio",
            urlservizio:"Campo obbligatorio",
            nomeInputRichiesti:"Campo obbligatorio",
            tipoInputRichiesti:"Campo obbligatorio",
            nomeOutputProdotti:"Campo obbligatorio",
            tipoOutputProdotti:"Campo obbligatorio",
            dataATemp:"required"
        },
        errorClass: "errorText",
        highlight: function (element) {
            $(element).addClass('errorInput')
        },
        unhighlight: function (element) {
            $(element).removeClass('errorInput')
        }
    });

    $("#temaAForm").validate({

        rules: {

            'temaCheck[]': "required",
            settoreservizio: "required"
        },
        messages:{
            settoreservizio:"Campo obbligatorio"

        },
        errorPlacement: function(error, element) {

            return false;

        },
        errorClass: "errorText",
        highlight: function (element) {
            if(element.id != "settoreservizio"){
                $('.errorCheck').addClass('show');
                $('#divError').addClass('errorInput');
            }
            else{
                $('.errorSettore').addClass('show')
                $(element).addClass('errorInput')
            }
        },
        unhighlight: function (element) {
            if(element.id != "settoreservizio"){
                $('.errorCheck').removeClass('show');
                $('#divError').removeClass('errorInput');
            }
            else{
                $('.errorSettore').removeClass('show')
                $(element).removeClass('errorInput')
            }
        }

    });

    $("#temaAForm").validate({

        rules: {

            paroleChiaveClass: "required",
        },
        messages:{
            paroleChiaveClass:"Campo obbligatorio"

        },
        errorPlacement: function(error, element) {

            return false;

        },
        errorClass: "errorText",
        highlight: function (element) {
            $(element).addClass('errorInput')
        },
        unhighlight: function (element) {
            $(element).removeClass('errorInput')
        }

    });

    $("#accessoAForm").validate({

        rules:{
            modalitaautenticazione: "required",
            radioOption:"required",
            tipoCanaleErog:"required",
            costoEuro:"required"
        },
        messages:{
            modalitaautenticazione: "Campo obbligatorio",
            radioOption:"Campo obbligatorio",
            tipoCanaleErog:"Campo obbligatorio",
            costoEuro:"Campo obbligatorio"
        },
        errorClass: "errorText",
        errorPlacement: function(element , error){
            if(element[0].id=="radioOption-error"){
                $("#containerRadioLivInteraizone").after(element)
            }
            else 
                error.after(element)
        },
        highlight: function (element) {
            if(element.id =='radioOption'){
                $("#containerRadioLivInteraizone").addClass('errorInput')

            }
            else
                $(element).addClass('errorInput')
        },
        unhighlight: function (element) {
            $(element).removeClass('errorInput')
        }
    });

    $("#formOrganizz").validate({
        rules:{
            nomeOrganizz: "required",
            ruoloOrganizzModal:"required"
        },
        messages:{
            nomeOrganizz: "Campo obbligatorio",
            ruoloOrganizzModal:"Campo obbligatorio"
        },
        errorClass: "errorText",
        highlight: function (element) {
            $(element).addClass('errorInput')
        },
        unhighlight: function (element) {
            $(element).removeClass('errorInput')
        }
    }); 

    loadComponentTabInfo();

    $('#livInterazione').on('change', function() {
        $(this).valid();
    });

    $('#inputRichiesti').click(function(){
        if($(this).is(':checked')){
            $('.divOpenInput').show("slow");
        }
        else{
            $('#nomeInputRichiesti').removeClass("errorInput");
            $('#tipoInputRichiesti').removeClass("errorInput");
            $('.divOpenInput').hide("slow");
        }
    })

    $('#outputProdotti').click(function(){
        if($(this).is(':checked'))
            $('.divOpenOutput').show("slow")
        else{
            $('.divOpenOutput').hide("slow");
            $('#nomeOutputProdotti').removeClass("errorInput");
            $('#tipoOutputProdotti').removeClass("errorInput");
        }
    })

    $('#coperturaTemporale').click(function(){
        if($(this).is(':checked')){
            $('.divOpenTemp').show("slow");
            $("#dataDaTempOra").datepicker();
        }
        else{
            $('.divOpenTemp').hide("slow");
            $('#dataATemp').removeClass("dataATemp");
        }
    })

    $('#canaliErogazione').click(function(){
        if($(this).is(':checked'))
            $('.divOpenCanErog').show("slow")
        else
            $('.divOpenCanErog').hide("slow")
    })

    $("#formContatti").validate({
        rules:{
            nomeUfficioContatti: "required",
            emailContatti:{
                required: true,
                email:true
            },
        },
        messages:{
            nomeUfficioContatti: "Campo obbligatorio",
            emailContatti:{
                required:"Campo obbligatorio",
                email:"Inserire email valida"
            },
        },
        errorClass: "errorText",
        highlight: function (element) {
            $(element).addClass('errorInput')
        },
        unhighlight: function (element) {
            $(element).removeClass('errorInput')
        }
    });

    $('#costo').click(function(){
        if($(this).is(':checked'))
            $('.divOpenCosti').show("slow")
        else
            $('.divOpenCosti').hide("slow")
    })




    $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
        if(e.target.tabIndex < e.relatedTarget.tabIndex){
            if(e.target.id != "fineA" && e.target.id != "temaA"){
                var formName = e.target.id;
                var form = 'Form';
                return $("#" + formName + form).valid();
            }
            else if(e.target.id == "temaA"){
                var isValidParoleChiave = $("#formKey").valid();

                var isValidTemaForm =  $("#temaAForm").valid();

                return isValidParoleChiave && isValidTemaForm;
            }
        }

    })

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if(e.target.id == "accessoA"){
            loadComponentTabAccesso();
            //            setTimeout($('#livInterazione').select2({"width": "100%" , placeholder: "Please select a country",allowClear: true}),2000);

        }
        if(e.target.id == "organizzazioneA"){
            loadComponentTabOrganizzazione();
        }
        if(e.target.id =="temaA"){
            $("#paroleChiaveClass").chosen({"placeholder": "Select Project/Initiative...","width":'100%',  "disable_search": true});

        }
    })



    $('#tipoCanaleErog').change(function(){
        var selected = $(this).children(":selected").attr("id");
        showFieldsInput(selected);
    })

    $("#containerInput").on("change" , "#tipoCanaleNonTelematico" , function(){
        var self = $(this);
        loadSubTypeNonTelematico(self);
    })

    $("#containerInput").on("change" , "#tipoCanaleSitoWeb" , function(){
        var self = $(this);
        loadSubTypeSitoWeb(self);
    })

    $("#containerInput").on("change" , "#tipoCanaleTelefonico" , function(){
        var self = $(this);
        loadSubTypeSitoWeb(self);
    })

    $("#containerInput").on("change" , "#tipoAltroCanale" , function(){
        var self = $(this);
        loadSubTypeAltriCanali(self);
    })

    $('#btnAggiungiOrganizz').click(function(){

        if($("#formOrganizz").valid() == true){
            $('#modalOrganizz').modal('hide');

            var name = $("#nomeOrganizz").val();
            var role = $("#ruoloOrganizzazioni").val();
            var dateDa = $("#dalOrganizz").val();
            var dateA=  $("#alOrganizz").val();
            //        var rows = '<tr><td>'+ name +'</td><td>'+role'+</td><td>'+dateDa+ '</td><td>'+ dateA+'</td><td><button class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button><button class="btn btn-default btn-icon"><span class="fa fa-times"></span></button></td></tr>';

            var appRows="";
            var rows=appRows.concat('<tr><td>').concat(name).concat('</td><td>').concat(role).concat('</td><td>').concat(dateDa).concat('</td><td>').concat(dateA).concat('</td><td><button class="btn btn-default btn-icon"><span class="fa fa-pencil"></span></button><button class="btn btn-default btn-icon"><span class="fa fa-times"></span></button></td></tr>');

            $('#bodyOrganizz').prepend(rows);
            blankFieldOrganizz();

        }
    })
})

function showFieldsInput(inputSelected){
    switch (inputSelected){
        case "offline":
            var container =  $('#containerInput');
            $.get('templateLoadChannels/offlineChannels.html',function(result){
                container.hide("slow")
                container.html('');
                container.append(result).show("slow");
            })
            break;
        case "web":
            var container =  $('#containerInput');
            $.get('templateLoadChannels/webApplications.html',function(result){
                container.hide("slow")
                container.html('');
                container.append(result).show("slow");
            })
            break;
        case "telefono":
            var container =  $('#containerInput');
            $.get('templateLoadChannels/phones.html',function(result){
                container.hide("slow")
                container.html('');
                container.append(result).show("slow");
            })
            break;
        case "email":
            var container =  $('#containerInput');
            $.get('templateLoadChannels/emails.html',function(result){
                container.hide("slow")
                container.html('');
                container.append(result).show("slow");
            })
            break;
        case "altriCanaliElettronici":
            var container =  $('#containerInput');
            $.get('templateLoadChannels/otherElectronicChannels.html',function(result){
                container.hide("slow")
                container.html('');
                container.append(result).show("slow");
            })
            break;
                         }










}

function blankFieldOrganizz(){
    $('#nomeUfficioContatti').val("");
    $('#emailContatti').val("");
    $('#telefonoContatti').val("");
    $('#sitoWebContatti').val("");
}

function blankFieldOrganizz(){
    $('#nomeOrganizz').val("");
    $('#ruoloOrganizzModal').val("");
    $('#dalOrganizz').val("");
    $('#alOrganizz').val("");
}

function loadSubTypeNonTelematico(self){
    var id = self.find('option:selected').attr('id')
    switch (id){
        case "diretto":
            var optionArray = {sportelloPA:"sportello PA" , domicilioCittadino:"Domicilio cittadino" , cassaAutomativa:"Cassa automatica"};
            $('#sottotipoCanaleNonTelematico').html("");
            $('#sottotipoCanaleNonTelematico').append("<option disabled selected value>Seleziona una scelta</option>")
            $.each(optionArray, function(key , value){
                $('#sottotipoCanaleNonTelematico').append('<option id="'+ key +'">'+ value +'</option>');
            })

            break;
        case "intermediario":
            var optionArray = {posta:"Posta" , tabaccacioRicevitoria:"Tabacaio/Ricevitoria" , gdo:"GDO" , cafPatronato:"CAF/Patronato" , altriIntermediari:"Altri intermediari"};
            $('#sottotipoCanaleNonTelematico').html("");
            $('#sottotipoCanaleNonTelematico').append("<option disabled selected value>Seleziona una scelta</option>")
            $.each(optionArray, function(key , value){
                $('#sottotipoCanaleNonTelematico').append('<option id="'+ key +'">'+ value +'</option>');
            })
            break;
              } 
}

function loadSubTypeSitoWeb(self){

    var id = self.find('option:selected').attr('id')
    switch (id){
        case "modulo":
            $('.containerSubTypeSitoWeb').show("slow")

            var optionArray = {precompilato:"Precompilato" , libero:"Libero"};
            $('#sottotipoCanaleSitoWeb').html("");
            $('#sottotipoCanaleSitoWeb').append("<option disabled selected value>Seleziona una scelta</option>")
            $.each(optionArray, function(key , value){
                $('#sottotipoCanaleSitoWeb').append('<option id="'+ key +'">'+ value +'</option>');
            })
            break;

        case "paginaInformativa":
            $('.containerSubTypeSitoWeb').hide("slow")

            break;

              } 
}

function loadSubTypeAltriCanali(self){

    var id = self.find('option:selected').attr('id')
    switch (id){
        case "pagamentiBancari":
            //            $('#containerSubTypeSitoWeb').show("slow")
            $('.containerSubTypeAltriCanali').show("slow");

            var optionArray = {pagamentoInTempoReale : "Pagamento in tempo reale" , incassoPreautorizzato : "Incasso preautorizzato" , pagamentoPSP : "Pagamento attivo presso PSP (Prestatore di Servizio di Pagamento)"};
            $('#sottotipoAltroCanale').html("");
            $('#sottotipoAltroCanale').append("<option disabled selected value>Seleziona una scelta</option>")
            $.each(optionArray, function(key , value){
                $('#sottotipoAltroCanale').append('<option id="'+ key +'">'+ value +'</option>');
            })
            break;

        case "pagoPA":
            //            $('#containerSubTypeSitoWeb').hide("slow")
            $('.containerSubTypeAltriCanali').show("slow");
            var optionArray = {ordinePermanente : "Ordine permanente" , addebitoDiretto : "Addebito diretto/SEPA" , bonifico : "Bonifico" , mavRav : "MAV/RAV" , f24 : "F24" ,f23 : "F23"};
            $('#sottotipoAltroCanale').html("");
            $('#sottotipoAltroCanale').append("<option disabled selected value>Seleziona una scelta</option>")
            $.each(optionArray, function(key , value){
                $('#sottotipoAltroCanale').append('<option id="'+ key +'">'+ value +'</option>');
            })

            break;
        default:
            $('.containerSubTypeAltriCanali').hide("slow")
            break;

              } 
}

function loadComponentTabOrganizzazione(){

    $.ajaxSetup({
        async: true
    });

    $("#wait").css("display", "block");

    $.ajax({
        dataType: "json",
        url: 'http://' + sgiroletype.ip + '/' + sgiroletype.serviceName +'/api/roles/',
        success: function(data) {
            popolateRoles(data);
            $("#wait").css("display", "none");
        },
        error:function(data){
            $("#ruoloOrganizzazioni").html("");
            $("#ruoloOrganizzModal").html("");
            $("#ruoloOrganizzazioni").append('<option value selected disabled>SERVIZIO NON DISPONIBILE</option>');
            $("#ruoloOrganizzModal").append('<option value selected disabled>SERVIZIO NON DISPONIBILE</option>');
            $("#wait").css("display", "none");

        }
    })
}

function popolateRoles(result){
    $("#ruoloOrganizzazioni").html("");
    $("#ruoloOrganizzModal").html("");
    $("#ruoloOrganizzazioni").append('<option value selected disabled>Seleziona un campo</option>');
    $("#ruoloOrganizzModal").append('<option value selected disabled>Seleziona un campo</option>');
    $.each(result, function(i, field){
        var z = result;
        var option ='<option>'+ field.definition + '</option>';
        $("#ruoloOrganizzazioni").append(option);
        $("#ruoloOrganizzModal").append(option);
    });
}

function loadComponentTabInfo(){
    $("#wait").css("display", "block");

    $.ajax({
        dataType: "json",
        url: 'http://' + sgiserviceinputoutput.ip + '/' + sgiserviceinputoutput.serviceName +'/api/serviceinputoutputs/',
        success: function(data) {
            popolateInputOutput(data);
            $("#wait").css("display", "none");

        },
        error:function(data){
            $("#tipoInputRichiesti").html("");
            $("#tipoOutputProdotti").html("");
            $("#tipoInputRichiesti").append("<option value selected disabled>SERVIZIO NON DISPONIBILE</option>");
            $("#tipoOutputProdotti").append("<option value selected disabled>SERVIZIO NON DISPONIBILE</option>");

            $("#wait").css("display", "none");

        }
    })
}

function popolateInputOutput(result){
    $("#tipoInputRichiesti").html("");
    $("#tipoOutputProdotti").html("");
    $.each(result, function(i, field){
        var option ='<option>'+ field.definition + '</option>';
        $("#tipoInputRichiesti").append(option);
        $("#tipoOutputProdotti").append(option);

    });
}

function loadComponentTabAccesso(){
    $("#wait").css("display", "block");

    //liv interazione
    $.ajax({
        dataType: "json",
        url: 'http://' + sgiinteractivitylevel.ipaa + '/' + sgiinteractivitylevel.serviceName +'/api/interactivitylevels/',
        success:function(data) {
            popolateLivInterazione(data);
            $("#wait").css("display", "none");

        },
        error:function(data){
            $("#containerRadioLivInteraizone").html("");
            $("#containerRadioLivInteraizone").append("SERVIZIO NON DISPONIBILE");
            $("#wait").css("display", "none");

        },
    })
    //modalita auth
    $.ajax({
        dataType: "json",
        url: 'http://' + sgiauth.ip + '/' + sgiauth.serviceName +'/api/authentications/',
        success: function(data) {
            popolateModAuth(data);
        },
        error:function(data){
            $("#modalitaautenticazione").append("<option value selected disabled>SERVIZIO NON DISPONIBILE</option>");
            $("#wait").css("display", "none");
        }
    })
}

function popolateLivInterazione(result){
    $("#containerRadioLivInteraizone").html("");
    var html="";
    var row ='<div class="form-group row">';
    var divCol='<div class="col-md-9 ">';
    var closeDiv='</div>'
    $.each(result, function(i, field){
        var label ='<label class="col-md-3 control-label" for="modalitaautenticazione">Livello interazione</label>';
        //        var check = '<option>' + field.definition + '</option>';
        var check = '<label><input type="radio" id="radioOption" value="0" name="radioOption">'+ field.definition+' <span></span><span></span></label>';

        html+=row;
        html+=label;
        html+=divCol;
        html+=check;
        html+=closeDiv;
        html+=closeDiv;
        html+=closeDiv;



    });
    $("#containerRadioLivInteraizone").append(html);
}

function popolateModAuth(result){
    var figlio = [];
    $("#modalitaautenticazione").html('');
    $("#modalitaautenticazione").append("<option value selected disabled>Seleziona un campo</option>");
    $.each(result, function(i, field){
        var descriptionPadre = field.description;
        var idPadre = field.lv0id;
        var padreTest ="<optgroup id='"+ idPadre + "' label='"+ descriptionPadre + "'>";
        var close = '</optgroup>';
        $("#modalitaautenticazione").append(padreTest);

        for (var a = 0 ; a < field.lv1child.length ; a++){

            $("#" + idPadre).append('<option id="' + field.lv1child[a].lv1id + '">' + field.lv1child[a].description + '</option>');

        }
        //            $('<optGroup/>').appendTo($("#" + descriptionPadre))
        //            $("#modalitaautenticazione").append(close);

        figlio = []

    });
    $("#modalitaautenticazione").append('<option value="3276" class="sg-option-depth-0">Nessuna - accesso libero</option>');
}

