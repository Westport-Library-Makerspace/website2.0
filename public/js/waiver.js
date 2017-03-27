var canvas = document.querySelector("canvas");
var doc=new jsPDF();
var signaturePad = new SignaturePad(canvas);

$(".clear").click(function(){
  signaturePad.clear();
});
