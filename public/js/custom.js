$(document).on("click",".notificacion",function() {
    $(this).animate({
        top:"-100%",
    },1000)
    $(".text-noti").html("")
})
function toggleNoti() {
    $(".notificacion").animate({
        top:"0%",
    },200)
}

$(document).on("click",".autoHide",function(){
	let name = $(this).data("handle")
	let _class = $(this).data("class")
	let val = $("[name="+name+"]:checked").val()
	if (val==$(this).data("hideval")) {
		$("."+_class).css({display:"none"})
	}else{
		$("."+_class).css({display:""})
	}
})

$(document).on("keyup",'.numero',function (){
    this.value = (this.value + '').replace(/[^0-9]/g, '');
});
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
        // processData: false,
        // contentType: false,
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
            alert(err.responseJSON.message)
            console.log(err)
        }
    });
    // console.log(data)
}

