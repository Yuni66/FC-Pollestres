function typePubli(dataType, blockText, libelle) {
    switch (dataType) {
        case 'programm':
            $('[data-annonce]').each(function() {
                $(this).removeClass('u-hidden');
            });
            blockText.append('[Agenda] ' + libelle + '<br />');
            break;

        case 'result':
            $('[data-result]').each(function() {
                $(this).removeClass('u-hidden');
            });
            blockText.append('[Bilan] ' + libelle + '<br />');
            break;

        case 'featured':
            $('[data-annonce]').each(function() {
                $(this).removeClass('u-hidden');
            });
            $('[data-featured]').removeClass('u-hidden');
            blockText.html('[Affiche] ' + libelle);
            break;

        case 'resultmatch':
            $('[data-result]').each(function() {
                $(this).removeClass('u-hidden');
            });
            blockText.html('[Résultat] L\'affiche du jour<br />');
            break;
    }
};

$(function() {

    // Init formulaire
    $('#type_publi').on('change', function() {

        $('.list').html('');
        let preExport = $('.list');

        let typePublication = $(this).val();
        let libelleTypePublication = $('#type_publi option:selected').text();

        // Init - On cache tous les champs de formulaire
        $('.form-block:not(.form-base)').each(function() {
            $(this).addClass('u-hidden');
        });

        typePubli(typePublication, preExport, libelleTypePublication);

        $('.btn-dark').click(function(e){
            e.preventDefault;

            let line = '';
            let result;

            let category = $('#category option:selected').text();
            let compet = $('#compet option:selected').text();

            let day = $('#day option:selected').text();
            let date = $('#date option:selected').text();
            let month = $('#month option:selected').text();
            let hour = $('#hour option:selected').text();
            let minuts = $('#minuts option:selected').text();
            let location = $('input[name=location]:checked').val();
            let our = parseInt($('#ourresult').val());
            let there = parseInt($('#thereresult').val());
            let adverse = $('#adverse').val();
            let partner = $('#partners').val();

            let image = '<img src="dist/img/fcp/partenaires/' + typePublication + '/' + typePublication + '-' + partner +'.jpg">';

            // Vider les champs
            $('form input, form select:not(#type_publi)').val('')

            // Analyser les résultats
            switch (typePublication) {
                case 'programm':
                    if (category != '' && day != '' && date != '' && month != '' && hour != '' && minuts != '' && location != '') {
                        line += '#' + category + ' | ' + day + ' ' + date + '/' + month + ' à ' + hour + 'H' + minuts + ' : ';

                        if (location == 'domicile') {
                            line += 'FC Pollestres - ' + adverse;
                        } else if (location == 'exterieur') {
                            line += adverse + ' - FC Pollestres';
                        }
                        preExport.append(line + '<br />');

                        $('.img').html(image);
                    }

                    break;

                case 'result':
                    if (category != '' && our != '' && there != '' && adverse != '') {
                        if (our > there) {
                            result = 'Victoire ' + our + ' à ' + there + ' contre ' + adverse;
                        } else if (our == there) {
                            result = 'Match nul ' + our + ' à ' + there + ' contre ' + adverse;
                        } else {
                            result = 'Défaite ' + there + ' à ' + our + ' contre ' + adverse;
                        }
                        preExport.append('#' + category + ' | ' + result + '<br />');

                        $('.img').html(image);
                    }

                    break;

                case 'featured':
                    if ($('#compet').val() == '') {
                        line = '<br />';
                    } else {
                        line = ' | ' + $('#compet').val() + '<br />';
                    }

                    if (category != '' && day != '' && date != '' && month != '' && hour != '' && minuts != '' && location != '') {

                        line += '#' + category + ' | ' + day + ' ' + date + '/' + month + ' à ' + hour + 'H' + minuts + ' : ';

                        if (location == 'domicile') {
                            line += 'FC Pollestres - ' + adverse;
                        } else if (location == 'exterieur') {
                            line += adverse + ' - FC Pollestres';
                        }
                        preExport.append(line + '<br /><br />Venez nombreux pour nous encourager lors de cette rencontre décisive !<br />Ensemble, nous ne faisons qu\'un !! #AllezPollestres');

                        $('.img').html(image);
                    }

                    break;

                case 'resultmatch':
                    if (category != '' && our != '' && there != '' && adverse != '') {
                        if (our > there) {
                            result = 'Fantastique victoire ' + our + ' à ' + there + ' contre ' + adverse + ' !!';
                        } else if (our == there) {
                            result = 'Superbe combat livré par notre équipe, qui nous permet de revenir avec un match nul ' + our + ' à ' + there + ' contre ' + adverse + '.';
                        } else {
                            result = 'Nous n\'avons pas démérité, malgré une défaite ' + there + ' à ' + our + ' contre ' + adverse + '.';
                        }
                        preExport.append('#' + category + ' | ' + result + '<br />');
                        preExport.append('<br />Merci d\'avoir été aussi nombreux à être venus nous supporter ! #AllezPollestres');

                        $('.img').html(image);
                    }

                    break;
            }

            return false;


        });

    });

});