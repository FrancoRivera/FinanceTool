 $( function() {
            $(".tiptool").tooltip({track:true}); // shows tooltips
            $('.datepicker').datepicker({dateFormat:"yy-mm-dd"}); //shows Datepickers
        } );
        
       
        $(".datepicker").on("change", function(){
            if($("#dias_ini").val() != "" && $("#dias_fin").val() != "")
            $("#cant_Dias").html(DiasEntreFechas($("#dias_ini").val(), $("#dias_fin").val())+ " dias")
            
        })
      //Diferencia en dias 
        function DiasEntreFechas(fecha1, fecha2){
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(fecha1);
        var secondDate = new Date(fecha2);

        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        }
        
        //VAlor Futuro
        function ValorFuturo(S, C, TN, m, n){
             if (S == "" && C != "" && TN != "" && m != "" && n != ""){
                return Math.pow(C*(1+TN/n),m)
            }
            if (C == "" && S != "" && TN != "" && m != "" && n != ""){
                 return (S/Math.pow(1+(TN/m),n))
            }
            if (TN == "" && S != "" && C != "" && m != "" && n != ""){
                 // Falta este
            }
            if (n == "" && S != "" && C != "" && m != "" && TN != ""){
                 // Falta este tambien
            }
        }
        $(".VF").on("keyup", function(){
            // Asignar variables
            S= $("#VF_S").val()
            C =$("#VF_C").val()
            TN =$("#VF_TN").val()
            m =$("#VF_m").val()
            n =$("#VF_n").val()
            
            //Mostrar ecuacion
            
            $("#VF_Procedimiento").html("$$  " + String(S.length>0?S:"S") + "= " + String(C.length>0?C:"C") +"* (1 + \\frac{"+String(TN.length>0?TN:"TN")+"}{"+String(m.length>0?m:"m")+"})^ {"+String(n.length>0?n:"n")+ "} $$")
            
            //Despejar
             if (S == "" && C != "" && TN != "" && m != "" && n != ""){
                 $("#VF_Procedimiento").append("$$  S= " + ValorFuturo(S, C, TN, m, n) +" $$")
            }
            if (C == "" && S != "" && TN != "" && m != "" && n != ""){
                 $("#VF_Procedimiento").append("$$  C= \\frac{" + String(S) +"} {(1 + \\frac{"+String(TN)+"}{"+String(m)+"})^{"+String(n)+ "}} $$")
                 $("#VF_Procedimiento").append("$$ C = " + ValorFuturo(S, C, TN, m, n) + "$$")
            }
            if (TN == "" && S != "" && C != "" && m != "" && n != ""){
                 // Falta este
            }
            if (n == "" && S != "" && C != "" && m != "" && TN != ""){
                 // Falta este tambien
            }
            
           
            MathJax.Hub.Typeset()
        })
        
        // Tasa Efectiva
        $(".TE").on("keyup", function(){
            // Asignar variables
            S= $("#TE_S").val()
            C =$("#TE_C").val()
            TEP= $("#TE_TEP").val()
            
            //Mostrar ecuacion
             $("#TE_Procedimiento").html("$$"+ String(TEP.length>0?TEP:"TEP")+ " = (\\frac{"+String(S.length>0?S:"S") +"}{" +String(C.length>0?C:"C")+"}-1)*100 \\% $$")
            
            if (TEP =="" && S != "" && C != "")
                $("#TE_Procedimiento").append("$$ TEP = " + String((S/C-1)*100) + " \\% $$")
                                          
             MathJax.Hub.Typeset()
        })
        
        //Tasa nominal a Efectiva
         $(".TNaE").on("keyup", function(){
         	//asignar variables

         	TEP = $("#TNaE_TEP").val()
         	TN  = $("#TNaE_TN").val()
         	m   = $("#TNaE_m").val()
         	n   = $("#TNaE_n").val()

         	$("#TNaE_Procedimiento").html("$$" + String(TEP.length>0?TEP:"TEP") + " = (1+\\frac{"+ String(TN.length>0?TN:"TN") +"}{"+String(m.length>0?m:"m")+"})^{"+String(n.length>0?n:"n")+"}*100 \\% $$")

         	if (TEP =="" && TN != "" && m != "" && n != "")
         		$("#TNaE_Procedimiento").append("$$ TEP = "+String(Math.pow(1+(TN/m), n)*100-100) +"\\% $$")
         	 MathJax.Hub.Typeset()
         })
        
        
      	// Select all links with hashes
		$('a[href*="#"]')
		  // Remove links that don't actually link to anything
		  .not('[href="#"]')
		  .not('[href="#0"]')
		  .click(function(event) {
		    // On-page links
		    if (
		      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		      && 
		      location.hostname == this.hostname
		    ) {
		      // Figure out element to scroll to
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		      // Does a scroll target exist?
		      if (target.length) {
		        // Only prevent default if animation is actually gonna happen
		        event.preventDefault();
		        $('html, body').animate({
		          scrollTop: target.offset().top -100
		        }, 1000, function() {
		          // Callback after animation
		          // Must change focus!
		          var $target = $(target);
		          $target.focus();
		          if ($target.is(":focus")) { // Checking if the target was focused
		            return false;
		          } else {
		            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
		            $target.focus(); // Set focus again
		          };
		        });
		      }
		    }
		  });

        $(".toggle_sidebar").click(function(){
            $(".side_bar").animate("slide", {direction:"right"}, 300)
        })
        