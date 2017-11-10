
$('#IPA-multiSelect').keyup(function(){
    alert($('#IPA-multiSelect').chosen.val());
});



function AutoSuggestIpa() {
    console.log('AutoSuggest');
    var input = $('#selectCodIpa').value;
    console.log(input);

    //    if (input.length >= 3) {
    //        var URL='52.142.209.88/sgiorganization/api/organizations?filter={"where":{"organizationCode":{"like":"'+input+'.*","options":"i"}}}';
    //        
    //        $.ajax({
    //            url: URL,
    //            success: function (result) {
    //                console.log(result);
    //            }
    //        });
    //
    //    }//end if
}
