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

    /////////////////////////////
    //////////////////////////////
    /////////////////////////////
    // METODOS de Planes de PAGO
    //////////////////////////////
    /////////////////////////////
    /////////////////////////////

    var pgp_graph= "NoGraph"
    var ctx = $("#pdp_graph");
    function calcularPlanesDePago() {
        metodo = $('.btn_metodo_activo').attr("metodo")
        frecuencia = $("#frecuencia").val()
        precio_venta = $("#precio_venta").val()
        n_años = $("#nAños").val()
        dias = $("#diasEnAño").val()
        perc_cuota_inicial = $("#perc_cuota_inicial").val()
        tcea = $("#met_tcea").val()
        num_cuotas = 0
        frecuencia_dias = 0
        arr_intereses = []
        arr_amortizaciones = []
        arr_cuota = []
        arr_periodos = []
        
        data_interes = {
                    label: 'Intereses',
                    data: arr_intereses,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    /* otros colores 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'*/
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1
                }
        data_cuotas = {
                    label: 'Cuota',
                    data: arr_cuota,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }
        data_amortizaciones = 
            {
                    label: 'Amortizaciones',
                    data: arr_amortizaciones,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                
            }
        if (frecuencia != "" && precio_venta != "" && n_años != "" && dias != "" && perc_cuota_inicial != "") {

            switch (frecuencia) {
                case "Semestral":
                case "semestral":
                case "semestre":
                case "Semestre":
                    frecuencia_dias = 6 * 30
                    break;
                case "Bimestral":
                case "Bimestral":
                case "Bimestre":
                case "bmestre":
                    frecuencia_dias = 2 * 30
                    break;
                case "Trimestral":
                case "trimestral":
                case "trimestre":
                case "Trimestre":
                    frecuencia_dias = 3 * 30
                    break;
                case "Cuatrimestral":
                case "cuatrimestral":
                case "cuatrimestre":
                case "Cuatrimestre":
                    frecuencia_dias = 4 * 30
                    break;
                case "Mensual":
                case "mensual":
                case "mes":
                    frecuencia_dias = 30
                    break;
                case "diaria":
                case "Diaria":
                case "dia":
                    frecuencia_dias = 1
                default:

                    break;
            }
            if (frecuencia_dias==0) return
            $("#fecuencia_dias").val(frecuencia_dias)
            cuotas_año = dias / frecuencia_dias
            $("#cuotas_año").val(cuotas_año)
            num_cuotas = cuotas_año * n_años
            $("#num_cuotas").val(num_cuotas)


            cuota_inicial = perc_cuota_inicial / 100 * precio_venta
            $("#cuota_inicial").val(cuota_inicial)
            prestamo = precio_venta - cuota_inicial
            $("#prestamo").val(prestamo)
            tep = Math.pow((1 + (tcea / 100)), 1 / $("#cuotas_año").val()) - 1
            $("#tir").val(tep * 100)


            saldo_inicial = prestamo
            saldo_final = prestamo
            intereses_totales = 0
            cuotas_totales = 0
            amortizacion_total = 0
            table = ""

            for (var i = 1; i <= num_cuotas; i++) {
                saldo_inicial = saldo_final
                interes = saldo_inicial * tep
                pg = $("#pg_" + i).val();
                if (metodo == "Frances") {
                    cuota = prestamo * (tep * Math.pow((1 + tep), num_cuotas) / (Math.pow((1 + tep), num_cuotas) - 1))
                    amortizacion = cuota - interes
                    arr_data = [data_cuotas, data_amortizaciones, data_interes]
                }
                if (metodo == "Aleman") {
                    amortizacion = saldo_inicial / (num_cuotas - i + 1)
                    cuota = interes + amortizacion
                    arr_data = [data_amortizaciones, data_interes, data_cuotas]
                }
                if (metodo == "Americano") {
                    amortizacion = 0
                    if (i == num_cuotas) {
                        amortizacion = saldo_inicial

                    }
                    arr_data = [data_interes, data_amortizaciones, data_cuotas]
                    cuota = interes + amortizacion
                }
                saldo_final = saldo_inicial - amortizacion

                combo = "<option value='Total'>Total</option><option value='Parcial'>Parcial</option><option value='no' selected>No</option></select>"
                if (pg == "Total") {
                    saldo_final = saldo_inicial + interes
                    amortizacion = 0
                    cuota = 0
                    combo = "<option value='Total' selected>Total</option><option value='Parcial'>Parcial</option><option value='no' >No</option></select>"
                }
                if (pg == "Parcial") {
                    amortizacion = 0
                    cuota = interes
                    combo = "<option value='Total'>Tota</option><option value='Parcial' selected>Parcial</option><option value='no' >No</option></select>"
                }
                flujo = 0
                arr_periodos.push(i)
                cuotas_totales += cuota
                amortizacion_total += amortizacion
                intereses_totales += interes
                arr_cuota.push(cuota)
                arr_amortizaciones.push(amortizacion)
                arr_intereses.push(interes)
                saldo_final = Math.abs(parseFloat(saldo_final))
                $("#interes").val(parseFloat(intereses_totales).toFixed(2))
                $("#cuota_suma").val(parseFloat(cuotas_totales).toFixed(2))
                $("#amortizacion").val(parseFloat(amortizacion_total).toFixed(2))
                table += "<tr><td>" + i + "</td> <td>" + tcea + "% </td><td>" + parseFloat(tep).toFixed(5)*100 + "% </td><td><select class='pg_pdp' id='pg_" + i + "'>" + combo + "</td><td>" + parseFloat(saldo_inicial).toFixed(2) + "</td><td>" + parseFloat(interes).toFixed(2) + "</td><td>" + parseFloat(cuota).toFixed(2) + "</td><td>" + parseFloat(amortizacion).toFixed(2) + "</td><td>" + parseFloat(saldo_final).toFixed(2) + "</td><td>" + flujo + "</td></tr>"
            }
            $(".pdp_body").html(table)
            if (pgp_graph == "NoGraph"){
                 pgp_graph = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: arr_periodos,
                    datasets: arr_data
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            },
                            stacked:true
                        }],
                    
                     xAxes: [{
                            stacked:true
                        }]
                    },
                }
            });
            }
            else{
                pgp_graph.data.labels = arr_periodos
                pgp_graph.data.datasets = arr_data
                pgp_graph.update()
            }
            
                
        }
    }
    $(".pdp_input").on("change keyup", function() {
        calcularPlanesDePago()
    })
    $(".pdp_body").on("change", ".pg_pdp", function() {
        calcularPlanesDePago()

    })
    $(function() {
        calcularPlanesDePago()
    })

    $(".btn_metodo").click(function(){
        $(".btn_metodo").each(function(){
            $(this).removeClass('btn_metodo_activo')
        })
        $(this).addClass('btn_metodo_activo')
        calcularPlanesDePago()
    })

        