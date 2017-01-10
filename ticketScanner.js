// JavaScript Document
//Script for scanning psysical pdf417 boarding passes only to receive first name, lastname and flightnumber

//global variables
 var lastname, firstname, fullname, origin, flightnumber, airline,  flNumber,img; 
 
        (function(window, $, undefined) {
            $(function() {

                function handleFiles(f) {
                    img = $('#scanned-img');
                    img[0].src = URL.createObjectURL(f.target.files[0]);
					
                }

                function doScan(image) {
                    var
                            canvas = document.createElement('canvas'),
                            canvas_context = canvas.getContext('2d'),
                            source,
                            binarizer,
                            bitmap;

                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                 canvas_context.drawImage(image, 0, 0, canvas.width, canvas.height);
					$('#scanned-img').hide();
				
                    try {
                        source = new ZXing.BitmapLuminanceSource(canvas_context, image);
                        binarizer = new ZXing.Common.HybridBinarizer(source);
                        bitmap = new ZXing.BinaryBitmap(binarizer);
						var data = JSON.stringify(ZXing.PDF417.PDF417Reader.decode(bitmap, null, false), null, 4);
                        
						if (data.length >2){
					    var dataJSON = JSON.parse(data); 
						
						
						var info = dataJSON[0].Text; 
						
						info = info.replace(/\s+/g, ' ');

						info = info.split(" "); 
						 
											   
					    fullnameA = info[0].substring(2, info[0].length);
						
				        fullnameA = fullnameA.split("/");
						
						lastname = fullnameA[0]; initial = fullnameA[1]; 
						
						fullname = initial + ". " + lastname; 
						
				        airline = info[1].substring(info[1].length-=2, info[1].length); 
                            
                            
                       origin = info[1].substring(info[1].length-=8, info[1].length-5);
                        flNumber = info[2].substring(info[2].length-=4, info[2].length);
                            
                        flightnumber = airline +flNumber ;    
                          
						

                        $("#basic-info").append(fullname);
						$("#flight-info").append(flightnumber);
						$('#ticket-img').append("<img src='"+img[0].src+"' width='200' height='100'/>");
                        
                        } else { 
						
						beltnumber = prompt("Sorry, unable to read your boarding pass at this time. Please fill in your belt number");
						
						 }
						
						
                    } catch (err) {
                        console.log(err);
                    }
                }
				
                $('#scan-btn').click(function() {
                    doScan($('#scanned-img')[0]);
                });
				 $('#upload-btn').click(function() {
                    doScan($('#scanned-img')[0]);
                });

                $('#scanned-img').load(function() {
                    doScan($('#scanned-img')[0]);
                });

                $('#scan-btn').change(handleFiles);
           
				$("#upload-btn").change(handleFiles);
            		});
			
        })(window, window.jQuery);
		