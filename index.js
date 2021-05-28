$(document).ready(function() {  
	  window.addEventListener("load", function() {
		var svgObject = document.getElementById('alphasvg');
		var svgDoc = svgObject.contentDocument;
		var allTexts = svgDoc.getElementsByTagName("text");
		const desc_regx = new RegExp('^(U|D|R|L|C|Y){1}[0-9]+$');
		var cur_select = null;

		  /*!!DEBUG!!
		$(document).keyup(function(e) 
		{
			console.log("keyboard")
  			if (e.keyCode === 27)
			{
				if(cur_select)
				{
					cur_select.removeAttr("is_clicked");
					cur_select.children().css("stroke","black");
					$("#all_justif #"+$(cur_select).attr("kicad_desc")).hide();
					new_select = null;
				}
			}
		});	*/

		  
		var parent_grp = null;
		for(var i=0;i<allTexts.length;i++)
		{
			if(allTexts[i].innerHTML.match(desc_regx) != null)
			{
				console.log(allTexts[i].innerHTML);
				var parent_g = $(allTexts[i].parentElement.parentElement);
				parent_g.attr("kicad_desc",allTexts[i].innerHTML);

				(function(parent_param){
				$.get(parent_g.attr("kicad_desc")+".html",function(data){
					var new_div = $("<div>");
					new_div.attr("id",parent_param.attr("kicad_desc"));
					new_div.hide();
					new_div.html(data);
					$("#all_justif").append(new_div);
					parent_param.attr("no_attach",false);
					MathJax.Hub.Queue(['Typeset', MathJax.Hub, new_div[0]]);
				})})(parent_g);

				parent_g.on("click",function()
				{
					var new_select = null;
					
					if($(this).attr("no_attach") == "false")
					{
						if(!cur_select || (cur_select && cur_select[0] != $(this)[0])){
							$("#all_justif #"+$(this).attr("kicad_desc")).show();
							$("#all_justif #"+$(this).attr("kicad_desc")).scrollTop(0);
						   	$(this).attr("is_clicked","true");
							$(this).children().css("stroke","salmon");
							new_select = $(this);
						}

						if(cur_select)
						{
							cur_select.removeAttr("is_clicked");
							cur_select.children().css("stroke","black");
							if(cur_select[0] == $(this)[0]){
								$("#all_justif #"+$(cur_select).attr("kicad_desc")).hide();
								new_select = null;
							}
							else{
								$("#all_justif #"+$(cur_select).attr("kicad_desc")).hide();
								$("#all_justif #"+$(this).attr("kicad_desc")).show();
								$("#all_justif #"+$(this).attr("kicad_desc")).scrollTop(0);
								new_select = $(this);
							}
						}

						cur_select = new_select;
					}
				})
				.mouseenter(function() {
					if($(this).attr("no_attach") == "false"){
						if($(this).attr("is_clicked") != "true"){
							$(this).children().css("stroke","blue");
							if(!cur_select){
								$("#all_justif #"+$(this).attr("kicad_desc")).show();
								$("#all_justif #"+$(this).attr("kicad_desc")).scrollTop(0);
							}
						}
					} else {
						$(this).children().css("stroke","gray");
					}
				})
				.mouseleave(function() {
					if($(this).attr("is_clicked") != "true"){
						$(this).children().css("stroke","black");
						$("#all_justif #"+$(this).attr("kicad_desc")).hide();
					}
				});
			}
		}
	  })});
		
	