 function req(data,url,id,type="GET",callback=null,before=null){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: url,
        data: data,
        type: type,
        processData: false,
        contentType: false,
        beforeSend(){
            if(before)before()            
            let spinner = '<div class="d-flex justify-content-center"><div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div></div>'
            $(id).html(spinner)         
        },
        success: function(data){
            $(id).html(data)
            if(callback)callback()            
        },
        error: function(err){
            throw err
        }
    });
    // console.log(data)
}

