$(function(){
	
	$('#type_publi').change(function() {
		$('.list').html('');
		$('<pre></pre>').prependTo($('.list'));
		var affichage = $('.list pre');
		
		var type = $('#type_publi').val();
		var typeText = $('#type_publi option:selected').text();
		
		// Visibilité formulaire
		$('article').addClass('hidden');
		affichage.html('');
		$('.category, .adverse, .submit, .partners').removeClass('hidden');	
		if (type == 'programme' || type == 'match') { $('.date-match, .location').removeClass('hidden'); } else { $('.result').removeClass('hidden'); }
		if (type == 'programme' || type == 'resultats') { $('.agenda_ok').removeClass('hidden'); }
		if (type == 'match') { $('.compet').removeClass('hidden'); }
		
		// Affiche phrase d'intro		
		switch (type) {
			case 'programme':
				affichage.append('[Agenda] ' + typeText + '<br />');
				break;
			case 'resultats':
				affichage.append('[Bilan] ' + typeText + '<br />');
				break;
			case 'match':
				affichage.html('[Affiche] ' + typeText);
				break;
			case 'resultmatch':
				affichage.html('[Résultat] L\'affiche du jour<br />');
				break;
		}	
		
		$('input[type="submit"]').click(function(e){
			e.preventDefault;	
			
			var category = $('#category option:selected').text();
			var adverse = $('#adverse').val();
			var partner = $('#partners').val();
			
			// Si programme ou match à la une
			if (type == 'programme' || type == 'match') {
				var day = $('#day option:selected').text();
				var date = $('#date option:selected').text();
				if (date < 10) { date = '0' + date; }
				var month = $('#month').val();
				if (month < 10) { month = '0' + month; }
				var hour = $('#hour').val();
				if (hour < 10) { hour = '0' + hour; }
				var minuts = $('#minuts').val();
				if (minuts < 10) { minuts = '0' + minuts; }
				var location = $('input[name=location]:checked').val();
				
				var line = "";
			}
			
			switch (type) {
				case 'programme':
					line += '#' + category + ' | ' + day + ' ' + date + '/' + month + ' à ' + hour + 'H' + minuts + ' : ';
					
					if (location == 'domicile') { 
						line += 'FC Pollestres - ' + adverse;
						affichage.append(line + '<br />');
					} 
					else if (location == 'exterieur') {
						line += adverse + ' - FC Pollestres';
						affichage.append(line + '<br />');
					}					
					break;
					
				case 'resultats':
					var our = parseInt($('#ourresult').val());
					var there = parseInt($('#thereresult').val());

					if (our > there) {
						var result = 'Victoire ' + our + ' à ' + there + ' contre ' + adverse;
					} else if (our == there) {
						var result = 'Match nul ' + our + ' à ' + there + ' contre ' + adverse;
					} else {
						var result = 'Défaite ' + there + ' à ' + our + ' contre ' + adverse;
					}

					affichage.append('#' + category + ' | ' + result + '<br />');
					break;
					
				case 'match':
					if ($('#compet').val() == "") { line = '<br />'; } else { line = ' | ' + $('#compet').val() + '<br />'; }

					line += '#' + category + ' | ' + day + ' ' + date + '/' + month + ' à ' + hour + 'H' + minuts + ' : ';
					
					if (location == 'domicile') { 
						line += 'FC Pollestres - ' + adverse;
						affichage.append(line + '<br /><br />Venez nombreux pour nous encourager lors de cette rencontre décisive !<br />Ensemble, nous ne faisons qu\'un !! #AllezPollestres');
					} 
					else if (location == 'exterieur') {
						line += adverse + ' - FC Pollestres';
						affichage.append(line + '<br /><br />Venez nombreux pour nous encourager lors de cette rencontre décisive !<br />Ensemble, nous ne faisons qu\'un !! #AllezPollestres');
					}					
					break;
				
				case 'resultmatch':
					var our = parseInt($('#ourresult').val());
					var there = parseInt($('#thereresult').val());

					if (our > there) {
						var result = 'Fantastique victoire ' + our + ' à ' + there + ' contre ' + adverse + ' !!';
					} else if (our == there) {
						var result = 'Superbe combat livré par notre équipe, qui nous permet de revenir avec un match nul ' + our + ' à ' + there + ' contre ' + adverse + '.';
					} else {
						var result = 'Nous n\'avons pas démérité, malgré une défaite ' + there + ' à ' + our + ' contre ' + adverse + '.';
					}

					affichage.append('#' + category + ' | ' + result + '<br />');
					affichage.append('<br />Merci d\'avoir été aussi nombreux à être venus nous supporter ! #AllezPollestres');
					break;
			}
			
			$('.img').html('<img src="/fcp/assets/' + type + '/' + type + '-' + partner +'.jpg">');
			
			return false;
		});
		
		// Phrase complémentaire à la fin
		$('[data-target="OK"]').click(function() {
			switch (type) {
				case 'programme':
					affichage.append('<br />Venez encourager nos équipes ! #AllezPollestres');
					console.log('test');
					break;
				case 'resultats':
					affichage.append('<br />Bravo à tous ! #AllezPollestres');
					break;
			}	
		});
		
	});
	
	
	
	
});